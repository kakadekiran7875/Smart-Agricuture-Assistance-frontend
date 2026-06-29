import { useState, useEffect, useRef } from 'react';
import api from '../lib/api';
import { formatCurrency, timeAgo, getInitials, getDaysBadgeColor } from '../lib/utils';
import { StatusBadge, Spinner, useToast } from '../components/UI';
import { Plus, Upload, PlayCircle, Search, Phone, MoreVertical, X, CheckCircle, Ban, Trash2, Edit2, Users } from 'lucide-react';

const C = { bg:'#0A0A0F',card:'#111116',tertiary:'#1A1A24',hover:'#1E1E2A',border:'#2A2A3A',text:'#F1F1F5',secondary:'#8B8BA8',muted:'#55556A',accent:'#7C3AED',accentHover:'#6D28D9',accentSoft:'rgba(124,58,237,0.12)',danger:'#EF4444',dangerSoft:'rgba(239,68,68,0.08)',success:'#10B981',successSoft:'rgba(16,185,129,0.08)',warning:'#F59E0B',warningSoft:'rgba(245,158,11,0.08)' };
const TABS = [{v:'all',l:'All'},{v:'pending',l:'Pending'},{v:'promised',l:'Promised'},{v:'paid',l:'Paid'},{v:'refused',l:'Refused'},{v:'no_answer',l:'No Answer'},{v:'dnc',l:'DNC'}];
const thS = { textAlign:'left',fontSize:11,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',padding:'8px 16px' };
const tdS = { padding:'10px 16px',fontSize:13 };
const inputS = { width:'100%',background:C.tertiary,border:`1px solid ${C.border}`,borderRadius:6,padding:'7px 11px',fontSize:13,color:C.text,outline:'none',fontFamily:'inherit' };
const btnP = { display:'inline-flex',alignItems:'center',gap:6,padding:'7px 14px',background:C.accent,color:'#fff',border:'none',borderRadius:6,fontSize:13,fontWeight:500,cursor:'pointer',fontFamily:'inherit' };
const btnS = { ...btnP,background:C.tertiary,color:C.text,border:`1px solid ${C.border}` };
const btnG = { ...btnP,background:'transparent',color:C.secondary };

export default function Customers() {
  const toast = useToast();
  const [custs, setCusts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editing, setEditing] = useState(null);
  const [menu, setMenu] = useState(null);
  const [callingId, setCallingId] = useState(null);
  const [bulkL, setBulkL] = useState(false);
  
  const [useCases, setUseCases] = useState([]);
  const [currentUseCaseKey, setCurrentUseCaseKey] = useState('payment_recovery');
  
  const timer = useRef(null);

  useEffect(() => { fetchC(); fetchAgentInfo(); }, [tab]);
  useEffect(() => { if(timer.current)clearTimeout(timer.current); timer.current=setTimeout(()=>fetchC(),300); return()=>clearTimeout(timer.current); }, [search]);
  useEffect(() => { const h=e=>{if(menu&&!e.target.closest('[data-menu]'))setMenu(null);}; document.addEventListener('click',h); return()=>document.removeEventListener('click',h); }, [menu]);

  const fetchC = async () => { try { const p=new URLSearchParams(); if(tab!=='all')p.set('status',tab); if(search)p.set('search',search); const{data}=await api.get(`/api/customers?${p}`); setCusts(data.customers); setTotal(data.total); } catch(e){} finally{setLoading(false);} };
  
  const fetchAgentInfo = async () => {
    try {
      const [agRes, ucRes] = await Promise.all([
        api.get('/api/agent'),
        api.get('/api/agent/use-cases')
      ]);
      if (agRes.data) setCurrentUseCaseKey(agRes.data.use_case || 'payment_recovery');
      if (ucRes.data) setUseCases(ucRes.data);
    } catch(e) { console.error('Failed to fetch agent info', e); }
  };

  const handleCall = async(id)=>{ if(!confirm('Initiate call?'))return; setCallingId(id); try { await api.post(`/api/calls/single/${id}`); toast('Call initiated!'); fetchC(); } catch(e){ toast(e.response?.data?.error||'Call failed','error'); } finally{setCallingId(null);} };
  const handleStatus = async(id,s)=>{ try { await api.patch(`/api/customers/${id}/status`,{status:s}); setMenu(null); toast(`Marked as ${s}`); fetchC(); } catch(e){ toast('Failed','error'); } };
  const handleDel = async(id)=>{ if(!confirm('Delete?'))return; try { await api.delete(`/api/customers/${id}`); setMenu(null); toast('Deleted'); fetchC(); } catch(e){ toast('Failed','error'); } };
  const bulk = async()=>{ if(!confirm('Call all pending?'))return; setBulkL(true); try { await api.post('/api/calls/bulk'); toast('Bulk calling initiated!'); fetchC(); } catch(e){ toast(e.response?.data?.error||'Failed','error'); } finally{setBulkL(false);} };

  const dayColor = d => d<30?{bg:C.successSoft,c:C.success}:d<60?{bg:C.warningSoft,c:C.warning}:{bg:C.dangerSoft,c:C.danger};
  const currentUseCase = useCases.find(u => u.key === currentUseCaseKey);

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div><h1 style={{fontSize:20,fontWeight:600,color:C.text}}>Customers</h1><p style={{fontSize:13,color:C.secondary,marginTop:4}}>{total} total customers</p></div>
        <div style={{display:'flex',gap:8}}>
          <button style={btnG} onClick={()=>setShowImport(true)}><Upload size={14}/>Import CSV</button>
          <button style={btnS} onClick={bulk} disabled={bulkL}><PlayCircle size={14}/>{bulkL?'Calling...':'Call All Pending'}</button>
          <button style={btnP} onClick={()=>setShowAdd(true)}><Plus size={14}/>Add Customer</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{borderBottom:`1px solid ${C.border}`,marginBottom:16,display:'flex'}}>
        {TABS.map(t=>(
          <button key={t.v} onClick={()=>setTab(t.v)} style={{padding:'8px 16px',fontSize:13,fontWeight:500,cursor:'pointer',border:'none',background:'transparent',fontFamily:'inherit',position:'relative',color:tab===t.v?C.text:C.muted}}>
            {t.l}
            {tab===t.v && <div style={{position:'absolute',bottom:0,left:0,right:0,height:2,background:C.accent,borderRadius:'2px 2px 0 0'}}/>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{position:'relative',marginBottom:16}}>
        <Search size={15} color={C.muted} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)'}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or phone..." style={{...inputS,paddingLeft:36}}/>
      </div>

      {/* Table */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8}}>
        {loading ? <div style={{display:'flex',justifyContent:'center',padding:'60px 0'}}><Spinner size={20}/></div>
        : custs.length===0 ? <div style={{textAlign:'center',padding:'48px 0'}}><Users size={32} color={C.muted} style={{margin:'0 auto 8px'}} strokeWidth={1.2}/><p style={{fontSize:13,color:C.secondary}}>No customers found</p></div>
        : <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
            <th style={{...thS,paddingLeft:20}}>Customer</th><th style={thS}>Info</th><th style={thS}>Status</th><th style={thS}>Last Call</th><th style={thS}>Calls</th><th style={{...thS,textAlign:'right'}}>Actions</th>
          </tr></thead>
          <tbody>{custs.map((c, idx)=>{const dc=dayColor(c.days_pending); const isLast = idx >= custs.length - 2 && custs.length > 3; return(
            <tr key={c.id} style={{borderBottom:'1px solid rgba(42,42,58,0.2)',height:48}}>
              <td style={{...tdS,paddingLeft:20}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:26,height:26,borderRadius:'50%',background:C.accentSoft,display:'flex',alignItems:'center',justifyContent:'center',color:C.accent,fontSize:10,fontWeight:600,flexShrink:0}}>{getInitials(c.customer_name)}</div>
                  <div><p style={{fontSize:13,fontWeight:500,color:C.text}}>{c.customer_name}</p><p style={{fontSize:12,color:C.muted}}>{c.phone}</p></div>
                </div>
              </td>
              <td style={{...tdS, color:C.secondary}}>
                {c.amount_due > 0 ? (
                  <span><strong style={{color:C.text}}>{formatCurrency(c.amount_due)}</strong> <span style={{fontSize:11,background:dc.bg,color:dc.c,padding:'2px 6px',borderRadius:8,marginLeft:4}}>{c.days_pending}d</span></span>
                ) : (
                  <span>-</span>
                )}
              </td>
              <td style={{padding:'10px 16px'}}><StatusBadge status={c.status} size="xs"/></td>
              <td style={{...tdS,color:C.secondary}}>{timeAgo(c.last_call_date)}</td>
              <td style={{...tdS,color:C.secondary}}>{c.call_count_today}/{c.total_calls}</td>
              <td style={{...tdS,textAlign:'right'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',gap:4}}>
                  <button onClick={()=>handleCall(c.id)} disabled={callingId===c.id} style={{padding:6,borderRadius:6,border:'none',background:'transparent',color:C.muted,cursor:'pointer'}} title="Call"><Phone size={14}/></button>
                  <div style={{position:'relative'}} data-menu>
                    <button onClick={e=>{e.stopPropagation();setMenu(menu===c.id?null:c.id);}} style={{padding:6,borderRadius:6,border:'none',background:'transparent',color:C.muted,cursor:'pointer'}}><MoreVertical size={14}/></button>
                    {menu===c.id && <div style={{position:'absolute',right:0,top:isLast?undefined:32,bottom:isLast?32:undefined,width:160,background:C.card,border:`1px solid ${C.border}`,borderRadius:8,boxShadow:'0 8px 24px rgba(0,0,0,0.4)',zIndex:100,padding:4}}>
                      <button onClick={()=>{setEditing(c);setMenu(null);}} style={{width:'100%',display:'flex',alignItems:'center',gap:8,padding:'6px 12px',fontSize:13,color:C.secondary,border:'none',background:'transparent',cursor:'pointer',borderRadius:4,fontFamily:'inherit'}}><Edit2 size={13}/>Edit</button>
                      <button onClick={()=>handleStatus(c.id,'paid')} style={{width:'100%',display:'flex',alignItems:'center',gap:8,padding:'6px 12px',fontSize:13,color:C.success,border:'none',background:'transparent',cursor:'pointer',borderRadius:4,fontFamily:'inherit'}}><CheckCircle size={13}/>Mark Paid</button>
                      <button onClick={()=>handleStatus(c.id,'dnc')} style={{width:'100%',display:'flex',alignItems:'center',gap:8,padding:'6px 12px',fontSize:13,color:C.warning,border:'none',background:'transparent',cursor:'pointer',borderRadius:4,fontFamily:'inherit'}}><Ban size={13}/>DNC</button>
                      <div style={{margin:'4px 0',borderTop:`1px solid ${C.border}`}}/>
                      <button onClick={()=>handleDel(c.id)} style={{width:'100%',display:'flex',alignItems:'center',gap:8,padding:'6px 12px',fontSize:13,color:C.danger,border:'none',background:'transparent',cursor:'pointer',borderRadius:4,fontFamily:'inherit'}}><Trash2 size={13}/>Delete</button>
                    </div>}
                  </div>
                </div>
              </td>
            </tr>
          );})}</tbody>
        </table>}
      </div>

      {(showAdd||editing) && <CustModal c={editing} useCase={currentUseCase} onClose={()=>{setShowAdd(false);setEditing(null);}} onSave={()=>{setShowAdd(false);setEditing(null);fetchC();}}/>}
      {showImport && <ImportModal onClose={()=>setShowImport(false)} onDone={()=>{setShowImport(false);fetchC();}}/>}
    </div>
  );
}

function CustModal({c, useCase, onClose, onSave}) {
  const toast=useToast();
  const [f,setF]=useState({
    customer_name: c?.customer_name || '',
    phone: c?.phone || '',
    amount_due: c?.amount_due || '',
    days_pending: c?.days_pending || 0,
    items_given: c?.items_given || ''
  });
  
  const [cf, setCf] = useState(c?.custom_fields || {});
  const [saving,setSaving]=useState(false);
  
  const u=(k,v)=>setF(p=>({...p,[k]:v}));
  const uCf=(k,v)=>setCf(p=>({...p,[k]:v}));
  
  const save=async e=>{
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...f, custom_fields: cf };
      if(c) await api.put(`/api/customers/${c.id}`, payload);
      else await api.post('/api/customers', payload);
      toast(c?'Updated!':'Added!');
      onSave();
    } catch(err) {
      toast(err.response?.data?.error||'Failed','error');
    } finally {
      setSaving(false);
    }
  };

  const fields = useCase?.customerFields || [];

  return(
    <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',justifyContent:'flex-end'}}>
      <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(4px)'}} onClick={onClose}/>
      <div style={{position:'relative',width:400,height:'100%',background:C.card,borderLeft:`1px solid ${C.border}`,overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderBottom:`1px solid ${C.border}`,position:'sticky',top:0,background:C.card,zIndex:10}}>
          <h2 style={{fontSize:14,fontWeight:600,color:C.text}}>{c?'Edit Customer':'Add Customer'}</h2>
          <button onClick={onClose} style={{color:C.muted,cursor:'pointer',padding:4,border:'none',background:'transparent'}}><X size={16}/></button>
        </div>
        <form onSubmit={save} style={{padding:20,display:'flex',flexDirection:'column',gap:16}}>
          {/* Always show core fields */}
          <div>
            <label style={{fontSize:12,fontWeight:500,color:C.secondary,display:'block',marginBottom:6}}>Customer Name *</label>
            <input type="text" value={f.customer_name} onChange={e=>u('customer_name',e.target.value)} placeholder="Rajesh Kumar" required style={inputS} />
          </div>
          <div>
            <label style={{fontSize:12,fontWeight:500,color:C.secondary,display:'block',marginBottom:6}}>Phone Number *</label>
            <input type="text" value={f.phone} onChange={e=>u('phone',e.target.value)} placeholder="+919876543210" required style={inputS} />
          </div>
          
          {/* Dynamic Use Case Fields */}
          {fields.map(field => {
            const isStandard = ['amount_due', 'days_pending', 'items_given'].includes(field.key);
            const val = isStandard ? f[field.key] : cf[field.key] || '';
            const setter = isStandard ? u : uCf;
            
            return (
              <div key={field.key}>
                <label style={{fontSize:12,fontWeight:500,color:C.secondary,display:'block',marginBottom:6}}>
                  {field.label} {field.required && '*'}
                </label>
                <input 
                  type={field.type || 'text'} 
                  value={val} 
                  onChange={e => setter(field.key, e.target.value)} 
                  required={field.required}
                  style={inputS} 
                />
              </div>
            );
          })}
          
          <button type="submit" disabled={saving} style={{width:'100%',padding:'10px 0',background:C.accent,color:'#fff',border:'none',borderRadius:6,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',marginTop:8,opacity:saving?0.7:1}}>{saving?'Saving...':c?'Update':'Add Customer'}</button>
        </form>
      </div>
    </div>
  );
}

function ImportModal({onClose,onDone}) {
  const toast=useToast();
  const [file,setFile]=useState(null);
  const [imp,setImp]=useState(false);
  const [res,setRes]=useState(null);
  const doImp=async()=>{if(!file)return;setImp(true);try{const fd=new FormData();fd.append('file',file);const{data}=await api.post('/api/customers/import',fd,{headers:{'Content-Type':'multipart/form-data'}});setRes(data);toast(`Imported ${data.imported}!`);}catch(e){toast(e.response?.data?.error||'Failed','error');}finally{setImp(false);}};
  return(
    <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(4px)'}} onClick={onClose}/>
      <div style={{position:'relative',width:460,background:C.card,border:`1px solid ${C.border}`,borderRadius:8,boxShadow:'0 16px 48px rgba(0,0,0,0.5)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderBottom:`1px solid ${C.border}`}}>
          <h2 style={{fontSize:14,fontWeight:600,color:C.text}}>Import CSV</h2>
          <button onClick={onClose} style={{color:C.muted,cursor:'pointer',padding:4,border:'none',background:'transparent'}}><X size={16}/></button>
        </div>
        <div style={{padding:20}}>
          {res ? <div style={{textAlign:'center',padding:'24px 0'}}><CheckCircle size={40} color={C.success} style={{margin:'0 auto 12px'}}/><p style={{fontSize:14,fontWeight:500,color:C.text}}>{res.imported} imported, {res.skipped} skipped</p><button style={{marginTop:16,padding:'8px 20px',background:C.accent,color:'#fff',border:'none',borderRadius:6,fontSize:13,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}} onClick={onDone}>Done</button></div>
          : <>
            <div style={{border:`2px dashed ${C.border}`,borderRadius:8,padding:32,textAlign:'center'}}>
              <Upload size={24} color={C.muted} style={{margin:'0 auto 8px'}}/><p style={{fontSize:13,color:C.secondary,marginBottom:12}}>Drag & drop or</p>
              <label style={{display:'inline-flex',alignItems:'center',gap:6,background:C.tertiary,border:`1px solid ${C.border}`,borderRadius:6,padding:'7px 14px',fontSize:13,fontWeight:500,cursor:'pointer',color:C.text}}>Browse<input type="file" accept=".csv" onChange={e=>setFile(e.target.files[0])} style={{display:'none'}}/></label>
              {file && <p style={{fontSize:13,color:C.accent,marginTop:12,fontWeight:500}}>{file.name}</p>}
            </div>
            <p style={{fontSize:11,color:C.muted,marginTop:12}}>Columns: Name, Phone, Amount, Days Pending, Items</p>
            <button onClick={doImp} disabled={!file||imp} style={{width:'100%',marginTop:16,padding:'10px 0',background:C.accent,color:'#fff',border:'none',borderRadius:6,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',opacity:!file||imp?0.5:1}}>{imp?'Importing...':'Import'}</button>
          </>}
        </div>
      </div>
    </div>
  );
}
