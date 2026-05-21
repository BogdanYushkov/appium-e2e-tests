import { BasePage } from './BasePage';
import { logger } from '../utils/logger';
import { DriverUtils } from '../utils/driverUtils';

export class ViewsPage extends BasePage {
    get pageIdentifier() {
        return $('~Animation');
    }

    get autoCompleteItem() {
        return $('~Auto Complete');
    }

    get buttonsItem() {
        return $('~Buttons');
    }

    get dateWidgetsItem() {
        return $('~Date Widgets');
    }

    get controlsItem() {
        return $('~Controls');
    }

    get listView() {
        return $('android.widget.ListView');
    }

    async navigateToAutoComplete(): Promise<void> {
        logger.info('Navigating to Auto Complete');
        await this.click(this.autoCompleteItem);
    }

    async navigateToButtons(): Promise<void> {
        logger.info('Navigating to Buttons');
        await this.click(this.buttonsItem);
    }

    async navigateToControls(): Promise<void> {
        logger.info('Navigating to Controls');
        const el = await DriverUtils.scrollToElement('~Controls');
        if (el) await el.click();
    }

    async isItemVisible(itemName: string): Promise<boolean> {
        return this.isElementDisplayed($(`~${itemName}`));
    }

    async tapItem(name: string): Promise<void> {
        logger.info(`Tapping: ${name}`);
        await this.click($(`~${name}`));
    }
}
