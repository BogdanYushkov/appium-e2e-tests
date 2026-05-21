import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class MainPage extends BasePage {
    get pageIdentifier() {
        return $('~Accessibility');
    }

    private get listView() {
        return $('android.widget.ListView');
    }

    async navigateTo(category: string): Promise<void> {
        logger.info(`Navigating to: ${category}`);
        const item = $(`~${category}`);
        await this.click(item);
    }

    async navigateToAutoCompleteScreenTop(): Promise<void> {
        logger.info('Navigating to Views > Auto Complete > 1. Screen Top');
        await this.navigateTo('Views');
        const autoComplete = $('~Auto Complete');
        await autoComplete.waitForDisplayed({ timeout: 10000 });
        await autoComplete.click();
        const screenTop = $('~1. Screen Top');
        await screenTop.waitForDisplayed({ timeout: 10000 });
        await screenTop.click();
    }

    async navigateToPreferencesFromCode(): Promise<void> {
        logger.info('Navigating to Preference > 5. Preferences from code');
        await this.navigateTo('Preference');
        const prefsFromCode = $('~5. Preferences from code');
        await prefsFromCode.waitForDisplayed({ timeout: 10000 });
        await prefsFromCode.click();
    }

    async isCategoryVisible(category: string): Promise<boolean> {
        return this.isElementDisplayed($(`~${category}`));
    }

    async getVisibleCategories(): Promise<string[]> {
        const items = await $$('android=new UiSelector().resourceId("android:id/text1")');
        const categories: string[] = [];
        for (const item of items) {
            if (await item.isDisplayed()) {
                categories.push(await item.getText());
            }
        }
        return categories;
    }

    async isListViewDisplayed(): Promise<boolean> {
        return this.isElementDisplayed(this.listView);
    }
}
