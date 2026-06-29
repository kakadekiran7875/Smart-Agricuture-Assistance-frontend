import { CheckCircle, XCircle, Info } from 'lucide-react';
import { useState, useCallback, createContext, useContext } from 'react';

const C = { card:'#111116',border:'#2A2A3A',text:'#F1F1F5',muted:'#55556A',accent:'#7C3AED',success:'#10B981',danger:'#EF4444',warning:'#F59E0B',info:'#3B82F6' };

/* ─── Toast System ─── */
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const colors = { success: C.success, error: C.danger, info: C.info };
  const icons = { success: CheckCircle, error: XCircle, info: Info };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(toast => {
          const Ic = icons[toast.type] || CheckCircle;
          return (
            <div key={toast.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
              padding: '10px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', minWidth: 280,
              borderLeft: `3px solid ${colors[toast.type] || C.success}`,
              animation: 'slideInDown 0.2s ease-out',
            }}>
              <Ic size={16} color={colors[toast.type] || C.success} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: C.text }}>{toast.message}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

/* ─── Status Badge ─── */
export function StatusBadge({ status, size = 'sm' }) {
  const styles = {
    pending:      { bg: 'rgba(245,158,11,0.08)', color: '#F59E0B' },
    promised:     { bg: 'rgba(59,130,246,0.08)', color: '#3B82F6' },
    paid:         { bg: 'rgba(16,185,129,0.08)', color: '#10B981' },
    refused:      { bg: 'rgba(239,68,68,0.08)', color: '#EF4444' },
    callback:     { bg: 'rgba(59,130,246,0.08)', color: '#3B82F6' },
    no_answer:    { bg: 'rgba(85,85,106,0.12)', color: '#55556A' },
    wrong_number: { bg: 'rgba(85,85,106,0.12)', color: '#55556A' },
    dnc:          { bg: 'rgba(239,68,68,0.08)', color: '#EF4444' },
    completed:    { bg: 'rgba(16,185,129,0.08)', color: '#10B981' },
    initiated:    { bg: 'rgba(59,130,246,0.08)', color: '#3B82F6' },
    in_progress:  { bg: 'rgba(245,158,11,0.08)', color: '#F59E0B' },
    failed:       { bg: 'rgba(239,68,68,0.08)', color: '#EF4444' },
    promise_given:{ bg: 'rgba(59,130,246,0.08)', color: '#3B82F6' },
    error:        { bg: 'rgba(239,68,68,0.08)', color: '#EF4444' },
  };

  const labels = {
    pending:'Pending', promised:'Promised', paid:'Paid', refused:'Refused',
    callback:'Callback', no_answer:'No Answer', wrong_number:'Wrong Number',
    dnc:'DNC', completed:'Completed', initiated:'Initiated', in_progress:'In Progress',
    failed:'Failed', promise_given:'Promised', error:'Error',
  };

  const s = styles[status] || styles.pending;
  const pad = size === 'xs' ? { fontSize: 10, padding: '2px 6px' } : { fontSize: 11, padding: '2px 8px' };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', borderRadius: 10, fontWeight: 500,
      background: s.bg, color: s.color, ...pad,
    }}>
      {labels[status] || status}
    </span>
  );
}

/* ─── Spinner ─── */
export function Spinner({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke={C.accent} strokeWidth="3" opacity="0.25" />
      <path fill={C.accent} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
    </svg>
  );
}

/* ─── Empty State ─── */
export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', textAlign: 'center' }}>
      {Icon && <Icon size={36} color={C.muted} style={{ marginBottom: 12 }} strokeWidth={1.2} />}
      <p style={{ fontSize: 13, fontWeight: 500, color: '#8B8BA8', marginBottom: 4 }}>{title}</p>
      {description && <p style={{ fontSize: 12, color: C.muted, maxWidth: 260 }}>{description}</p>}
    </div>
  );
}
