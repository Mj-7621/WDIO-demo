class LoginPage {

    get #inputUsername() {
        return $('#username');
    }

    get #inputPassword() {
        return $('#password');
    }

    get #btnLogin() {
        return $('button[type="submit"]');
    }

    get #flashMessage() {
        return $('#flash');
    }

    async open(): Promise<void> {
        await browser.url('/login');
    }

    async enterUsername(username: string): Promise<void> {
        await (await this.#inputUsername).waitForDisplayed();
        await (await this.#inputUsername).setValue(username);
    }

    async enterPassword(password: string): Promise<void> {
        await (await this.#inputPassword).waitForDisplayed();
        await (await this.#inputPassword).setValue(password);
    }

    async clickLoginButton(): Promise<void> {
        await (await this.#btnLogin).waitForClickable();
        await (await this.#btnLogin).click();
    }

    async getFlashMessageText(): Promise<string> {
        await (await this.#flashMessage).waitForDisplayed();
        return (await this.#flashMessage).getText();
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}

export default new LoginPage();
