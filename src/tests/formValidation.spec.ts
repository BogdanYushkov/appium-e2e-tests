import { MainPage } from '../pages/MainPage';
import { PreferencePage } from '../pages/PreferencePage';
import { AllureHelper } from '../helpers/allureHelper';
import { APP_PACKAGE } from '../config/envConfig';

describe('Form Validation Tests', () => {
    const mainPage = new MainPage();
    const preferencePage = new PreferencePage();

    beforeEach(async () => {
        await browser.terminateApp(APP_PACKAGE);
        await browser.activateApp(APP_PACKAGE);
        await mainPage.waitForPageLoaded();

        AllureHelper.addStep('Navigate to Preference > 5. Preferences from code');
        await mainPage.navigateToPreferencesFromCode();
        await preferencePage.waitForPageLoaded();
    });

    it('should toggle checkbox preference on and off', async () => {
        AllureHelper.addFeature('Form Validation');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Get initial checkbox state');
        const initialState = await preferencePage.isCheckboxChecked();

        AllureHelper.addStep('Toggle checkbox');
        await preferencePage.toggleCheckbox();
        const afterToggle = await preferencePage.isCheckboxChecked();
        expect(afterToggle).toBe(!initialState);

        AllureHelper.addStep('Toggle checkbox back');
        await preferencePage.toggleCheckbox();
        const restoredState = await preferencePage.isCheckboxChecked();
        expect(restoredState).toBe(initialState);
    });

    it('should toggle switch preference', async () => {
        AllureHelper.addFeature('Form Validation');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Get initial switch state');
        const initialState = await preferencePage.isSwitchChecked();

        AllureHelper.addStep('Toggle switch');
        await preferencePage.toggleSwitch();
        const afterToggle = await preferencePage.isSwitchChecked();
        expect(afterToggle).toBe(!initialState);
    });

    it('should enter text in edit text preference dialog', async () => {
        AllureHelper.addFeature('Form Validation');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Enter text in edit text dialog');
        await preferencePage.setEditTextValue('Test Value 123');

        AllureHelper.addStep('Verify dialog closed successfully');
        expect(await preferencePage.isDisplayed()).toBe(true);
    });

    it('should cancel edit text dialog without saving', async () => {
        AllureHelper.addFeature('Form Validation');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Open and cancel edit text dialog');
        await preferencePage.cancelEditTextDialog();

        AllureHelper.addStep('Verify back on preferences screen');
        expect(await preferencePage.isDisplayed()).toBe(true);
    });

    it('should open list preference dialog', async () => {
        AllureHelper.addFeature('Form Validation');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Open list preference');
        await preferencePage.openListPreference();

        AllureHelper.addStep('Verify list dialog is displayed');
        const dialogTitle = $('android=new UiSelector().resourceId("android:id/alertTitle")');
        await dialogTitle.waitForDisplayed({ timeout: 5000 });
        expect(await dialogTitle.isDisplayed()).toBe(true);
    });
});
