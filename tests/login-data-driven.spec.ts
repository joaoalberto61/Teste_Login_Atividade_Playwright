import { test, expect } from '../fixtures/auth.fixture';

type Cenario = {
  nome: string;
  email: string;
  senha: string;
  resultado: 'sucesso' | 'erro';
};

const cenarios: Cenario[] = [
  { nome: 'cliente válido', email: 'user@system.com', senha: 'UserPassword123', resultado: 'sucesso' },
  { nome: 'admin válido', email: 'admin@system.com', senha: 'AdminPassword123', resultado: 'sucesso' },
  { nome: 'lojista válido', email: 'lojista@system.com', senha: 'SellerPass123', resultado: 'sucesso' },
  { nome: 'cliente com senha errada', email: 'user@system.com', senha: 'SenhaErrada123', resultado: 'erro' },
  { nome: 'admin com senha errada', email: 'admin@system.com', senha: 'OutraSenha123', resultado: 'erro' },
];

test.describe('Login LojaQA - Data-Driven', () => {
  for (const cenario of cenarios) {
    test(`login: ${cenario.nome}`, async ({ loginPage, page }) => {
      await loginPage.login(cenario.email, cenario.senha);

      if (cenario.resultado === 'sucesso') {
        await expect(page).toHaveURL(/painel\.html/);
      } else {
        await expect(loginPage.error).toBeVisible();
        await expect(loginPage.error).toContainText(/Tentativa 1 de 3/);
        await expect(page).not.toHaveURL(/painel\.html/);
      }
    });
  }
});
