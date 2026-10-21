import { getCollection } from 'astro:content';
import { publicItems, validateRelations } from './contracts';
export async function content() {
  const projects=await getCollection('projects'); const mechanics=await getCollection('mechanics');
  for(const item of [...projects,...mechanics]) if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) throw new Error(`Invalid slug: ${item.id}`);
  validateRelations(projects,mechanics as Parameters<typeof validateRelations>[1]);
  return {projects:publicItems(projects),mechanics:publicItems(mechanics)};
}
