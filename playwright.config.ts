import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests/e2e',use:{baseURL:'http://127.0.0.1:4321',headless:true},workers:1,reporter:'list',webServer:{command:'node node_modules/astro/bin/astro.mjs preview --host 127.0.0.1',url:'http://127.0.0.1:4321',reuseExistingServer:!process.env.CI}});
