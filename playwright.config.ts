import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: false,
  retries: 1,
  reporter: 'html',
  // A API do LojaQA fica no Render e pode demorar no primeiro acesso
  timeout: 60_000,
  expect: { timeout: 30_000 },
  use: {
    // A barra final é importante para o goto('login.html') resolver certo
    baseURL: 'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
