import { Outlet } from 'react-router-dom';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F' }}>
      <Sidebar />
      <main style={{ marginLeft: SIDEBAR_WIDTH, minHeight: '100vh' }}>
        <div style={{ padding: 24, maxWidth: 1400 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
