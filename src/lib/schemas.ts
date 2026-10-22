import { z } from 'astro/zod';
const httpsUrl = z.url().refine(v => v.startsWith('https://'), 'Use a public HTTPS URL');
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const claim = z.object({ id, text:z.string().min(1), sourceType:z.enum(['author','public']), sourceUrl:httpsUrl.optional(), lastVerifiedAt:z.iso.date(), reviewStatus:z.enum(['approved','pending']) });
const media = z.object({ src:z.string().startsWith('/media/'), alt:z.string().min(1), caption:z.string().min(1), credit:z.string().min(1), permission:z.literal('approved'), width:z.number().positive(), height:z.number().positive(), pixelArt:z.boolean().default(false) });
const loop = z.object({src:z.string().regex(/^\/media\/.+\.(mp4|webm)$/),poster:media,label:z.string().min(1),caption:z.string().min(1),credit:z.string().min(1),permission:z.literal('approved')});
const characterLayer=z.object({image:media,axis:z.enum(['x','y']).default('y'),start:z.number().min(-100).max(100).default(28),end:z.number().min(-100).max(100).default(-28),anchor:z.enum(['left','right','center']).default('right'),size:z.number().min(32).max(200).default(112)});
const breakdown=z.object({title:z.string().min(1),summary:z.string().min(1),details:z.string().min(1),evidenceIds:z.array(id).min(1)});
const evidence = z.object({ id, title:z.string().min(1), description:z.string().min(1), publicUrl:httpsUrl.optional(), image:media.optional(), sourceType:z.enum(['author','public']), lastVerifiedAt:z.iso.date() }).refine(e => !!e.publicUrl || !!e.image, 'Evidence needs a public URL or approved image');
const decision = z.object({ title:z.string(), problem:z.string(), action:z.string(), rationale:z.string().optional(), outcome:z.string().optional(), evidenceIds:z.array(id).min(1) });
export const workshopImpactSchema=z.object({
  observedAt:z.iso.date(), profileUrl:httpsUrl,
  highlightId:z.string().regex(/^\d+$/),
  collections:z.number().int().nonnegative(), ratings:z.number().int().nonnegative(), comments:z.number().int().nonnegative(),
  items:z.array(z.object({
    id:z.string().regex(/^\d+$/), title:z.string().min(1), url:httpsUrl,
    subscribers:z.number().int().nonnegative(), lifetimeSubscriptions:z.number().int().nonnegative(),
    favorites:z.number().int().nonnegative(), visitors:z.number().int().nonnegative(),
  })).min(1),
}).superRefine((data,ctx)=>{
  if(new Set(data.items.map(i=>i.id)).size!==data.items.length)ctx.addIssue({code:'custom',message:'Workshop item IDs must be unique'});
  if(!data.items.some(i=>i.id===data.highlightId))ctx.addIssue({code:'custom',message:'Highlighted Workshop item must be in the catalogue'});
  for(const item of data.items){
    if(new URL(item.url).hostname!=='steamcommunity.com')ctx.addIssue({code:'custom',message:'Workshop statistics require a Steam Community source'});
    if(item.lifetimeSubscriptions<item.subscribers)ctx.addIssue({code:'custom',message:'Lifetime subscriptions cannot be below current subscribers'});
  }
});
const common = {
  title:z.string().optional(), shortDescription:z.string().max(120).optional(), published:z.boolean().default(false),
  sortOrder:z.number().int().nonnegative().default(999), featured:z.boolean().default(false), featuredOrder:z.number().int().nonnegative().optional(),
  roles:z.array(z.string()).default([]), attribution:z.string().optional(), claims:z.array(claim).default([]),
  evidence:z.array(evidence).default([]), decisions:z.array(decision).default([]), cover:media.optional(),
  gallery:z.array(media).default([]),
  diagrams:z.array(media).default([]),
  breakdowns:z.array(breakdown).default([]), loop:loop.optional(),
  video:z.object({ url:httpsUrl, label:z.string(), poster:media.optional() }).optional(),
  accent:z.enum(['mint','ice','sand','lilac','rose']).default('mint'),
  links:z.array(z.object({ label:z.string().min(1), url:httpsUrl })).default([]),
};
function refine(data: {published:boolean;title?:string;shortDescription?:string;roles:string[];attribution?:string;claims:z.infer<typeof claim>[];evidence:z.infer<typeof evidence>[];decisions:z.infer<typeof decision>[];breakdowns:z.infer<typeof breakdown>[]}, ctx:z.RefinementCtx) {
  if (!data.published) return;
  for(const key of ['title','shortDescription','attribution'] as const) if(!data[key]?.trim()) ctx.addIssue({code:'custom',message:`Published content requires ${key}`,path:[key]});
  if(!data.roles.length) ctx.addIssue({code:'custom',message:'Published content requires roles',path:['roles']});
  if(!data.claims.length || data.claims.some(c=>c.reviewStatus !== 'approved' || (c.sourceType==='public' && !c.sourceUrl))) ctx.addIssue({code:'custom',message:'Published claims require approved sources',path:['claims']});
  const ids=data.evidence.map(e=>e.id);
  if(new Set(ids).size!==ids.length) ctx.addIssue({code:'custom',message:'Evidence IDs must be unique',path:['evidence']});
  if(new Set(data.claims.map(c=>c.id)).size!==data.claims.length) ctx.addIssue({code:'custom',message:'Claim IDs must be unique',path:['claims']});
  for(const d of data.decisions) for(const ref of d.evidenceIds) if(!ids.includes(ref)) ctx.addIssue({code:'custom',message:`Unknown evidence ID: ${ref}`,path:['decisions']});
  for(const d of data.breakdowns) for(const ref of d.evidenceIds) if(!ids.includes(ref)) ctx.addIssue({code:'custom',message:`Unknown evidence ID: ${ref}`,path:['breakdowns']});
}
export const projectSchema=z.object({ ...common,
  projectType:z.enum(['game','modding','collaboration','professional-experience','experiment']).optional(), context:z.enum(['indie','academic','personal','external-collaboration','internship']).optional(),
  productStatus:z.enum(['coming_soon','demo','prototype','in_development','released','published_mod']).optional(),
  technologies:z.array(z.string()).default([]), availability:z.string().optional(), team:z.string().optional(),
  tagline:z.string().optional(), summary:z.string().optional(),
  workshopImpact:workshopImpactSchema.optional(),
  featuredChapter:z.boolean().default(false), chapterOrder:z.number().int().nonnegative().optional(), banner:media.optional(),
  characterLayers:z.array(characterLayer).max(3).default([]),
  showcaseCards:z.array(z.object({id,title:z.string().min(1),summary:z.string().min(1),kind:z.enum(['gameplay','design','production','mechanic']),media:media.optional(),loop:loop.optional(),linkedMechanicId:id.optional(),detailAnchor:id.optional()})).max(3).default([]),
  externalLinks:z.array(z.object({kind:z.enum(['steam','wishlist_steam','demo','itch','workshop','trailer','other']),label:z.string().min(1),url:httpsUrl,lastVerifiedAt:z.iso.date()})).default([]),
  challenges:z.array(z.string()).default([]), production:z.array(z.string()).default([]), iterations:z.array(z.string()).default([]), outcomes:z.array(z.string()).default([]), learnings:z.array(z.string()).default([]),
  contributions:z.array(z.object({title:z.string().min(1),description:z.string().min(1)})).default([]),
  credits:z.array(z.object({name:z.string(),role:z.string()})).default([]),
}).superRefine((data,ctx)=>{refine(data,ctx);if(!data.published)return;
  if(!data.projectType)ctx.addIssue({code:'custom',message:'Published project requires projectType',path:['projectType']});
  if(data.featuredChapter&&data.showcaseCards.length<2)ctx.addIssue({code:'custom',message:'Featured chapter needs at least two cards'});
  if(new Set(data.showcaseCards.map(c=>c.id)).size!==data.showcaseCards.length)ctx.addIssue({code:'custom',message:'Showcase IDs must be unique'});
  for(const link of data.externalLinks){const host=new URL(link.url).hostname;
    if(['steam','wishlist_steam'].includes(link.kind)&&host!=='store.steampowered.com')ctx.addIssue({code:'custom',message:'Steam CTA requires official Steam destination'});
    if(link.kind==='wishlist_steam'&&data.productStatus!=='coming_soon')ctx.addIssue({code:'custom',message:'Wishlist CTA requires verified upcoming status'});
    if(link.kind==='workshop'&&host!=='steamcommunity.com')ctx.addIssue({code:'custom',message:'Workshop CTA requires Steam Community'});
  }
});
export const mechanicSchema=z.object({ ...common, parentProject:id.optional(),
  discipline:z.enum(['progression','ai','combat','systems','physics','ui-vfx','narrative','tooling','other']).optional(),
  depth:z.enum(['overview','case-study']).default('overview'), reviewStatus:z.enum(['approved','draft','needs-evidence']).default('draft'),
  problem:z.string().optional(), intent:z.string().optional(), constraints:z.array(z.string()).default([]),
  alternatives:z.array(z.string()).default([]),
  designSummary:z.string().optional(), implementationSummary:z.string().optional(), iterations:z.array(z.string()).default([]), outcomes:z.array(z.string()).default([]), learnings:z.array(z.string()).default([]),
  flow:z.array(z.object({label:z.string().min(1),detail:z.string().min(1)})).default([]),
}).superRefine((data,ctx)=>{refine(data,ctx);if(data.published){
  if(!data.parentProject||!data.discipline||data.reviewStatus!=='approved')ctx.addIssue({code:'custom',message:'Published mechanic requires parent, discipline and approval'});
  if(data.depth==='case-study'&&(!data.evidence.length||!data.problem||!data.intent||!data.designSummary||!data.iterations.length||!data.outcomes.length))ctx.addIssue({code:'custom',message:'Case study needs evidence, problem, intent, design, iteration and outcome'});
}});
