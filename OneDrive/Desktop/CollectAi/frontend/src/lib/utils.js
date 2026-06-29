import { formatDistanceToNow, format } from 'date-fns';

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
}

export function formatDuration(seconds) {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function timeAgo(date) {
  if (!date) return '—';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatDate(date) {
  if (!date) return '—';
  return format(new Date(date), 'dd MMM yyyy, hh:mm a');
}

export function formatShortDate(date) {
  if (!date) return '—';
  return format(new Date(date), 'dd MMM, hh:mm a');
}

export function getStatusColor(status) {
  const map = {
    pending: 'warning',
    promised: 'info',
    paid: 'success',
    refused: 'danger',
    callback: 'info',
    no_answer: 'muted',
    wrong_number: 'muted',
    dnc: 'danger',
    completed: 'success',
    initiated: 'info',
    in_progress: 'warning',
    failed: 'danger'
  };
  return map[status] || 'muted';
}

export function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function getDaysBadgeColor(days) {
  if (days < 30) return 'success';
  if (days < 60) return 'warning';
  return 'danger';
}
