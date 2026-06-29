import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap } from 'lucide-react';

const C = { bg:'#0A0A0F',card:'#111116',tertiary:'#1A1A24',border:'#2A2A3A',text:'#F1F1F5',secondary:'#8B8BA8',muted:'#55556A',accent:'#7C3AED',danger:'#EF4444',dangerSoft:'rgba(239,68,68,0.08)' };
const inputS = { width:'100%',background:C.tertiary,border:`1px solid ${C.border}`,borderRadius:6,padding:'8px 12px',fontSize:13,color:C.text,outline:'none',fontFamily:'inherit',boxSizing:'border-box' };

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ business_name:'',owner_name:'',email:'',password:'' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const u = (k,v) => setF(p=>({...p,[k]:v}));

  const submit = async e => { e.preventDefault(); setErr(''); setLoading(true); try { await signup(f); nav('/dashboard'); } catch(e){ setErr(e.response?.data?.error||'Signup failed'); } finally{ setLoading(false); } };

  return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
      <div style={{width:'100%',maxWidth:380}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:32}}>
          <div style={{width:36,height:36,borderRadius:12,background:C.accent,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 12px rgba(124,58,237,0.25)'}}><Zap size={18} color="white"/></div>
          <span style={{fontSize:18,fontWeight:600,letterSpacing:'-0.01em',color:C.text}}>CollectAI</span>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:24}}>
          <h1 style={{fontSize:16,fontWeight:600,color:C.text,marginBottom:4}}>Create account</h1>
          <p style={{fontSize:13,color:C.secondary,marginBottom:20}}>Start recovering payments with AI</p>
          {err && <div style={{background:C.dangerSoft,color:C.danger,fontSize:13,padding:'8px 12px',borderRadius:6,marginBottom:16,border:'1px solid rgba(239,68,68,0.2)',display:'flex',alignItems:'center',gap:8}}><div style={{width:6,height:6,borderRadius:'50%',background:C.danger,flexShrink:0}}/>{err}</div>}
          <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:16}}>
            {[['Business Name','business_name','Sharma Traders'],['Owner Name','owner_name','Rajesh Sharma'],['Email','email','you@company.com','email'],['Password','password','••••••••','password']].map(([l,k,p,t])=>(
              <div key={k}><label style={{fontSize:12,fontWeight:500,color:C.secondary,display:'block',marginBottom:6}}>{l}</label><input type={t||'text'} value={f[k]} onChange={e=>u(k,e.target.value)} placeholder={p} required={k!=='owner_name'} minLength={k==='password'?6:undefined} style={inputS}/></div>
            ))}
            <button type="submit" disabled={loading} style={{width:'100%',padding:'10px 0',background:C.accent,color:'#fff',border:'none',borderRadius:6,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',marginTop:4,opacity:loading?0.7:1}}>{loading?'Creating...':'Create account'}</button>
          </form>
        </div>
        <p style={{textAlign:'center',fontSize:13,color:C.muted,marginTop:20}}>Already have an account? <Link to="/login" style={{color:C.accent,fontWeight:500,textDecoration:'none'}}>Sign in</Link></p>
      </div>
    </div>
  );
}
