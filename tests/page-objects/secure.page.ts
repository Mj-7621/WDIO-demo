class SecurePage {

    get #flashMessage() {
        return $('#flash');
    }

    get #btnLogout() {
        return $('a.button[href="/logout"]');
    }

    async getFlashMessageText(): Promise<string> {
        await (await this.#flashMessage).waitForDisplayed();
        return (await this.#flashMessage).getText();
    }

    async clickLogout(): Promise<void> {
        await (await this.#btnLogout).waitForClickable();
        await (await this.#btnLogout).click();
        console.log("We are in the live Demo");
    }
}

export default new SecurePage();
