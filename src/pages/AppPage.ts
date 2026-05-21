import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class AppPage extends BasePage {
    get pageIdentifier() {
        return $('~Activity');
    }

    get activityItem() {
        return $('~Activity');
    }

    get alarmItem() {
        return $('~Alarm');
    }

    get searchItem() {
        return $('~Search');
    }

    async navigateToActivity(): Promise<void> {
        logger.info('Navigating to Activity');
        await this.click(this.activityItem);
    }

    async navigateToSearch(): Promise<void> {
        logger.info('Navigating to Search');
        await this.click(this.searchItem);
    }

    async isItemVisible(itemName: string): Promise<boolean> {
        return this.isElementDisplayed($(`~${itemName}`));
    }
}
