type Item = { id: string; data: { published: boolean; sortOrder?: number; featured?: boolean; featuredOrder?: number } };
export function orderItems<T extends Item>(items: T[]): T[] {
  return [...items].sort((a,b) => (a.data.sortOrder ?? 999) - (b.data.sortOrder ?? 999) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
export function publicItems<T extends Item>(items: T[]): T[] { return orderItems(items.filter(i => i.data.published)); }
export function featuredItems<T extends Item>(items: T[]): T[] {
  return publicItems(items).filter(i => i.data.featured).sort((a,b) => (a.data.featuredOrder ?? 999) - (b.data.featuredOrder ?? 999) || (a.id < b.id ? -1 : 1));
}
export function validateRelations(projects: Item[], mechanics: (Item & { data: Item['data'] & { parentProject: string | { id: string } } })[]) {
  for (const m of mechanics.filter(m => m.data.published)) {
    const parentId = typeof m.data.parentProject === 'string' ? m.data.parentProject : m.data.parentProject.id;
    const parent = projects.find(p => p.id === parentId);
    if (!parent?.data.published) throw new Error(`${m.id}: published mechanic requires a published parent project (${parentId})`);
  }
}
export const statusLabels: Record<string,string> = { coming_soon: 'Coming soon', demo: 'Demo available', prototype: 'Playable prototype', in_development: 'In development', released: 'Released', published_mod: 'Published mod' };
