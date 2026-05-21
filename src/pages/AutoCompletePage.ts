import { BasePage } from './BasePage';
import { DriverUtils } from '../utils/driverUtils';
import { logger } from '../utils/logger';

export class AutoCompletePage extends BasePage {
    get pageIdentifier() {
        return $('~Country:');
    }

    get countryLabel() {
        return $('~Country:');
    }

    get countryInput() {
        return $('id=io.appium.android.apis:id/edit');
    }

    get giveMeFocusButton() {
        return $('~Give me Focus');
    }

    async enterCountry(text: string): Promise<void> {
        logger.info(`Entering country: ${text}`);
        await this.setText(this.countryInput, text);
    }

    async getCountryInputText(): Promise<string> {
        const el = await this.countryInput;
        return el.getText();
    }

    async clearCountryInput(): Promise<void> {
        const el = await this.countryInput;
        await el.clearValue();
        logger.info('Country input cleared');
    }

    async tapGiveMeFocus(): Promise<void> {
        logger.info('Tapping "Give me Focus" button');
        await this.click(this.giveMeFocusButton);
    }

    async isCountryInputDisplayed(): Promise<boolean> {
        return this.isElementDisplayed(this.countryInput);
    }

    async getSuggestions(): Promise<string[]> {
        const suggestions: string[] = [];
        try {
            // Wait for autocomplete dropdown to appear
            await browser.waitUntil(
                async () => {
                    const items = await $$('android.widget.TextView');
                    for (const item of items) {
                        const text = await item.getText();
                        if (text && text !== 'Country:' && !text.includes('Views/')) {
                            return true;
                        }
                    }
                    return false;
                },
                { timeout: 5000 }
            );

            const items = await $$('android.widget.TextView');
            for (const item of items) {
                if (await item.isDisplayed()) {
                    const text = await item.getText();
                    if (text && text !== 'Country:' && !text.includes('Views/')) {
                        suggestions.push(text);
                    }
                }
            }
        } catch {
            logger.info('No suggestions found');
        }
        return suggestions;
    }

    async selectSuggestion(text: string): Promise<void> {
        const suggestion = $(`android=new UiSelector().text("${text}")`);
        await this.click(suggestion);
        await DriverUtils.hideKeyboard();
        logger.info(`Selected suggestion: ${text}`);
    }
}
