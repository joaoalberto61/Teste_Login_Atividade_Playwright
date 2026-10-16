import { Locator, Page } from '@playwright/test';

/**
 * Page Object da tela de login da LojaQA.
 *
 * Regras:
 *  - Todos os seletores ficam AQUI (os testes nunca usam CSS).
 *  - Nenhuma asserção dentro da classe: ela só expõe ações e Locators.
 */
export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly statusMessage: Locator;

  // Injeção de dependência: a Page vem de fora (do Playwright / fixture)
  constructor(private page: Page) {
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
    this.errorMessage = page.locator('#errorMessage');
    this.statusMessage = page.locator('#statusMessage');
  }

  // Usa o baseURL definido no playwright.config.ts
  async goto(): Promise<void> {
    await this.page.goto('login.html');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Preenche sem clicar (útil para validar o estado do botão)
  async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  // Locators expostos para as validações ficarem nos testes
  get email(): Locator {
    return this.emailInput;
  }

  get password(): Locator {
    return this.passwordInput;
  }

  get loginBtn(): Locator {
    return this.loginButton;
  }

  get error(): Locator {
    return this.errorMessage;
  }

  get status(): Locator {
    return this.statusMessage;
  }
}
