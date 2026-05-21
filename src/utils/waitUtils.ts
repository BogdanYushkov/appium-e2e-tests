import { envConfig } from '../config/envConfig';
import { logger } from './logger';

export class WaitUtils {
    static async waitForElement(
        element: WebdriverIO.Element,
        timeout: number = envConfig.timeouts.explicit
    ): Promise<WebdriverIO.Element> {
        await element.waitForExist({ timeout });
        await element.waitForDisplayed({ timeout });
        return element;
    }

    static async waitForElementClickable(
        element: WebdriverIO.Element,
        timeout: number = envConfig.timeouts.explicit
    ): Promise<WebdriverIO.Element> {
        await element.waitForExist({ timeout });
        await element.waitForDisplayed({ timeout });
        await element.waitForEnabled({ timeout });
        return element;
    }

    static async waitForElementToDisappear(
        element: WebdriverIO.Element,
        timeout: number = envConfig.timeouts.explicit
    ): Promise<void> {
        await element.waitForDisplayed({ timeout, reverse: true });
    }

    static async waitForTextPresent(
        element: WebdriverIO.Element,
        text: string,
        timeout: number = envConfig.timeouts.explicit
    ): Promise<void> {
        await browser.waitUntil(
            async () => {
                const elementText = await element.getText();
                return elementText.includes(text);
            },
            { timeout, timeoutMsg: `Text "${text}" not found in element after ${timeout}ms` }
        );
    }

    static async pause(ms: number): Promise<void> {
        logger.info(`Pausing for ${ms}ms`);
        await browser.pause(ms);
    }
}
