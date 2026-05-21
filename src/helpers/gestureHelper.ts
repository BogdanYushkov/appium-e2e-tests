import { logger } from '../utils/logger';

export class GestureHelper {
    static async swipeUp(percent: number = 0.75): Promise<void> {
        logger.info('Swiping up');
        const { width, height } = await browser.getWindowSize();
        await browser.execute('mobile: swipeGesture', {
            left: width * 0.1,
            top: height * 0.3,
            width: width * 0.8,
            height: height * 0.5,
            direction: 'up',
            percent,
        });
    }

    static async swipeDown(percent: number = 0.75): Promise<void> {
        logger.info('Swiping down');
        const { width, height } = await browser.getWindowSize();
        await browser.execute('mobile: swipeGesture', {
            left: width * 0.1,
            top: height * 0.3,
            width: width * 0.8,
            height: height * 0.5,
            direction: 'down',
            percent,
        });
    }

    static async tap(x: number, y: number): Promise<void> {
        logger.info(`Tapping at coordinates: ${x}, ${y}`);
        await browser.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x, y })
            .down()
            .up()
            .perform();
    }

    static async longPress(element: WebdriverIO.Element, duration: number = 2000): Promise<void> {
        logger.info('Performing long press');
        await browser.execute('mobile: longClickGesture', {
            elementId: element.elementId,
            duration,
        });
    }
}
