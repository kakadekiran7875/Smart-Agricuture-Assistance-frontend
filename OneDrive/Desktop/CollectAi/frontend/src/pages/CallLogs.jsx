import { useState, useEffect } from 'react';
import api from '../lib/api';
import { formatCurrency, formatDuration, formatDate, timeAgo } from '../lib/utils';
import { StatusBadge, Spinner, useToast } from '../components/UI';
import { Phone, Search, X, FileText } from 'lucide-react';

const C = { bg:'#0A0A0F',card:'#111116',tertiary:'#1A1A24',hover:'#1E1E2A',border:'#2A2A3A',text:'#F1F1F5',secondary:'#8B8BA8',muted:'#55556A',accent:'#7C3AED',accentSoft:'rgba(124,58,237,0.12)' };
const thS = { textAlign:'left',fontSize:11,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',padding:'8px 16px' };
const tdS = { padding:'10px 16px',fontSize:13,color:C.secondary };

export default function CallLogs() {
  const toast = useToast();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [sel, setSel] = useState(null);

  useEffect(() => { fetchL(); }, [tab, search]);
  const fetchL = async () => { try { const p=new URLSearchParams(); if(tab!=='all')p.set('status',tab); if(search)p.set('search',search); const{data}=await api.get(`/api/calls/logs?${p}`); setLogs(data.logs); setTotal(data.total); } catch(e){} finally{setLoading(false);} };

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <h1 style={{fontSize:20,fontWeight:600,color:C.text}}>Call Logs</h1>
          <span style={{fontSize:12,color:C.muted,background:C.tertiary,padding:'2px 8px',borderRadius:4,fontWeight:500,border:`1px solid ${C.border}`}}>{total}</span>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
        <div style={{position:'relative',flex:1,maxWidth:320}}>
          <Search size={15} color={C.muted} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)'}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customer..."
            style={{width:'100%',background:C.tertiary,border:`1px solid ${C.border}`,borderRadius:6,padding:'7px 11px 7px 36px',fontSize:13,color:C.text,outline:'none',fontFamily:'inherit'}}/>
        </div>
        <div style={{borderBottom:`1px solid ${C.border}`,display:'flex'}}>
          {['all','completed','initiated','failed'].map(s=>(
            <button key={s} onClick={()=>setTab(s)} style={{padding:'8px 14px',fontSize:13,fontWeight:500,cursor:'pointer',border:'none',background:'transparent',fontFamily:'inherit',position:'relative',color:tab===s?C.text:C.muted,textTransform:'capitalize'}}>
              {s}{tab===s && <div style={{position:'absolute',bottom:0,left:0,right:0,height:2,background:C.accent,borderRadius:'2px 2px 0 0'}}/>}
            </button>
          ))}
        </div>
      </div>

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,overflow:'hidden'}}>
        {loading ? (
          <div style={{display:'flex',justifyContent:'center',padding:'60px 0'}}><Spinner size={20}/></div>
        ) : (
          <div style={{display:'flex',flexDirection:'column'}}>
            {logs.length === 0 ? (
              <div style={{textAlign:'center',padding:'48px 0'}}>
                <Phone size={28} color={C.muted} style={{margin:'0 auto 8px'}} strokeWidth={1.2}/>
                <p style={{fontSize:13,color:C.secondary}}>No call logs</p>
              </div>
            ) : (
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    <th style={{...thS,paddingLeft:20}}>Customer</th>
                    <th style={thS}>Called At</th>
                    <th style={thS}>Duration</th>
                    <th style={thS}>Status</th>
                    <th style={thS}>Outcome</th>
                    <th style={thS}>AI Summary</th>
                    <th style={{...thS,textAlign:'right'}}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(l => (
                    <tr key={l.id} style={{borderBottom:'1px solid rgba(42,42,58,0.2)',height:48}}>
                      <td style={{...tdS,paddingLeft:20}}>
                        <p style={{fontSize:13,fontWeight:500,color:C.text}}>{l.customer_name || '—'}</p>
                        <p style={{fontSize:11,color:C.muted}}>{l.customer_phone || '—'}</p>
                      </td>
                      <td style={tdS}>
                        {new Date(l.called_at || l.created_at).toLocaleString('en-IN', {
                          timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short',
                          hour: '2-digit', minute: '2-digit', hour12: true
                        })}
                      </td>
                      <td style={tdS}>
                        {l.duration > 0 ? `${Math.floor(l.duration/60)}:${String(l.duration%60).padStart(2,'0')}` : '0:00'}
                      </td>
                      <td style={{padding:'10px 16px'}}><StatusBadge status={l.status} size="xs"/></td>
                      <td style={{padding:'10px 16px'}}><StatusBadge status={l.outcome} size="xs"/></td>
                      <td style={tdS}>
                        <div style={{display:'flex',alignItems:'center',gap:6}}>
                          {l.recording_url && <div style={{width:6,height:6,borderRadius:'50%',background:C.accent}} title="Recording available"/>}
                          <p style={{maxWidth:180,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontSize:12}} title={l.ai_summary}>{l.ai_summary||'—'}</p>
                        </div>
                      </td>
                      <td style={{...tdS,textAlign:'right'}}>
                        <button onClick={()=>setSel(l)} style={{fontSize:12,color:C.accent,background:'none',border:'none',cursor:'pointer',fontWeight:500,fontFamily:'inherit'}}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {sel && (
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',justifyContent:'flex-end'}}>
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(4px)'}} onClick={()=>setSel(null)}/>
          <div style={{position:'relative',width:480,height:'100%',background:C.card,borderLeft:`1px solid ${C.border}`,overflowY:'auto'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderBottom:`1px solid ${C.border}`,position:'sticky',top:0,background:C.card,zIndex:10}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}><FileText size={16} color={C.muted}/><h2 style={{fontSize:14,fontWeight:600,color:C.text}}>Call Details</h2></div>
              <button onClick={()=>setSel(null)} style={{color:C.muted,cursor:'pointer',padding:4,border:'none',background:'transparent'}}><X size={16}/></button>
            </div>
            <div style={{padding:20}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:24}}>
                <div><p style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>Customer</p><p style={{fontSize:13,fontWeight:500,color:C.text}}>{sel.customer_name || '—'}</p><p style={{fontSize:12,color:C.secondary}}>{sel.customer_phone || '—'}</p></div>
                <div><p style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>Called At</p><p style={{fontSize:13,color:C.text}}>{new Date(sel.called_at || sel.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}</p></div>
                <div><p style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>Duration</p><p style={{fontSize:13,color:C.text}}>{sel.duration > 0 ? `${Math.floor(sel.duration/60)}:${String(sel.duration%60).padStart(2,'0')}` : '0:00'}</p></div>
                <div><p style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>Outcome</p><StatusBadge status={sel.outcome}/></div>
                {sel.amount_promised&&<div><p style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>Promised</p><p style={{fontSize:13,fontWeight:500,color:'#10B981'}}>{formatCurrency(sel.amount_promised)}</p></div>}
              </div>
              {sel.ai_summary && <div style={{marginBottom:20}}><p style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:8}}>AI Summary</p><div style={{background:C.tertiary,border:`1px solid ${C.border}`,borderRadius:6,padding:12}}><p style={{fontSize:13,color:C.secondary,lineHeight:1.6}}>{sel.ai_summary}</p></div></div>}
              {sel.recording_url && (() => {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const token = localStorage.getItem('collectai_token');
                const proxyUrl = `${API_URL}/api/calls/recording/${sel.id}?token=${token}`;
                return (
                  <div style={{marginBottom:24,padding:16,background:C.tertiary,borderRadius:12,border:`1px solid ${C.border}`}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                      <p style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Call Recording</p>
                      <a href={proxyUrl} target="_blank" rel="noreferrer" download={`recording-${sel.id}.mp3`} style={{fontSize:11,color:C.accent,textDecoration:'none',fontWeight:600,display:'flex',alignItems:'center',gap:4}}>
                        <Phone size={12}/> Download
                      </a>
                    </div>
                    <audio controls src={proxyUrl} style={{width:'100%',height:36}}/>
                  </div>
                );
              })()}
              {sel.transcript && (
                <div style={{marginTop:24}}>
                  <p style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:8}}>Conversation Transcript</p>
                  <div style={{background:C.tertiary,border:`1px solid ${C.border}`,borderRadius:8,padding:12,maxHeight:400,overflowY:'auto',display:'flex',flexDirection:'column',gap:12}}>
                    {sel.transcript.split('\n').filter(line => line.trim()).map((line, i) => {
                      const isAgent = line.toLowerCase().startsWith('agent:');
                      const text = line.replace(/^(agent:|customer:)/i, '').trim();
                      
                      return (
                        <div key={i} style={{ display: 'flex', justifyContent: isAgent ? 'flex-end' : 'flex-start' }}>
                          <div style={{
                            background: isAgent ? C.accentSoft : 'rgba(42,42,58,0.3)',
                            color: isAgent ? C.accent : C.secondary,
                            padding: '8px 12px',
                            borderRadius: '8px',
                            maxWidth: '85%',
                            border: isAgent ? `1px solid ${C.accent}44` : `1px solid ${C.border}`,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}>
                            <div style={{ fontSize: '10px', fontWeight: 600, opacity: 0.7, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: 4 }}>
                              {isAgent ? '🤖 Agent' : '👤 Customer'}
                            </div>
                            <div style={{ fontSize: '13px', lineHeight: 1.5 }}>{text}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
