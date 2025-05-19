import { Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: { role: 'textbox', name: string };
    readonly passwordInput: { role: 'textbox', name: string };
    readonly loginButton: { role: 'button', name: string };
    
    constructor(page: Page) {
        this.page = page;
        this.emailInput = { role: 'textbox', name: 'email' };
        this.passwordInput = { role: 'textbox', name: 'password' };
        this.loginButton = { role: 'button', name: 'login' };
    }
    
    async login(email: string, password: string) {
        await this.page.getByRole(this.emailInput.role, { name: this.emailInput.name }).fill(email);
        await this.page.getByRole(this.passwordInput.role, { name: this.passwordInput.name }).fill(password);
        await this.page.getByRole(this.loginButton.role, { name: this.loginButton.name }).click();
    }
}