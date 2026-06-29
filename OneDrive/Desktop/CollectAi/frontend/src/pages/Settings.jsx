import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Spinner, useToast } from '../components/UI';
import { Save, Building, Key, CreditCard, Eye, EyeOff } from 'lucide-react';

const C = { bg:'#0A0A0F',card:'#111116',tertiary:'#1A1A24',hover:'#1E1E2A',border:'#2A2A3A',text:'#F1F1F5',secondary:'#8B8BA8',muted:'#55556A',accent:'#7C3AED',accentHover:'#6D28D9',accentSoft:'rgba(124,58,237,0.12)',success:'#10B981',successSoft:'rgba(16,185,129,0.08)',info:'#3B82F6',infoSoft:'rgba(59,130,246,0.08)',warning:'#F59E0B',warningSoft:'rgba(245,158,11,0.08)' };
const inputS = { width:'100%',background:C.tertiary,border:`1px solid ${C.border}`,borderRadius:6,padding:'7px 11px',fontSize:13,color:C.text,outline:'none',fontFamily:'inherit',boxSizing:'border-box' };
const labelS = { fontSize:12,fontWeight:500,color:C.secondary,display:'block',marginBottom:6 };
const btnP = { display:'inline-flex',alignItems:'center',gap:6,padding:'8px 16px',background:C.accent,color:'#fff',border:'none',borderRadius:6,fontSize:13,fontWeight:500,cursor:'pointer',fontFamily:'inherit' };

export default function Settings() {
  const { business, refreshBusiness } = useAuth();
  const toast = useToast();
  const [tab, setTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [pf, setPf] = useState({ business_name:'',owner_name:'',phone:'',business_type:'general' });
  const [itf, setItf] = useState({ twilio_account_sid:'',twilio_auth_token:'',twilio_phone_number:'',openai_api_key:'',elevenlabs_api_key:'',deepgram_api_key:'' });
  const [show, setShow] = useState({});

  useEffect(() => { if(business){ setPf({business_name:business.business_name||'',owner_name:business.owner_name||'',phone:business.phone||'',business_type:business.business_type||'general'}); setItf({twilio_account_sid:business.twilio_account_sid||'',twilio_auth_token:business.twilio_auth_token||'',twilio_phone_number:business.twilio_phone_number||'',openai_api_key:business.openai_api_key||'',elevenlabs_api_key:business.elevenlabs_api_key||'',deepgram_api_key:business.deepgram_api_key||''}); } }, [business]);

  const saveP = async e => { e.preventDefault(); setLoading(true); try { await api.put('/api/business',pf); await refreshBusiness(); toast('Profile updated'); } catch(e){ toast('Failed','error'); } finally{ setLoading(false); } };
  const saveI = async e => { e.preventDefault(); setLoading(true); try { await api.put('/api/business',itf); await refreshBusiness(); toast('Integrations updated'); } catch(e){ toast('Failed','error'); } finally{ setLoading(false); } };

  const tabs = [{ id:'profile',l:'Business Profile',I:Building },{ id:'integrations',l:'Integrations',I:Key },{ id:'billing',l:'Billing',I:CreditCard }];

  if(!business) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:400}}><Spinner size={24}/></div>;

  const Field = ({ label, value, onChange, placeholder, type='text' }) => (
    <div><label style={labelS}>{label}</label><input type={type} value={value} onChange={onChange} placeholder={placeholder} style={inputS}/></div>
  );

  const Secret = ({ label, value, onChange, placeholder, k }) => (
    <div><label style={labelS}>{label}</label>
      <div style={{position:'relative'}}>
        <input type={show[k]?'text':'password'} value={value} onChange={onChange} placeholder={placeholder} style={{...inputS,paddingRight:36}}/>
        <button type="button" onClick={()=>setShow(s=>({...s,[k]:!s[k]}))} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',color:C.muted,cursor:'pointer',border:'none',background:'transparent',display:'flex'}}>
          {show[k]?<EyeOff size={14}/>:<Eye size={14}/>}
        </button>
      </div>
    </div>
  );

  const IntCard = ({ icon, iconBg, iconColor, title, children }) => (
    <div style={{background:C.tertiary,border:`1px solid ${C.border}`,borderRadius:8,padding:20,marginBottom:20}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
        <div style={{width:24,height:24,borderRadius:6,background:iconBg,color:iconColor,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700}}>{icon}</div>
        <h3 style={{fontSize:13,fontWeight:600,color:C.text}}>{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div>
      <div style={{marginBottom:24}}><h1 style={{fontSize:20,fontWeight:600,color:C.text}}>Settings</h1><p style={{fontSize:13,color:C.secondary,marginTop:4}}>Manage your account and integrations</p></div>

      <div style={{display:'flex',gap:24}}>
        {/* Tabs */}
        <div style={{width:200,flexShrink:0,display:'flex',flexDirection:'column',gap:2}}>
          {tabs.map(t=>{const Ic=t.I;return(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'0 12px',height:32,borderRadius:6,fontSize:13,fontWeight:500,cursor:'pointer',border:'none',fontFamily:'inherit',background:tab===t.id?C.accentSoft:'transparent',color:tab===t.id?C.accent:C.secondary}}>
              <Ic size={15} strokeWidth={tab===t.id?2:1.5}/>{t.l}
            </button>
          );})}
        </div>

        {/* Content */}
        <div style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:24,minHeight:500}}>

          {tab==='profile' && <div>
            <h2 style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:20}}>Business Profile</h2>
            <form onSubmit={saveP} style={{display:'flex',flexDirection:'column',gap:16,maxWidth:400}}>
              <Field label="Business Name" value={pf.business_name} onChange={e=>setPf(f=>({...f,business_name:e.target.value}))}/>
              <Field label="Owner Name" value={pf.owner_name} onChange={e=>setPf(f=>({...f,owner_name:e.target.value}))}/>
              <Field label="Phone Number" value={pf.phone} onChange={e=>setPf(f=>({...f,phone:e.target.value}))}/>
              <div><label style={labelS}>Business Type</label><select value={pf.business_type} onChange={e=>setPf(f=>({...f,business_type:e.target.value}))} style={inputS}>
                <option value="general">General Business</option><option value="finance">Financial Services</option><option value="retail">Retail & E-commerce</option><option value="b2b">B2B Services</option><option value="education">Education</option>
              </select></div>
              <div style={{marginTop:8}}><button type="submit" disabled={loading} style={{...btnP,opacity:loading?0.7:1}}><Save size={14}/>{loading?'Saving...':'Save Profile'}</button></div>
            </form>
          </div>}

          {tab==='integrations' && <div>
            <h2 style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:4}}>API Integrations</h2>
            <p style={{fontSize:12,color:C.secondary,marginBottom:24}}>Configure API keys. Leave blank for system defaults.</p>
            <form onSubmit={saveI} style={{maxWidth:560}}>
              <IntCard icon="TW" iconBg={C.infoSoft} iconColor={C.info} title="Twilio">
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  <Field label="Account SID" value={itf.twilio_account_sid} onChange={e=>setItf(f=>({...f,twilio_account_sid:e.target.value}))} placeholder="ACxxxxxxxx"/>
                  <Secret label="Auth Token" k="tw" value={itf.twilio_auth_token} onChange={e=>setItf(f=>({...f,twilio_auth_token:e.target.value}))} placeholder="••••••••"/>
                </div>
                <div style={{marginTop:12}}><Field label="Phone Number" value={itf.twilio_phone_number} onChange={e=>setItf(f=>({...f,twilio_phone_number:e.target.value}))} placeholder="+1234567890"/></div>
              </IntCard>
              <IntCard icon="OA" iconBg={C.successSoft} iconColor={C.success} title="OpenAI">
                <Secret label="API Key" k="oa" value={itf.openai_api_key} onChange={e=>setItf(f=>({...f,openai_api_key:e.target.value}))} placeholder="sk-..."/>
              </IntCard>
              <IntCard icon="EL" iconBg={C.accentSoft} iconColor={C.accent} title="ElevenLabs">
                <Secret label="API Key" k="el" value={itf.elevenlabs_api_key} onChange={e=>setItf(f=>({...f,elevenlabs_api_key:e.target.value}))} placeholder="Enter key"/>
              </IntCard>
              <IntCard icon="DG" iconBg={C.warningSoft} iconColor={C.warning} title="Deepgram">
                <Secret label="API Key" k="dg" value={itf.deepgram_api_key} onChange={e=>setItf(f=>({...f,deepgram_api_key:e.target.value}))} placeholder="Enter key"/>
              </IntCard>
              <button type="submit" disabled={loading} style={{...btnP,opacity:loading?0.7:1}}><Save size={14}/>{loading?'Saving...':'Save Integrations'}</button>
            </form>
          </div>}

          {tab==='billing' && <div>
            <h2 style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:20}}>Billing & Plan</h2>
            <div style={{border:`1px solid ${C.border}`,borderRadius:8,padding:20,background:C.tertiary,maxWidth:480}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}}>
                <div><h3 style={{fontSize:16,fontWeight:600,color:C.text,textTransform:'capitalize'}}>{business.plan||'Free'} Plan</h3><p style={{fontSize:12,color:C.secondary,marginTop:4}}>Current subscription</p></div>
                <div style={{background:C.successSoft,color:C.success,padding:'2px 10px',borderRadius:10,fontSize:11,fontWeight:500,border:'1px solid rgba(16,185,129,0.2)'}}>Active</div>
              </div>
              {[['Billing Cycle','Monthly'],['AI Calls',business.plan==='pro'?'Unlimited':'100/mo'],['Extra Rate','₹2.50/min']].map(([l,v])=>(
                <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:`1px solid rgba(42,42,58,0.3)`}}><span style={{fontSize:13,color:C.secondary}}>{l}</span><span style={{fontSize:13,color:C.text,fontWeight:500}}>{v}</span></div>
              ))}
            </div>
            <button style={{...btnP,marginTop:20}}>Upgrade Plan</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
