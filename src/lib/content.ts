import { getCollection } from 'astro:content';
import { publicItems, validateRelations } from './contracts';
export async function content() {
  const projects=await getCollection('projects'); const mechanics=await getCollection('mechanics');
  for(const item of [...projects,...mechanics]) if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) throw new Error(`Invalid slug: ${item.id}`);
  validateRelations(projects,mechanics as Parameters<typeof validateRelations>[1]);
  for(const p of projects.filter(p=>p.data.published)) for(const card of p.data.showcaseCards){
    if(card.linkedMechanicId&&!mechanics.some(m=>m.id===card.linkedMechanicId&&m.data.published&&m.data.parentProject===p.id))throw new Error(`${p.id}: showcase mechanic must belong to the project`);
  }
  return {projects:publicItems(projects),mechanics:publicItems(mechanics)};
}
