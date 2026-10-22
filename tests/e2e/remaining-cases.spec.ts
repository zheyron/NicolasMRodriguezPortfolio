import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const studies=[
 ['mechamorphosis-menu-audio','the-mechamorphosis'],
 ['duskheir-state-aware-world','duskheir'],
 ['duskheir-grass-feedback','duskheir'],
 ['duskheir-player-backend','duskheir'],
 ['duskheir-runtime-pooling','duskheir'],
 ['pillarfall-destructible-terrain','pillarfall'],
 ['p5js-movement-prototype','p5js-physics'],
] as const;
for(const [study,parent] of studies)test(`${study}: evidence, keyboard and accessible reading`,async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(`/mechanics/${study}/`);
 await expect(page.locator('h1')).toBeVisible();
 await expect(page.getByRole('link',{name:/^Part of /})).toHaveAttribute('href',`/work/${parent}/`);
 for(const img of await page.locator('main img').all()){
  await img.scrollIntoViewIfNeeded();
  await expect.poll(()=>img.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 }
 const details=page.locator('details').first();
 await details.locator('summary').focus();await page.keyboard.press('Enter');
 await expect(details).toHaveAttribute('open','');
 await page.keyboard.press('Space');await expect(details).not.toHaveAttribute('open','');
 for(const link of await page.locator('a[href^="#evidence-"]').all()){
  const href=await link.getAttribute('href');await expect(page.locator(href!)).toHaveCount(1);
 }
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 await page.getByRole('link',{name:/^Part of /}).click();
 await expect(page.locator(`#studies a[href="/mechanics/${study}/"]`)).toHaveCount(1);
});

test('new clips load on request with reduced motion and pause offscreen',async({page})=>{
 for(const [slug,width] of [['duskheir-state-aware-world',1280],['duskheir-grass-feedback',1280],['duskheir-player-backend',1280],['p5js-movement-prototype',800]] as const){
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(`/mechanics/${slug}/`);
  const video=page.locator('video');await video.scrollIntoViewIfNeeded();
  expect(await video.getAttribute('src')).toBeNull();
  await page.getByRole('button',{name:/^Play clip:/}).click();
  await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
  expect(await video.evaluate(v=>(v as HTMLVideoElement).videoWidth)).toBe(width);
  expect(await video.evaluate(v=>(v as HTMLVideoElement).muted)).toBe(true);
  await page.locator('.detail-end').scrollIntoViewIfNeeded();
  await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
 }
});

for(const slug of ['duskheir-player-backend','duskheir-runtime-pooling'])test(`${slug}: diagrams can be opened with the keyboard`,async({page})=>{
 await page.goto(`/mechanics/${slug}/`);
 await expect(page.getByRole('heading',{name:'Inside the architecture'})).toBeVisible();
 const links=page.getByRole('link',{name:/^Open diagram:/});
 await expect(links).toHaveCount(2);
 for(let i=0;i<2;i++){
  const href=await links.nth(i).getAttribute('href');
  await links.nth(i).focus();await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$'));
  await expect(page.locator('svg')).toBeVisible();
  await page.goBack();
 }
});

for(const width of [360,390,768,1280,1920])test(`remaining projects and studies fit ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 const routes=[...studies.map(([s])=>`/mechanics/${s}/`),...['the-mechamorphosis','duskheir','pillarfall','p5js-physics','the-pyramid','ceiba-spaciosa','tempus-vitae'].map(s=>`/work/${s}/`)];
 for(const route of routes){
  await page.goto(route);await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route).toBe(true);
 }
});
