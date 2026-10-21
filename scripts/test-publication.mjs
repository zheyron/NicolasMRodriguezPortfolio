import {writeFileSync,unlinkSync,existsSync,readFileSync} from 'node:fs';import {spawnSync} from 'node:child_process';import assert from 'node:assert/strict';
const fixture='src/content/projects/qa-publication-fixture.md';
if(existsSync(fixture))throw new Error('Refusing to overwrite an existing publication fixture');
const build=()=>spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{encoding:'utf8',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});
try {
 writeFileSync(fixture,'---\npublished: false\ntitle: QA_DRAFT_SENTINEL\n---\nNon-sensitive test fixture.\n');
 let result=build();assert.equal(result.status,0,result.stderr);assert(!existsSync('dist/work/qa-publication-fixture/index.html'));assert(!readFileSync('dist/work/index.html','utf8').includes('QA_DRAFT_SENTINEL'));assert(!readFileSync('dist/sitemap-0.xml','utf8').includes('qa-publication-fixture'));
 writeFileSync(fixture,'---\npublished: true\ntitle: QA_INVALID_SENTINEL\n---\nNon-sensitive test fixture.\n');
 result=build();assert.notEqual(result.status,0,'Invalid published entry must fail build');
 console.log('PASS: drafts excluded from HTML, lists and sitemap; invalid publication fails build.');
} finally {if(existsSync(fixture))unlinkSync(fixture);const result=build();if(result.status!==0){console.error(result.stderr);process.exitCode=1;}}
