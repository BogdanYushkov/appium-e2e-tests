import { MainPage } from '../pages/MainPage';
import { ViewsPage } from '../pages/ViewsPage';
import { AppPage } from '../pages/AppPage';
import { AllureHelper } from '../helpers/allureHelper';
import { APP_PACKAGE } from '../config/envConfig';

describe('Navigation Tests', () => {
    const mainPage = new MainPage();
    const viewsPage = new ViewsPage();
    const appPage = new AppPage();

    beforeEach(async () => {
        await browser.terminateApp(APP_PACKAGE);
        await browser.activateApp(APP_PACKAGE);
        await mainPage.waitForPageLoaded();
    });

    it('should display main categories on home screen', async () => {
        AllureHelper.addFeature('Navigation');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Verify main page list is displayed');
        expect(await mainPage.isListViewDisplayed()).toBe(true);

        AllureHelper.addStep('Verify key categories are visible');
        expect(await mainPage.isCategoryVisible('Accessibility')).toBe(true);
        expect(await mainPage.isCategoryVisible('App')).toBe(true);
        expect(await mainPage.isCategoryVisible('Views')).toBe(true);
        expect(await mainPage.isCategoryVisible('Preference')).toBe(true);
    });

    it('should navigate to Views and display subcategories', async () => {
        AllureHelper.addFeature('Navigation');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Navigate to Views');
        await mainPage.navigateTo('Views');
        await viewsPage.waitForPageLoaded();

        AllureHelper.addStep('Verify Views subcategories');
        expect(await viewsPage.isItemVisible('Animation')).toBe(true);
        expect(await viewsPage.isItemVisible('Auto Complete')).toBe(true);
    });

    it('should navigate to App and display subcategories', async () => {
        AllureHelper.addFeature('Navigation');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Navigate to App');
        await mainPage.navigateTo('App');
        await appPage.waitForPageLoaded();

        AllureHelper.addStep('Verify App subcategories');
        expect(await appPage.isItemVisible('Activity')).toBe(true);
        expect(await appPage.isItemVisible('Alarm')).toBe(true);
    });

    it('should navigate back from subcategory to main screen', async () => {
        AllureHelper.addFeature('Navigation');
        AllureHelper.addSeverity('critical');

        AllureHelper.addStep('Navigate to Views');
        await mainPage.navigateTo('Views');
        await viewsPage.waitForPageLoaded();

        AllureHelper.addStep('Go back to main screen');
        await viewsPage.goBack();
        await mainPage.waitForPageLoaded();

        AllureHelper.addStep('Verify main screen is shown');
        expect(await mainPage.isCategoryVisible('Views')).toBe(true);
    });

    it('should navigate through deep hierarchy: Views > Auto Complete', async () => {
        AllureHelper.addFeature('Navigation');
        AllureHelper.addSeverity('normal');

        AllureHelper.addStep('Navigate to Views');
        await mainPage.navigateTo('Views');
        await viewsPage.waitForPageLoaded();

        AllureHelper.addStep('Navigate to Auto Complete');
        await viewsPage.navigateToAutoComplete();

        AllureHelper.addStep('Select Screen Top option');
        const screenTopItem = $('~1. Screen Top');
        await screenTopItem.waitForDisplayed({ timeout: 10000 });
        await screenTopItem.click();

        AllureHelper.addStep('Verify Auto Complete screen loaded');
        const countryLabel = $('~Country:');
        await countryLabel.waitForDisplayed({ timeout: 10000 });
        expect(await countryLabel.isDisplayed()).toBe(true);
    });
});
