import { Given, When, Then } from '@cucumber/cucumber';
import loginPage from '../page-objects/login.page';
import securePage from '../page-objects/secure.page';

Given(/^I am on the login page$/, async () => {
    await loginPage.open();
});

When(/^I enter username "([^"]*)" and password "([^"]*)"$/, async (username: string, password: string) => {
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
});

When(/^I click the login button$/, async () => {
    await loginPage.clickLoginButton();
});

Then(/^I should see the "([^"]*)" message$/, async (expectedMessage: string) => {
    const currentUrl = await browser.getUrl();
    let actualMessage: string;

    if (currentUrl.includes('/secure')) {
        actualMessage = await securePage.getFlashMessageText();
    } else {
        actualMessage = await loginPage.getFlashMessageText();
    }

    expect(actualMessage).toContain(expectedMessage);

    console.log('Maruti & Deepa is here');
});
