import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Users, Bot, PhoneCall, Settings, LogOut, Zap
} from 'lucide-react';

const SIDEBAR_WIDTH = 220;

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/agent', label: 'AI Agent', icon: Bot },
  { path: '/call-logs', label: 'Call Logs', icon: PhoneCall },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { business, logout } = useAuth();
  const location = useLocation();

  return (
    <aside
      style={{ width: SIDEBAR_WIDTH, minWidth: SIDEBAR_WIDTH }}
      className="fixed left-0 top-0 h-screen flex flex-col z-50"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ background: '#111116', borderRight: '1px solid #2A2A3A' }} />

      {/* Content */}
      <div className="relative flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 shrink-0" style={{ height: 52, borderBottom: '1px solid #2A2A3A' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={13} color="white" />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: '#F1F1F5' }}>CollectAI</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto" style={{ padding: '16px 12px' }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: 8 }}>Menu</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
              return (
                <NavLink
                  key={path}
                  to={path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '0 8px',
                    height: 32,
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.1s',
                    color: isActive ? '#7C3AED' : '#8B8BA8',
                    background: isActive ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#1E1E2A'; e.currentTarget.style.color = '#F1F1F5'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B8BA8'; }}}
                >
                  <Icon size={15} strokeWidth={isActive ? 2 : 1.5} />
                  {label}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom User */}
        <div style={{ borderTop: '1px solid #2A2A3A', padding: 12 }} className="shrink-0">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px' }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', background: '#7C3AED',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 10, fontWeight: 600, flexShrink: 0
            }}>
              {business?.business_name?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#F1F1F5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {business?.business_name || 'Business'}
              </p>
              <p style={{ fontSize: 11, color: '#55556A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {business?.email || ''}
              </p>
            </div>
            <button
              onClick={logout}
              title="Logout"
              style={{ color: '#55556A', cursor: 'pointer', padding: 4, borderRadius: 4, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#55556A'; e.currentTarget.style.background = 'transparent'; }}
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export { SIDEBAR_WIDTH };
