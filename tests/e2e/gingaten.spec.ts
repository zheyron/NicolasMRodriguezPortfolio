import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const studies=['gingaten-ai-overview','gingaten-scavenger-mining','gingaten-steering'];

for(const slug of studies)test(`Gingaten ${slug}: playable evidence and accessible breakdowns`,async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(`/mechanics/${slug}/`);
 await expect(page.getByRole('link',{name:'Part of Gingaten'})).toHaveAttribute('href','/work/gingaten/');
 await expect(page.locator('.system-flow li')).toHaveCount(4);
 const video=page.locator('video');
 await expect(video).not.toHaveAttribute('src');
 const poster=await video.getAttribute('poster');
 expect((await page.request.get(poster!)).ok()).toBe(true);
 const button=page.getByRole('button',{name:/Play clip:/});
 await button.focus();await page.keyboard.press('Enter');
 await expect.poll(()=>video.evaluate(v=>!(v as HTMLVideoElement).paused)).toBe(true);
 await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).videoWidth)).toBe(1280);
 expect(await video.evaluate(v=>(v as HTMLVideoElement).muted)).toBe(true);
 await page.getByRole('button',{name:/Pause clip:/}).click();
 await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
 const summary=page.locator('details summary').first();
 await summary.focus();await page.keyboard.press('Enter');
 await expect(page.locator('details').first()).toHaveAttribute('open','');
 await page.keyboard.press('Enter');await expect(page.locator('details').first()).not.toHaveAttribute('open');
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 expect(audit.violations).toEqual([]);
});

test('Gingaten loops pause out of view and project links reach every study',async({page})=>{
 await page.goto('/work/gingaten/');
 for(const slug of studies)await expect(page.locator(`#studies a[href="/mechanics/${slug}/"]`)).toBeVisible();
 const image=page.locator('.media-zoom').first();const href=await image.getAttribute('href');
 expect((await page.request.get(href!)).ok()).toBe(true);
 await page.goto('/mechanics/gingaten-scavenger-mining/');
 const video=page.locator('video');await video.scrollIntoViewIfNeeded();
 await expect.poll(()=>video.evaluate(v=>!(v as HTMLVideoElement).paused)).toBe(true);
 await page.locator('.detail-end').scrollIntoViewIfNeeded();
 await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
 await page.emulateMedia({reducedMotion:'reduce'});
 await video.scrollIntoViewIfNeeded();
 await expect.poll(()=>video.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
});
