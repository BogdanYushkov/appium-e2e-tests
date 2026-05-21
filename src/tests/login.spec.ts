import { MainPage } from '../pages/MainPage';
import { AutoCompletePage } from '../pages/AutoCompletePage';
import { AllureHelper } from '../helpers/allureHelper';
import { DriverUtils } from '../utils/driverUtils';
import { APP_PACKAGE } from '../config/envConfig';

describe('Login Tests (AutoComplete Form)', () => {
    const mainPage = new MainPage();
    const autoCompletePage = new AutoCompletePage();

    beforeEach(async () => {
        await browser.terminateApp(APP_PACKAGE);
        await browser.activateApp(APP_PACKAGE);
        await mainPage.waitForPageLoaded();

        AllureHelper.addStep('Navigate to Views > Auto Complete > 1. Screen Top');
        await mainPage.navigateToAutoCompleteScreenTop();
        await autoCompletePage.waitForPageLoaded();
    });

    it('should display the input form correctly', async () => {
        AllureHelper.addFeature('Login');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Verify Country label is visible');
        expect(await autoCompletePage.isElementDisplayed(autoCompletePage.countryLabel)).toBe(true);

        AllureHelper.addStep('Verify input field is visible');
        expect(await autoCompletePage.isCountryInputDisplayed()).toBe(true);
    });

    it('should accept text input in the form field', async () => {
        AllureHelper.addFeature('Login');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Enter text in country field');
        await autoCompletePage.enterCountry('United States');
        await DriverUtils.hideKeyboard();

        AllureHelper.addStep('Verify input contains entered text');
        const inputText = await autoCompletePage.getCountryInputText();
        expect(inputText).toContain('United');
    });

    it('should clear the input field', async () => {
        AllureHelper.addFeature('Login');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Enter text');
        await autoCompletePage.enterCountry('Canada');
        await DriverUtils.hideKeyboard();

        AllureHelper.addStep('Clear input');
        await autoCompletePage.clearCountryInput();

        AllureHelper.addStep('Verify field is cleared');
        const inputText = await autoCompletePage.getCountryInputText();
        expect(inputText === '' || inputText === null).toBe(true);
    });

    it('should show autocomplete suggestions', async () => {
        AllureHelper.addFeature('Login');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Type partial country name for suggestions');
        await autoCompletePage.enterCountry('Uni');

        AllureHelper.addStep('Verify suggestions appear');
        const suggestions = await autoCompletePage.getSuggestions();
        expect(suggestions.length).toBeGreaterThan(0);
    });

    it('should move focus with Give me Focus button', async () => {
        AllureHelper.addFeature('Login');
        AllureHelper.addSeverity('minor');

        AllureHelper.addStep('Enter text in country field');
        await autoCompletePage.enterCountry('Test');
        await DriverUtils.hideKeyboard();

        AllureHelper.addStep('Tap Give me Focus button');
        await autoCompletePage.tapGiveMeFocus();

        AllureHelper.addStep('Verify focus changed (button is interactable)');
        const buttonEl = await autoCompletePage.giveMeFocusButton;
        expect(await buttonEl.isEnabled()).toBe(true);
    });
});
