import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { formatCurrency, formatDuration, timeAgo } from '../lib/utils';
import { StatusBadge, Spinner, useToast } from '../components/UI';
import { Users, IndianRupee, TrendingUp, Phone, PlayCircle, Plus, Calendar, Upload, ArrowRight } from 'lucide-react';

const C = {
  bg: '#0A0A0F', card: '#111116', tertiary: '#1A1A24', hover: '#1E1E2A',
  border: '#2A2A3A', borderLight: '#333345', text: '#F1F1F5',
  secondary: '#8B8BA8', muted: '#55556A', accent: '#7C3AED',
  accentHover: '#6D28D9', accentSoft: 'rgba(124,58,237,0.12)',
};

const thS = { textAlign:'left',fontSize:11,color:'#55556A',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',padding:'8px 16px' };
const tdS = { padding:'10px 16px',fontSize:13,color:'#8B8BA8' };

function StatCard({ label, value, subtext, icon: Icon }) {
  return (
    <div style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:16 }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8 }}>
        <p style={{ fontSize:11,color:C.muted,textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:600 }}>{label}</p>
        {Icon && <Icon size={15} color={C.muted}/>}
      </div>
      <p style={{ fontSize:22,fontWeight:600,color:C.text }}>{value}</p>
      {subtext && <p style={{ fontSize:11,color:C.secondary,marginTop:4 }}>{subtext}</p>}
    </div>
  );
}

export default function Dashboard() {
  const nav = useNavigate();
  const toast = useToast();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bulkL, setBulkL] = useState(false);

  useEffect(() => { fetch_(); }, []);
  const fetch_ = async () => { try { const { data } = await api.get('/api/stats/dashboard'); setStats(data); } catch(e){} finally { setLoading(false); } };
  const bulk = async () => { if(!confirm('Call all pending?'))return; setBulkL(true); try { await api.post('/api/calls/bulk'); toast('Bulk calling initiated!'); fetch_(); } catch(e){ toast(e.response?.data?.error||'Failed','error'); } finally { setBulkL(false); } };

  const btn = (bg,clr,bdr) => ({ display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',background:bg,color:clr,border:bdr||'none',borderRadius:6,fontSize:13,fontWeight:500,cursor:'pointer',fontFamily:'inherit',width:'100%',justifyContent:'center' });

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:400}}><Spinner size={24}/></div>;

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
        <div>
          <h1 style={{fontSize:20,fontWeight:600,color:C.text}}>Dashboard</h1>
          <p style={{fontSize:13,color:C.secondary,marginTop:4}}>Overview of your collection activity</p>
        </div>
        <button style={btn(C.accent,'#fff')} onClick={bulk} disabled={bulkL}><PlayCircle size={15}/>{bulkL?'Calling...':'Call All Pending'}</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:24}}>
        <StatCard icon={Users} label="Total Customers" value={stats?.totalCustomers||0} subtext="Active accounts"/>
        <StatCard icon={IndianRupee} label="Pending Amount" value={formatCurrency(stats?.pendingAmount)} subtext={`${stats?.pendingCount||0} pending`}/>
        <StatCard icon={TrendingUp} label="Recovered" value={formatCurrency(stats?.recoveredAmount)} subtext="Total collected"/>
        <StatCard icon={Phone} label="Calls Today" value={stats?.callsToday||0} subtext="Outbound calls"/>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'3fr 2fr',gap:16}}>
        {/* Recent Calls */}
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,overflow:'hidden'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',borderBottom:`1px solid ${C.border}`}}>
            <h2 style={{fontSize:13,fontWeight:600,color:C.text}}>Recent Calls</h2>
            <button onClick={()=>nav('/call-logs')} style={{fontSize:12,color:C.accent,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',gap:4}}>View all <ArrowRight size={12}/></button>
          </div>
          {stats?.recentCalls?.length > 0 ? (
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                <th style={{...thS,paddingLeft:20}}>Customer</th><th style={thS}>Amount</th><th style={thS}>Status</th><th style={thS}>Duration</th><th style={thS}>Time</th>
              </tr></thead>
              <tbody>{stats.recentCalls.slice(0,7).map(c=>(
                <tr key={c.id} style={{borderBottom:'1px solid rgba(42,42,58,0.2)'}}>
                  <td style={{...tdS,paddingLeft:20,color:C.text,fontWeight:500}}>{c.customer_name || c.customers?.customer_name || c.customers?.[0]?.customer_name || '—'}</td>
                  <td style={tdS}>{c.amount_promised?formatCurrency(c.amount_promised):'—'}</td>
                  <td style={{padding:'10px 16px'}}><StatusBadge status={c.outcome||c.status} size="xs"/></td>
                  <td style={tdS}>{formatDuration(c.duration)}</td>
                  <td style={{...tdS,color:C.muted}}>{timeAgo(c.called_at)}</td>
                </tr>
              ))}</tbody>
            </table>
          ) : (
            <div style={{textAlign:'center',padding:'48px 0'}}>
              <Phone size={28} color={C.muted} style={{margin:'0 auto 8px'}} strokeWidth={1.2}/><p style={{fontSize:13,color:C.secondary}}>No calls yet</p>
            </div>
          )}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:20}}>
            <h2 style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:14}}>Quick Actions</h2>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <button style={btn(C.accent,'#fff')} onClick={bulk}><Phone size={14}/>{bulkL?'Calling...':'Call All Pending'}</button>
              <button style={btn(C.tertiary,C.text,`1px solid ${C.border}`)} onClick={()=>nav('/customers')}><Plus size={14}/>Add Customer</button>
              <button style={btn('transparent',C.secondary)} onClick={()=>nav('/customers')}><Upload size={14}/>Import CSV</button>
            </div>
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,overflow:'hidden'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'12px 20px',borderBottom:`1px solid ${C.border}`}}>
              <Calendar size={14} color={C.muted}/><h2 style={{fontSize:13,fontWeight:600,color:C.text}}>Today's Schedule</h2>
            </div>
            {stats?.schedule?.length>0 ? stats.schedule.slice(0,6).map(c=>(
              <div key={c.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 20px',borderBottom:'1px solid rgba(42,42,58,0.2)'}}>
                <div><p style={{fontSize:13,fontWeight:500,color:C.text}}>{c.customer_name}</p><p style={{fontSize:11,color:C.muted}}>{formatCurrency(c.amount_due)}</p></div>
                <StatusBadge status={c.status} size="xs"/>
              </div>
            )) : (
              <div style={{textAlign:'center',padding:'36px 0'}}><Calendar size={24} color={C.muted} style={{margin:'0 auto 8px'}} strokeWidth={1.2}/><p style={{fontSize:12,color:C.muted}}>No pending calls today</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
