import {test,expect} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';
const routes=['/','/work/','/mechanics/','/about/','/contact/','/work/snowballing/','/mechanics/snowballing-progression/','/mechanics/snowballing-upgrade-choices/','/mechanics/snowballing-health-feedback/','/work/pillarfall/','/work/jigsaw-jab/','/work/tempus-vitae/','/mechanics/jigsaw-jab-combat-puzzle/','/404.html'];
test('real media loads with correct dimensions and gallery links work',async({page})=>{
  for(const route of ['/','/work/snowballing/','/mechanics/snowballing-progression/','/mechanics/snowballing-health-feedback/']){
    await page.goto(route);
    for(const img of await page.locator('img').all()){
      await img.scrollIntoViewIfNeeded();
      await expect.poll(()=>img.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      expect(await img.evaluate(el=>{const i=el as HTMLImageElement;return i.naturalWidth===Number(i.getAttribute('width'))&&i.naturalHeight===Number(i.getAttribute('height'));})).toBe(true);
    }
  }
  const first=page.locator('.media-zoom').first();const href=await first.getAttribute('href');
  await first.click();await expect(page).toHaveURL(new RegExp(href!.replaceAll('.','\\.')));
  await page.goBack();await expect(page.locator('h1')).toContainText('Making health');
});
for(const width of [360,390,768,1280,1920]) test(`responsive and navigation at ${width}px`,async({page})=>{await page.setViewportSize({width,height:900});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));for(const route of routes){await page.goto(route);await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if(width<768){await page.getByRole('button',{name:/Menu/}).click();await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:/Menu/})).toBeFocused();} }expect(errors).toEqual([]);});
for(const route of ['/','/work/','/mechanics/','/work/snowballing/','/mechanics/snowballing-progression/','/mechanics/snowballing-upgrade-choices/','/mechanics/snowballing-health-feedback/','/contact/'])test(`WCAG audit ${route}`,async({page})=>{await page.goto(route);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();expect(result.violations).toEqual([]);});
test('keyboard, crosslinks and no-JS navigation',async({page,browser})=>{await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByText('Skip to content')).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();await page.goto('/work/snowballing/');await page.getByRole('link',{name:/progression between runs/i}).click();await expect(page).toHaveURL(/mechanics\/snowballing-progression/);await page.getByRole('link',{name:/Part of Snowballing/}).click();await expect(page).toHaveURL(/work\/snowballing/);const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const p=await context.newPage();await p.goto('http://127.0.0.1:4321/');await p.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Work',exact:true}).click();await expect(p.locator('h1')).toContainText('Games');await context.close();});

test('v1.2 scroll layers reverse and preserve layout',async({page})=>{
 await page.setViewportSize({width:1280,height:900});await page.goto('/');
 const layer=page.locator('.hero-art .character-layer');
 const value=()=>layer.evaluate(el=>getComputedStyle(el).transform);
 await expect.poll(value).not.toBe('none');const initial=await value();
 const heroHeight=await page.locator('.personal-hero').evaluate(el=>el.getBoundingClientRect().height);
 await page.evaluate(()=>window.scrollTo({top:240,behavior:'instant'}));await expect.poll(value).not.toBe(initial);
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await expect.poll(value).toBe(initial);
 expect(await page.locator('.personal-hero').evaluate(el=>el.getBoundingClientRect().height)).toBe(heroHeight);
});
test('v1.2 reduced motion keeps characters static and loops opt-in',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await expect(page.locator('.hero-art .character-layer')).toHaveCSS('transform','none');
 const video=page.locator('#snowballing video');await video.scrollIntoViewIfNeeded();
 expect(await video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
 expect(await video.getAttribute('src')).toBeNull();
 await page.getByRole('button',{name:'Play clip: Snowballing gameplay'}).click();
 await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(false);
 expect(await video.evaluate(v=>(v as HTMLVideoElement).muted)).toBe(true);
 await page.getByRole('button',{name:'Pause clip: Snowballing gameplay'}).click();
 await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
});
test('v1.2 gameplay lazy loads, plays silently, pauses offscreen and respects manual pause',async({page})=>{
 await page.goto('/');const video=page.locator('#snowballing video');expect(await video.getAttribute('src')).toBeNull();
 await video.scrollIntoViewIfNeeded();await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
 expect(await video.evaluate(v=>(v as HTMLVideoElement).muted)).toBe(true);
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
 await video.scrollIntoViewIfNeeded();await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(false);
 await page.getByRole('button',{name:'Pause clip: Snowballing gameplay'}).click();
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await video.scrollIntoViewIfNeeded();
 expect(await video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
});
test('v1.2 save-data disables automatic video loading',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true}));
 await page.goto('/');const video=page.locator('#snowballing video');await video.scrollIntoViewIfNeeded();
 expect(await video.getAttribute('src')).toBeNull();expect(await video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
});
test('v1.2 contextual CTAs and keyboard breakdowns',async({page,browser})=>{
 await page.goto('/');await expect(page.locator('.game-chapter')).toHaveCount(2);
 await expect(page.getByRole('link',{name:'Wishlist on Steam'})).toHaveAttribute('href','https://store.steampowered.com/app/4107020/Jigsaw_Jab/');
 await page.getByRole('link',{name:'Read the design breakdown'}).click();await expect(page).toHaveURL(/jigsaw-jab\/#design-breakdown/);
 const breakdown=page.locator('#design-breakdown details').first();const summary=breakdown.locator('summary');await summary.focus();await page.keyboard.press('Enter');
 await expect(breakdown).toHaveAttribute('open','');await page.keyboard.press('Space');await expect(breakdown).not.toHaveAttribute('open','');
 const context=await browser.newContext({javaScriptEnabled:false});const p=await context.newPage();await p.goto('http://127.0.0.1:4321/work/snowballing/');
 await p.locator('summary').first().click();await expect(p.locator('details').first()).toHaveAttribute('open','');await expect(p.getByRole('link',{name:'Watch Snowballing gameplay'})).toBeVisible();await context.close();
});

test('Jigsaw gameplay, compact chapter cards, contacts and QA credit',async({page})=>{
 await page.setViewportSize({width:1280,height:900});await page.goto('/');
 const video=page.locator('#jigsaw-jab video');await video.scrollIntoViewIfNeeded();
 await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
 expect(await video.evaluate(v=>(v as HTMLVideoElement).muted)).toBe(true);
 for(const chapter of ['jigsaw-jab','snowballing']){
  const cards=page.locator(`#${chapter} .showcase-card:not(.showcase-visual)`);
  for(const card of await cards.all())expect(await card.evaluate(el=>el.getBoundingClientRect().height)).toBeLessThan(350);
 }
 await page.goto('/work/jigsaw-jab/');const frame=page.locator('iframe');await expect(frame).not.toHaveAttribute('src',/./);
 await page.getByText('Open Steam store card',{exact:true}).focus();await page.keyboard.press('Enter');
 await expect(frame).toHaveAttribute('src','https://store.steampowered.com/widget/4107020/');
 await expect(page.locator('footer').getByRole('link',{name:'rodriguezbohl@gmail.com'})).toHaveAttribute('href','mailto:rodriguezbohl@gmail.com');
 await expect(page.locator('footer').getByRole('link',{name:/LinkedIn/})).toHaveAttribute('href','https://www.linkedin.com/in/rodriguez-nic/');
 await page.goto('/work/tempus-vitae/');await expect(page.locator('main')).toContainText('December 2024 to March 2025');await expect(page.locator('main')).toContainText('Whiteboard Games');
});

test('Home projects have real covers and professional experience is distinct',async({page})=>{
 await page.setViewportSize({width:1280,height:900});await page.goto('/');
 await expect(page.locator('.hero-art')).not.toContainText('A little character');
 await expect(page.locator('.hero-art')).not.toContainText('Meet Snowy');
 await expect(page.locator('.type-cover')).toHaveCount(0);
 for(const card of await page.locator('.project-card').all())await expect(card.locator('img')).toHaveCount(1);
 const left=await page.locator('#jigsaw-jab .showcase-grid > .showcase-card').boundingBox();
 const right=await page.locator('#jigsaw-jab .showcase-stack').boundingBox();
 expect(Math.abs((left!.y+left!.height)-(right!.y+right!.height))).toBeLessThan(3);
 await expect(page.locator('#jigsaw-jab .showcase-stack img')).toHaveCount(1);
 await page.goto('/work/');await expect(page.locator('#professional-experience')).toContainText('Tempus Vitae');
 await expect(page.locator('#collaboration')).not.toContainText('Tempus Vitae');
 await page.goto('/work/tempus-vitae/');await expect(page.locator('main')).toContainText('Professional internship');
});

test('Mechanics keeps images and studies under their own game',async({page})=>{
 await page.goto('/mechanics/');
 await expect(page.getByRole('navigation',{name:'Explore mechanics by game'})).toBeVisible();
 const expected={'jigsaw-jab':1,'snowballing':3,'gingaten':1};
 for(const [id,count] of Object.entries(expected)){
  const group=page.locator(`.mechanics-project#${id}`);
  await expect(group.locator('.mechanic-card')).toHaveCount(count);
  for(const img of await group.locator('.mechanic-card img').all()){
   await expect(img).toHaveAttribute('src',new RegExp(`/media/${id}/`));
   await img.scrollIntoViewIfNeeded();
   await expect.poll(()=>img.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await expect(group.getByRole('link',{name:'View game project'})).toHaveAttribute('href',`/work/${id}/`);
 }
 await expect(page.locator('#snowballing')).not.toContainText('Gingaten');
 await expect(page.locator('#gingaten')).not.toContainText('Snowballing');
 await page.getByRole('navigation',{name:'Explore mechanics by game'}).getByRole('link',{name:/Snowballing/}).click();
 await expect(page).toHaveURL(/mechanics\/#snowballing/);
 for(const width of [360,390,768,1280,1920]){
  await page.setViewportSize({width,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 }
});

test('Workshop totals, accessible chart and complete catalogue',async({page})=>{
 await page.goto('/work/kenshi-mods/');
 await expect(page.locator('.impact-totals')).toContainText('218,338');
 await expect(page.locator('.impact-totals')).toContainText('674,998');
 await expect(page.locator('.subscription-bars li')).toHaveCount(6);
 await expect(page.locator('.subscription-bars li').first()).toContainText('Martial Village');
 await expect(page.locator('.impact-scope')).toContainText('not unique players');
 await page.locator('.workshop-catalogue summary').focus();await page.keyboard.press('Enter');
 await expect(page.locator('.workshop-catalogue')).toHaveAttribute('open','');
 await expect(page.locator('.workshop-catalogue tbody tr')).toHaveCount(21);
 const total=await page.locator('.workshop-catalogue tbody tr td:first-of-type').evaluateAll(cells=>cells.reduce((sum,c)=>sum+Number(c.textContent!.replaceAll(',','')),0));
 expect(total).toBe(218338);
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(audit.violations).toEqual([]);
 for(const width of [360,390,768,1280,1920]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
});

test('Jigsaw native cursor states and reversible character movement',async({page,browser})=>{
 await page.setViewportSize({width:1280,height:900});await page.goto('/');
 await expect(page.locator('body')).toHaveCSS('cursor',/cursor\/normal\.png/);
 const link=page.getByRole('link',{name:'View Work',exact:true});await link.hover();await expect(link).toHaveCSS('cursor',/cursor\/hover\.png/);
 await page.mouse.down();await expect(page.locator('html')).toHaveAttribute('data-game-cursor-pressed','');await expect(link).toHaveCSS('cursor',/cursor\/pressed\.png/);
 await page.mouse.move(5,5);await page.mouse.up();await expect(page.locator('html')).not.toHaveAttribute('data-game-cursor-pressed');
 const layers=page.locator('#jigsaw-jab .character-layer');await expect(layers).toHaveCount(2);
 await page.evaluate(async()=>{await document.fonts.ready;});
 const top=await page.locator('#jigsaw-jab .game-banner').evaluate(el=>Math.round(el.getBoundingClientRect().top+scrollY-120));
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top);
 await expect.poll(()=>layers.first().evaluate(el=>{
  const rect=el.closest('[data-character-layers]')!.getBoundingClientRect();
  const progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));
  const start=Number((el as HTMLElement).dataset.start),end=Number((el as HTMLElement).dataset.end);
  return Math.abs(new DOMMatrixReadOnly(getComputedStyle(el).transform).m41-(start+(end-start)*progress));
 })).toBeLessThan(.01);
 const initial=await layers.first().evaluate(el=>getComputedStyle(el).transform);
 await page.evaluate(y=>scrollTo({top:y+180,behavior:'instant'}),top);await expect.poll(()=>layers.first().evaluate(el=>getComputedStyle(el).transform)).not.toBe(initial);
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top);await expect.poll(()=>layers.first().evaluate(el=>getComputedStyle(el).transform)).toBe(initial);
 await page.emulateMedia({reducedMotion:'reduce'});for(const layer of await layers.all())await expect(layer).toHaveCSS('transform','none');
 const touch=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width:390,height:844}});const p=await touch.newPage();await p.goto('http://127.0.0.1:4321/');await expect(p.locator('body')).not.toHaveCSS('cursor',/cursor\/normal/);await touch.close();
});
