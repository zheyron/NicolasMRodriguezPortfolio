import { defineCollection } from 'astro:content';
// Schemas include reusable media galleries and documented system flows.
import { glob } from 'astro/loaders';
import { projectSchema, mechanicSchema } from './lib/schemas';
export const collections = {
  projects: defineCollection({ loader:glob({pattern:'*.md',base:'./src/content/projects'}),schema:projectSchema }),
  mechanics: defineCollection({ loader:glob({pattern:'*.md',base:'./src/content/mechanics'}),schema:mechanicSchema }),
};
