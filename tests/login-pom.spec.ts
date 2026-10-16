import { test, expect } from '../fixtures/auth.fixture';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login LojaQA - Page Object Model', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Cenário 1 (caminho feliz): cliente válido é redirecionado para o painel', async ({ page }) => {
    await loginPage.login('user@system.com', 'UserPassword123');

    await expect(loginPage.status).toBeVisible();
    await expect(page).toHaveURL(/painel\.html/);
  });

  test('Cenário 2 (caminho triste): senha incorreta exibe mensagem de erro', async ({ page }) => {
    await loginPage.login('user@system.com', 'SenhaErrada123');

    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).toContainText(/Tentativa 1 de 3/);
    await expect(page).not.toHaveURL(/painel\.html/);
  });

  test('Cenário 3 (regra de negócio): botão Entrar inicia desabilitado', async () => {
    await expect(loginPage.loginBtn).toBeDisabled();

    await loginPage.fillCredentials('user@system.com', 'UserPassword123');
    await expect(loginPage.loginBtn).toBeEnabled();
  });
});

// Demonstra o uso da fixture customizada (base.extend)
test('Fixture: paginaAutenticada já chega logada no painel', async ({ paginaAutenticada }) => {
  await expect(paginaAutenticada).toHaveURL(/painel\.html/);
});

test('Fixture: loginPage já entrega a tela de login aberta', async ({ loginPage }) => {
  await expect(loginPage.email).toBeVisible();
  await expect(loginPage.loginBtn).toBeDisabled();
});
