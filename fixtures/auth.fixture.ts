import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type AuthFixtures = {
  // Page Object já pronto, com a tela de login aberta
  loginPage: LoginPage;
  // Página já autenticada como cliente e dentro do painel
  paginaAutenticada: Page;
};

export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  paginaAutenticada: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@system.com', 'UserPassword123');
    await page.waitForURL(/painel\.html/);
    await use(page);
  },
});

export { expect };
