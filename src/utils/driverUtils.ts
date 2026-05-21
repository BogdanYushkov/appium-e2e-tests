import { logger } from './logger';
import { APP_PACKAGE } from '../config/envConfig';

export class DriverUtils {
    static async getPageSource(): Promise<string> {
        return await browser.getPageSource();
    }

    static async pressBack(): Promise<void> {
        logger.info('Pressing Android Back button');
        await browser.back();
    }

    static async pressHome(): Promise<void> {
        logger.info('Pressing Android Home button');
        await browser.execute('mobile: pressKey', { keycode: 3 });
    }

    static async hideKeyboard(): Promise<void> {
        try {
            if (await browser.isKeyboardShown()) {
                await browser.hideKeyboard();
                logger.info('Keyboard hidden');
            }
        } catch {
            logger.info('No keyboard to hide');
        }
    }

    static async restartApp(): Promise<void> {
        logger.info('Restarting application');
        await browser.terminateApp(APP_PACKAGE);
        await browser.activateApp(APP_PACKAGE);
    }

    static async isAppInstalled(): Promise<boolean> {
        return await browser.isAppInstalled(APP_PACKAGE);
    }

    static async getCurrentActivity(): Promise<string> {
        return await browser.getCurrentActivity();
    }

    static async getCurrentPackage(): Promise<string> {
        return await browser.getCurrentPackage();
    }

    static async scrollToElement(
        selector: string,
        maxScrolls: number = 5
    ): Promise<ChainablePromiseElement | null> {
        const { width, height } = await browser.getWindowSize();
        for (let i = 0; i < maxScrolls; i++) {
            const el = $(selector);
            if (await el.isDisplayed()) {
                return el;
            }
            await browser.execute('mobile: scrollGesture', {
                left: Math.round(width * 0.1),
                top: Math.round(height * 0.3),
                width: Math.round(width * 0.8),
                height: Math.round(height * 0.5),
                direction: 'down',
                percent: 0.75,
            });
        }
        logger.warn(`Element ${selector} not found after ${maxScrolls} scrolls`);
        return null;
    }
}
