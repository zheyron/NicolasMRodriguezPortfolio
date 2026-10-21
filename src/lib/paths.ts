export function normalizeBase(base = '/') {
  const value = base.replace(/^\/+|\/+$/g, '');
  return value ? `/${value}/` : '/';
}
export function withBase(path: string, base = '/') {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const prefix = normalizeBase(base);
  if (prefix !== '/' && (path === prefix.slice(0, -1) || path.startsWith(prefix))) return path === prefix.slice(0, -1) ? prefix : path;
  return prefix + path.replace(/^\/+/, '');
}
export function absoluteUrl(path: string, site: string | URL, base = '/') {
  return new URL(withBase(path, base), new URL(site).origin).href;
}
