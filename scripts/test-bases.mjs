import {spawnSync} from 'node:child_process';
for(const base of ['/','/portfolio-personal/']){const env={...process.env,BASE_PATH:base,ASTRO_TELEMETRY_DISABLED:'1'};for(const args of [['node_modules/astro/bin/astro.mjs','build'],['scripts/smoke-static.mjs']]){const r=spawnSync(process.execPath,args,{stdio:'inherit',env});if(r.status!==0)process.exit(r.status||1);}}
console.log('PASS: root and project-site builds. Run npm run build to restore release configuration.');
