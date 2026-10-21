import {test,expect} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';
const routes=['/','/work/','/mechanics/','/about/','/contact/','/work/snowballing/','/mechanics/snowballing-progression/','/mechanics/snowballing-upgrade-choices/','/mechanics/snowballing-health-feedback/','/work/pillarfall/','/404.html'];
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
 const video=page.locator('video');await video.scrollIntoViewIfNeeded();
 expect(await video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
 expect(await video.getAttribute('src')).toBeNull();
 await page.getByRole('button',{name:'Play clip: Snowballing local gameplay'}).click();
 await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(false);
 expect(await video.evaluate(v=>(v as HTMLVideoElement).muted)).toBe(true);
 await page.getByRole('button',{name:'Pause clip: Snowballing local gameplay'}).click();
 await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
});
test('v1.2 gameplay lazy loads, plays silently, pauses offscreen and respects manual pause',async({page})=>{
 await page.goto('/');const video=page.locator('video');expect(await video.getAttribute('src')).toBeNull();
 await video.scrollIntoViewIfNeeded();await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
 expect(await video.evaluate(v=>(v as HTMLVideoElement).muted)).toBe(true);
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
 await video.scrollIntoViewIfNeeded();await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(false);
 await page.getByRole('button',{name:'Pause clip: Snowballing local gameplay'}).click();
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await video.scrollIntoViewIfNeeded();
 expect(await video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
});
test('v1.2 save-data disables automatic video loading',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true}));
 await page.goto('/');const video=page.locator('video');await video.scrollIntoViewIfNeeded();
 expect(await video.getAttribute('src')).toBeNull();expect(await video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
});
test('v1.2 contextual CTAs and keyboard breakdowns',async({page,browser})=>{
 await page.goto('/');await expect(page.locator('.game-chapter')).toHaveCount(2);
 await expect(page.getByRole('link',{name:'Wishlist on Steam'})).toHaveAttribute('href','https://store.steampowered.com/app/4107020/Jigsaw_Jab/');
 await page.getByRole('link',{name:'Read the design breakdown'}).click();await expect(page).toHaveURL(/jigsaw-jab\/#design-breakdown/);
 const summary=page.locator('summary').first();await summary.focus();await page.keyboard.press('Enter');
 await expect(page.locator('details').first()).toHaveAttribute('open','');await page.keyboard.press('Space');await expect(page.locator('details').first()).not.toHaveAttribute('open','');
 const context=await browser.newContext({javaScriptEnabled:false});const p=await context.newPage();await p.goto('http://127.0.0.1:4321/work/snowballing/');
 await p.locator('summary').first().click();await expect(p.locator('details').first()).toHaveAttribute('open','');await expect(p.getByRole('link',{name:'Watch Snowballing local gameplay'})).toBeVisible();await context.close();
});
