import { MainPage } from '../pages/MainPage';
import { AutoCompletePage } from '../pages/AutoCompletePage';
import { AllureHelper } from '../helpers/allureHelper';
import { DriverUtils } from '../utils/driverUtils';
import { APP_PACKAGE } from '../config/envConfig';

describe('Negative Tests', () => {
    const mainPage = new MainPage();
    const autoCompletePage = new AutoCompletePage();

    beforeEach(async () => {
        await browser.terminateApp(APP_PACKAGE);
        await browser.activateApp(APP_PACKAGE);
        await mainPage.waitForPageLoaded();
    });

    it('should handle non-existent category gracefully', async () => {
        AllureHelper.addFeature('Negative Tests');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Try to find non-existent category');
        const nonExistent = $('~NonExistentCategory');
        const isDisplayed = await nonExistent.isExisting();
        expect(isDisplayed).toBe(false);
    });

    it('should handle empty input in autocomplete field', async () => {
        AllureHelper.addFeature('Negative Tests');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Navigate to AutoComplete screen');
        await mainPage.navigateToAutoCompleteScreenTop();
        await autoCompletePage.waitForPageLoaded();

        AllureHelper.addStep('Submit empty input');
        await autoCompletePage.clearCountryInput();
        await DriverUtils.hideKeyboard();

        AllureHelper.addStep('Verify app does not crash with empty input');
        expect(await autoCompletePage.isCountryInputDisplayed()).toBe(true);
    });

    it('should handle special characters in input', async () => {
        AllureHelper.addFeature('Negative Tests');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Navigate to AutoComplete screen');
        await mainPage.navigateToAutoCompleteScreenTop();
        await autoCompletePage.waitForPageLoaded();

        AllureHelper.addStep('Enter special characters');
        await autoCompletePage.enterCountry('!@#$%^&*()');
        await DriverUtils.hideKeyboard();

        AllureHelper.addStep('Verify app handles special characters without crashing');
        expect(await autoCompletePage.isCountryInputDisplayed()).toBe(true);
    });

    it('should handle rapid back navigation without crash', async () => {
        AllureHelper.addFeature('Negative Tests');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Navigate deep into the app');
        await mainPage.navigateTo('Views');

        AllureHelper.addStep('Rapidly press back multiple times');
        await DriverUtils.pressBack();
        await DriverUtils.pressBack();

        AllureHelper.addStep('Verify app is still running');
        await browser.activateApp(APP_PACKAGE);
        await mainPage.waitForPageLoaded();
        expect(await mainPage.isListViewDisplayed()).toBe(true);
    });

    it('should handle app restart and restore state', async () => {
        AllureHelper.addFeature('Negative Tests');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Navigate to a subcategory');
        await mainPage.navigateTo('App');

        AllureHelper.addStep('Restart the app');
        await DriverUtils.restartApp();

        AllureHelper.addStep('Verify app restarts to main screen');
        await mainPage.waitForPageLoaded();
        expect(await mainPage.isCategoryVisible('App')).toBe(true);
    });
});
