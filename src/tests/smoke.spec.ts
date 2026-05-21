import { MainPage } from '../pages/MainPage';
import { ViewsPage } from '../pages/ViewsPage';
import { AutoCompletePage } from '../pages/AutoCompletePage';
import { PreferencePage } from '../pages/PreferencePage';
import { AllureHelper } from '../helpers/allureHelper';
import { DriverUtils } from '../utils/driverUtils';
import { APP_PACKAGE } from '../config/envConfig';

describe('Smoke Suite', () => {
    const mainPage = new MainPage();
    const viewsPage = new ViewsPage();
    const autoCompletePage = new AutoCompletePage();
    const preferencePage = new PreferencePage();

    beforeEach(async () => {
        await browser.terminateApp(APP_PACKAGE);
        await browser.activateApp(APP_PACKAGE);
        await mainPage.waitForPageLoaded();
    });

    it('should launch the app and display main screen', async () => {
        AllureHelper.addFeature('Smoke');
        AllureHelper.addSeverity('blocker');

        AllureHelper.addStep('Verify app launched successfully');
        expect(await mainPage.isDisplayed()).toBe(true);

        AllureHelper.addStep('Verify main list is visible');
        expect(await mainPage.isListViewDisplayed()).toBe(true);
    });

    it('should verify all main categories are present', async () => {
        AllureHelper.addFeature('Smoke');
        AllureHelper.addSeverity('blocker');

        const expectedCategories = [
            'Accessibility', 'Animation', 'App', 'Content', 'Graphics',
            'Media', 'NFC', 'OS', 'Preference', 'Text', 'Views',
        ];

        for (const category of expectedCategories) {
            AllureHelper.addStep(`Verify category "${category}" is visible`);
            expect(await mainPage.isCategoryVisible(category)).toBe(true);
        }
    });

    it('should navigate to Views and back', async () => {
        AllureHelper.addFeature('Smoke');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Navigate to Views');
        await mainPage.navigateTo('Views');
        await viewsPage.waitForPageLoaded();
        expect(await viewsPage.isDisplayed()).toBe(true);

        AllureHelper.addStep('Navigate back');
        await viewsPage.goBack();
        await mainPage.waitForPageLoaded();
        expect(await mainPage.isDisplayed()).toBe(true);
    });

    it('should open AutoComplete form and interact with input', async () => {
        AllureHelper.addFeature('Smoke');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Navigate to Views > Auto Complete > Screen Top');
        await mainPage.navigateToAutoCompleteScreenTop();
        await autoCompletePage.waitForPageLoaded();

        AllureHelper.addStep('Enter text and verify');
        await autoCompletePage.enterCountry('Canada');
        await DriverUtils.hideKeyboard();
        const text = await autoCompletePage.getCountryInputText();
        expect(text).toContain('Canada');
    });

    it('should open Preferences and toggle checkbox', async () => {
        AllureHelper.addFeature('Smoke');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Navigate to Preference > 5. Preferences from code');
        await mainPage.navigateToPreferencesFromCode();
        await preferencePage.waitForPageLoaded();

        AllureHelper.addStep('Toggle checkbox');
        const before = await preferencePage.isCheckboxChecked();
        await preferencePage.toggleCheckbox();
        const after = await preferencePage.isCheckboxChecked();
        expect(after).toBe(!before);
    });

    it('should verify app can be restarted', async () => {
        AllureHelper.addFeature('Smoke');
        AllureHelper.addSeverity('blocker');

        AllureHelper.addStep('Restart the app');
        await DriverUtils.restartApp();
        await mainPage.waitForPageLoaded();

        AllureHelper.addStep('Verify app is running after restart');
        expect(await mainPage.isDisplayed()).toBe(true);
    });
});
