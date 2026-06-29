import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Spinner, useToast } from '../components/UI';
import { Bot, PhoneCall, Save, Play, IndianRupee, Target, Megaphone, CalendarCheck, Star, Wand2 } from 'lucide-react';

const LANGUAGES = ['Hinglish', 'Hindi', 'Marathi', 'English'];
const TONES = ['Polite', 'Firm', 'Friendly'];
const TIMES = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '18:30', '19:00', '20:00'
];

const ICON_MAP = { IndianRupee, Target, Megaphone, CalendarCheck, Star, Wand2 };

const C = {
  bg: '#0A0A0F', card: '#111116', tertiary: '#1A1A24', hover: '#1E1E2A',
  border: '#2A2A3A', borderLight: '#333345', text: '#F1F1F5',
  secondary: '#8B8BA8', muted: '#55556A', accent: '#7C3AED',
  accentHover: '#6D28D9', accentSoft: 'rgba(124,58,237,0.12)',
  success: '#10B981',
};

const inputStyle = {
  width: '100%', background: C.tertiary, border: `1px solid ${C.border}`,
  borderRadius: 6, padding: '7px 11px', fontSize: 13, color: C.text,
  outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.15s',
};

function SegmentedControl({ options, value, onChange }) {
  return (
    <div style={{ display: 'inline-flex', background: C.tertiary, borderRadius: 6, padding: 3, border: `1px solid ${C.border}`, gap: 2 }}>
      {options.map(opt => {
        const val = typeof opt === 'string' ? opt.toLowerCase() : opt;
        const label = typeof opt === 'string' ? opt : String(opt);
        const isActive = value === val;
        return (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            style={{
              padding: '4px 14px', borderRadius: 5, fontSize: 12, fontWeight: 500,
              cursor: 'pointer', border: 'none', fontFamily: 'inherit',
              transition: 'all 0.15s', whiteSpace: 'nowrap',
              background: isActive ? C.accent : 'transparent',
              color: isActive ? '#fff' : C.muted,
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = C.secondary; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = C.muted; }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function TimeChip({ time, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500,
        cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
        border: `1px solid ${selected ? 'rgba(124,58,237,0.4)' : C.border}`,
        background: selected ? C.accentSoft : C.tertiary,
        color: selected ? C.accent : C.muted,
      }}
    >
      {time}
    </button>
  );
}

function UseCaseCard({ uc, selected, onClick }) {
  const Icon = ICON_MAP[uc.icon] || Wand2;
  const isSelected = selected;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: 'left', padding: 16, borderRadius: 12, cursor: 'pointer',
        fontFamily: 'inherit', transition: 'all 0.2s',
        border: `1.5px solid ${isSelected ? uc.color : C.border}`,
        background: isSelected ? `${uc.color}10` : C.card,
        boxShadow: isSelected ? `0 0 20px ${uc.color}15` : 'none',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = C.borderLight; e.currentTarget.style.background = C.hover; } }}
      onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; } }}
    >
      {isSelected && <div style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: '50%', background: uc.color, boxShadow: `0 0 8px ${uc.color}` }} />}
      <div style={{
        width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${uc.color}18`, marginBottom: 10,
      }}>
        <Icon size={18} color={uc.color} />
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 3 }}>{uc.label}</p>
      <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{uc.description}</p>
    </button>
  );
}

export default function Agent() {
  const toast = useToast();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [useCases, setUseCases] = useState([]);

  const [form, setForm] = useState({
    agent_name: 'Raj', gender: 'male', language: 'hinglish', tone: 'polite',
    calls_per_day: 3, max_call_duration: 180, call_times: ['10:00', '14:00', '18:30'],
    elevenlabs_voice_id: '', custom_intro: '', use_case: 'payment_recovery', custom_prompt: ''
  });

  useEffect(() => { fetchAgent(); fetchUseCases(); }, []);

  const fetchAgent = async () => {
    try {
      const { data } = await api.get('/api/agent');
      if (data) {
        setAgent(data);
        setForm({
          agent_name: data.agent_name || 'Raj', gender: data.gender || 'male',
          language: data.language || 'hinglish', tone: data.tone || 'polite',
          calls_per_day: data.calls_per_day || 3, max_call_duration: data.max_call_duration || 180,
          call_times: data.call_times || ['10:00', '14:00', '18:30'],
          elevenlabs_voice_id: data.elevenlabs_voice_id || '', custom_intro: data.custom_intro || '',
          use_case: data.use_case || 'payment_recovery', custom_prompt: data.custom_prompt || ''
        });
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchUseCases = async () => {
    try {
      const { data } = await api.get('/api/agent/use-cases');
      setUseCases(data);
    } catch (err) { console.error(err); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (agent) await api.put(`/api/agent/${agent.id}`, form);
      else await api.post('/api/agent', form);
      toast('Agent saved successfully!');
      await fetchAgent();
    } catch (err) {
      toast(err.response?.data?.error || 'Failed to save agent', 'error');
    } finally { setSaving(false); }
  };

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleTime = (time) => setForm(f => ({
    ...f, call_times: f.call_times.includes(time) ? f.call_times.filter(t => t !== time) : [...f.call_times, time].sort()
  }));

  const fmtDur = (s) => `${Math.floor(s/60)}m ${s%60}s`;

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}><Spinner size={24} /></div>;

  const greeting = form.custom_intro || `Namaste! Main ${form.agent_name} bol ${form.gender === 'male' ? 'raha' : 'rahi'} hoon.`;
  const selectedUseCase = useCases.find(uc => uc.key === form.use_case) || useCases[0];

  const sectionTitle = (text) => (
    <h2 style={{ fontSize: 13, fontWeight: 600, color: C.text, paddingBottom: 10, borderBottom: `1px solid ${C.border}`, marginBottom: 16 }}>{text}</h2>
  );

  const fieldLabel = (text, extra) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: C.secondary }}>{text}</label>
      {extra && <span style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{extra}</span>}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: C.text }}>AI Agent</h1>
        <p style={{ fontSize: 13, color: C.secondary, marginTop: 4 }}>Configure your AI calling agent's behavior and use case</p>
      </div>

      {/* USE CASE SELECTOR — Full Width */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 4 }}>What should your agent do?</h2>
          <p style={{ fontSize: 12, color: C.muted }}>Select a use case template. Your agent's conversation will adapt automatically.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {useCases.map(uc => (
            <UseCaseCard
              key={uc.key}
              uc={uc}
              selected={form.use_case === uc.key}
              onClick={() => update('use_case', uc.key)}
            />
          ))}
        </div>

        {/* Custom Prompt Textarea */}
        {form.use_case === 'custom' && (
          <div style={{ marginTop: 16, background: C.tertiary, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16 }}>
            {fieldLabel('Your Custom Prompt')}
            <p style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>
              Use {'{{customer_name}}'}, {'{{business_name}}'}, {'{{agent_name}}'} as variables
            </p>
            <textarea
              value={form.custom_prompt}
              onChange={e => update('custom_prompt', e.target.value)}
              placeholder={`Tu {{business_name}} ka agent hai. Customer ka naam {{customer_name}} hai. Unse...`}
              rows={6}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, fontSize: 13 }}
              onFocus={e => e.target.style.borderColor = C.accent}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

        {/* LEFT COLUMN - Configuration */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

            {/* Agent Identity */}
            <div style={{ marginBottom: 28 }}>
              {sectionTitle('Agent Identity')}
              <div style={{ marginBottom: 16 }}>
                {fieldLabel('Agent Name')}
                <input value={form.agent_name} onChange={e => update('agent_name', e.target.value)}
                  placeholder="e.g. Raj" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = C.accent}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
              <div style={{ marginBottom: 16 }}>
                {fieldLabel('Gender')}
                <SegmentedControl options={['Male', 'Female']} value={form.gender} onChange={v => update('gender', v)} />
              </div>
              <div>
                {fieldLabel('Language')}
                <SegmentedControl options={LANGUAGES} value={form.language} onChange={v => update('language', v)} />
              </div>
            </div>

            {/* Voice & Tone */}
            <div style={{ marginBottom: 28 }}>
              {sectionTitle('Voice & Tone')}
              <div style={{ marginBottom: 16 }}>
                {fieldLabel('Tone')}
                <SegmentedControl options={TONES} value={form.tone} onChange={v => update('tone', v)} />
              </div>
              <div style={{ marginBottom: 16 }}>
                {fieldLabel('ElevenLabs Voice ID')}
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={form.elevenlabs_voice_id} onChange={e => update('elevenlabs_voice_id', e.target.value)}
                    placeholder="e.g. pNInz6obpgDQGcFmaJcg" style={{ ...inputStyle, flex: 1 }}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = C.border} />
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: C.tertiary,
                    border: `1px solid ${C.border}`, borderRadius: 6, color: C.secondary, fontSize: 13,
                    fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.secondary; }}>
                    <Play size={13} /> Test
                  </button>
                </div>
              </div>
              <div>
                {fieldLabel('Custom Introduction', 'Optional')}
                <textarea value={form.custom_intro} onChange={e => update('custom_intro', e.target.value)}
                  placeholder="Override default greeting..." rows={3}
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.5 }}
                  onFocus={e => e.target.style.borderColor = C.accent}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
            </div>

            {/* Call Schedule */}
            <div>
              {sectionTitle('Call Schedule')}
              <div style={{ marginBottom: 16 }}>
                {fieldLabel('Calls per customer per day')}
                <SegmentedControl options={[1, 2, 3]} value={form.calls_per_day} onChange={v => update('calls_per_day', v)} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: C.secondary }}>Max Call Duration</label>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.accent, background: C.accentSoft, padding: '2px 8px', borderRadius: 4 }}>
                    {fmtDur(form.max_call_duration)}
                  </span>
                </div>
                <input type="range" min="60" max="600" step="30" value={form.max_call_duration}
                  onChange={e => update('max_call_duration', parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: C.accent }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.muted, marginTop: 4 }}>
                  <span>1m</span><span>10m</span>
                </div>
              </div>
              <div>
                {fieldLabel('Active Call Times')}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {TIMES.map(t => (
                    <TimeChip key={t} time={t} selected={form.call_times.includes(t)} onClick={() => toggleTime(t)} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div style={{ padding: 16, borderTop: `1px solid ${C.border}`, background: 'rgba(10,10,15,0.5)' }}>
            <button onClick={handleSave} disabled={saving} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '10px 0', background: C.accent, color: '#fff', border: 'none', borderRadius: 6,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s',
              opacity: saving ? 0.7 : 1,
            }}
              onMouseEnter={e => { if (!saving) e.currentTarget.style.background = C.accentHover; }}
              onMouseLeave={e => e.currentTarget.style.background = C.accent}>
              <Save size={14} /> {saving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN - Live Preview */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 24, position: 'sticky', top: 24 }}>

          {/* Use Case Badge */}
          {selectedUseCase && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px',
              background: `${selectedUseCase.color}15`, border: `1px solid ${selectedUseCase.color}30`,
              borderRadius: 20, marginBottom: 20,
            }}>
              {(() => { const I = ICON_MAP[selectedUseCase.icon] || Wand2; return <I size={13} color={selectedUseCase.color} />; })()}
              <span style={{ fontSize: 11, fontWeight: 600, color: selectedUseCase.color }}>{selectedUseCase.label}</span>
            </div>
          )}

          {/* Agent Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: selectedUseCase?.color || C.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 12px ${selectedUseCase?.color || C.accent}40`, flexShrink: 0,
            }}>
              <Bot size={22} color="white" />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: C.text, marginBottom: 2 }}>{form.agent_name || 'Agent'}</h3>
              <p style={{ fontSize: 12, color: C.secondary, textTransform: 'capitalize' }}>
                {form.language} · {form.tone} · {form.gender}
              </p>
            </div>
          </div>

          {/* Greeting */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Sample Greeting</p>
            <div style={{ background: C.tertiary, borderRadius: 6, padding: 16, border: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: selectedUseCase?.color || C.accent, borderRadius: '0 2px 2px 0' }} />
              <p style={{ fontSize: 13, color: C.secondary, fontStyle: 'italic', lineHeight: 1.6, paddingLeft: 8 }}>"{greeting}"</p>
            </div>
          </div>

          {/* Required Customer Fields */}
          {selectedUseCase?.customerFields?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Required Customer Fields</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selectedUseCase.customerFields.map(f => (
                  <span key={f.key} style={{
                    fontSize: 11, padding: '4px 10px', borderRadius: 4, fontWeight: 500,
                    background: f.required ? `${selectedUseCase.color}15` : C.tertiary,
                    color: f.required ? selectedUseCase.color : C.muted,
                    border: `1px solid ${f.required ? `${selectedUseCase.color}30` : C.border}`,
                  }}>
                    {f.label}{f.required && ' *'}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 10, color: C.muted, marginTop: 6, fontStyle: 'italic' }}>
                These fields must be filled when adding customers for this use case
              </p>
            </div>
          )}

          {/* Schedule */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Schedule</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {form.call_times.length > 0 ? form.call_times.map(t => (
                <span key={t} style={{
                  fontSize: 11, background: C.accentSoft, color: C.accent, padding: '3px 10px',
                  borderRadius: 4, fontWeight: 500, border: '1px solid rgba(124,58,237,0.2)',
                }}>{t}</span>
              )) : <span style={{ fontSize: 12, color: C.muted, fontStyle: 'italic' }}>No times selected</span>}
            </div>
          </div>

          {/* Settings Grid */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Settings</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: 14 }}>
                <p style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Calls/day</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{form.calls_per_day}</p>
              </div>
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: 14 }}>
                <p style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Max Duration</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{fmtDur(form.max_call_duration)}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 12 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.success, boxShadow: `0 0 6px ${C.success}` }} />
            <span style={{ color: C.secondary }}>Status: <span style={{ color: C.success, fontWeight: 500 }}>Active</span></span>
          </div>

          {/* Test Call */}
          <div style={{ paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
            <button style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '10px 0', background: 'transparent', color: C.accent, border: `1px solid ${C.border}`,
              borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.accentSoft; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'transparent'; }}>
              <PhoneCall size={14} /> Test Call (Your Number)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
