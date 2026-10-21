import { z } from 'astro/zod';
const httpsUrl = z.url().refine(v => v.startsWith('https://'), 'Use a public HTTPS URL');
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const claim = z.object({ id, text:z.string().min(1), sourceType:z.enum(['author','public']), sourceUrl:httpsUrl.optional(), lastVerifiedAt:z.iso.date(), reviewStatus:z.enum(['approved','pending']) });
const media = z.object({ src:z.string().startsWith('/media/'), alt:z.string().min(1), caption:z.string().min(1), credit:z.string().min(1), permission:z.literal('approved'), width:z.number().positive(), height:z.number().positive(), pixelArt:z.boolean().default(false) });
const evidence = z.object({ id, title:z.string().min(1), description:z.string().min(1), publicUrl:httpsUrl.optional(), image:media.optional(), sourceType:z.enum(['author','public']), lastVerifiedAt:z.iso.date() }).refine(e => !!e.publicUrl || !!e.image, 'Evidence needs a public URL or approved image');
const decision = z.object({ title:z.string(), problem:z.string(), action:z.string(), rationale:z.string().optional(), outcome:z.string().optional(), evidenceIds:z.array(id).min(1) });
const common = {
  title:z.string().optional(), shortDescription:z.string().max(120).optional(), published:z.boolean().default(false),
  sortOrder:z.number().int().nonnegative().default(999), featured:z.boolean().default(false), featuredOrder:z.number().int().nonnegative().optional(),
  roles:z.array(z.string()).default([]), attribution:z.string().optional(), claims:z.array(claim).default([]),
  evidence:z.array(evidence).default([]), decisions:z.array(decision).default([]), cover:media.optional(),
  gallery:z.array(media).default([]),
  video:z.object({ url:httpsUrl, label:z.string(), poster:media.optional() }).optional(),
  accent:z.enum(['mint','ice','sand','lilac','rose']).default('mint'),
  links:z.array(z.object({ label:z.string().min(1), url:httpsUrl })).default([]),
};
function refine(data: {published:boolean;title?:string;shortDescription?:string;roles:string[];attribution?:string;claims:z.infer<typeof claim>[];evidence:z.infer<typeof evidence>[];decisions:z.infer<typeof decision>[]}, ctx:z.RefinementCtx) {
  if (!data.published) return;
  for(const key of ['title','shortDescription','attribution'] as const) if(!data[key]?.trim()) ctx.addIssue({code:'custom',message:`Published content requires ${key}`,path:[key]});
  if(!data.roles.length) ctx.addIssue({code:'custom',message:'Published content requires roles',path:['roles']});
  if(!data.claims.length || data.claims.some(c=>c.reviewStatus !== 'approved' || (c.sourceType==='public' && !c.sourceUrl))) ctx.addIssue({code:'custom',message:'Published claims require approved sources',path:['claims']});
  const ids=data.evidence.map(e=>e.id);
  if(new Set(ids).size!==ids.length) ctx.addIssue({code:'custom',message:'Evidence IDs must be unique',path:['evidence']});
  if(new Set(data.claims.map(c=>c.id)).size!==data.claims.length) ctx.addIssue({code:'custom',message:'Claim IDs must be unique',path:['claims']});
  for(const d of data.decisions) for(const ref of d.evidenceIds) if(!ids.includes(ref)) ctx.addIssue({code:'custom',message:`Unknown evidence ID: ${ref}`,path:['decisions']});
}
export const projectSchema=z.object({ ...common,
  projectType:z.enum(['game','modding','collaboration','experiment']).optional(), context:z.enum(['indie','academic','personal','external-collaboration']).optional(),
  productStatus:z.enum(['coming_soon','demo','prototype','in_development','released','published_mod']).optional(),
  technologies:z.array(z.string()).default([]), availability:z.string().optional(), team:z.string().optional(),
  tagline:z.string().optional(), summary:z.string().optional(),
  contributions:z.array(z.object({title:z.string().min(1),description:z.string().min(1)})).default([]),
  credits:z.array(z.object({name:z.string(),role:z.string()})).default([]),
}).superRefine((data,ctx)=>{refine(data,ctx);if(data.published&&!data.projectType)ctx.addIssue({code:'custom',message:'Published project requires projectType',path:['projectType']});});
export const mechanicSchema=z.object({ ...common, parentProject:id.optional(),
  discipline:z.enum(['progression','ai','combat','systems','physics','ui-vfx','narrative','tooling','other']).optional(),
  depth:z.enum(['overview','case-study']).default('overview'), reviewStatus:z.enum(['approved','draft','needs-evidence']).default('draft'),
  problem:z.string().optional(), intent:z.string().optional(), constraints:z.array(z.string()).default([]),
  designSummary:z.string().optional(), implementationSummary:z.string().optional(), iterations:z.array(z.string()).default([]), outcomes:z.array(z.string()).default([]), learnings:z.array(z.string()).default([]),
  flow:z.array(z.object({label:z.string().min(1),detail:z.string().min(1)})).default([]),
}).superRefine((data,ctx)=>{refine(data,ctx);if(data.published){
  if(!data.parentProject||!data.discipline||data.reviewStatus!=='approved')ctx.addIssue({code:'custom',message:'Published mechanic requires parent, discipline and approval'});
  if(data.depth==='case-study'&&(!data.evidence.length||!data.problem||!data.intent||!data.designSummary||!data.iterations.length||!data.outcomes.length))ctx.addIssue({code:'custom',message:'Case study needs evidence, problem, intent, design, iteration and outcome'});
}});
