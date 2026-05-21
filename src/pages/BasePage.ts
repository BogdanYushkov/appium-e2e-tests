import { DriverUtils } from '../utils/driverUtils';
import { logger } from '../utils/logger';
import { envConfig } from '../config/envConfig';

export abstract class BasePage {
    abstract get pageIdentifier(): ChainablePromiseElement;

    async isDisplayed(timeout?: number): Promise<boolean> {
        try {
            const t = timeout ?? envConfig.timeouts.explicit;
            await this.pageIdentifier.waitForDisplayed({ timeout: t });
            return true;
        } catch {
            return false;
        }
    }

    async waitForPageLoaded(timeout?: number): Promise<void> {
        const t = timeout ?? envConfig.timeouts.explicit;
        await this.pageIdentifier.waitForDisplayed({ timeout: t });
        logger.info(`${this.constructor.name} loaded`);
    }

    protected async click(element: ChainablePromiseElement): Promise<void> {
        await element.waitForDisplayed({ timeout: envConfig.timeouts.explicit });
        await element.waitForEnabled({ timeout: envConfig.timeouts.explicit });
        await element.click();
    }

    protected async setText(element: ChainablePromiseElement, text: string): Promise<void> {
        await element.waitForDisplayed({ timeout: envConfig.timeouts.explicit });
        await element.clearValue();
        await element.setValue(text);
        logger.info(`Text set: "${text}"`);
    }

    protected async getText(element: ChainablePromiseElement): Promise<string> {
        await element.waitForDisplayed({ timeout: envConfig.timeouts.explicit });
        return element.getText();
    }

    async isElementDisplayed(element: ChainablePromiseElement): Promise<boolean> {
        try {
            return await element.isDisplayed();
        } catch {
            return false;
        }
    }

    protected async getAttributeValue(
        element: ChainablePromiseElement,
        attribute: string
    ): Promise<string | null> {
        await element.waitForDisplayed({ timeout: envConfig.timeouts.explicit });
        return element.getAttribute(attribute);
    }

    async goBack(): Promise<void> {
        await DriverUtils.pressBack();
    }
}
