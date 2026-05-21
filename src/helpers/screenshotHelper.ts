import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger';
import { envConfig } from '../config/envConfig';
import allure from '@wdio/allure-reporter';

class ScreenshotHelper {
    private screenshotDir: string;

    constructor() {
        this.screenshotDir = path.resolve(__dirname, '../../', envConfig.screenshots.dir);
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
        }
    }

    async take(name: string): Promise<string> {
        const sanitized = name.replace(/[^a-zA-Z0-9_-]/g, '_');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${sanitized}_${timestamp}.png`;
        const filepath = path.join(this.screenshotDir, filename);

        const base64 = await browser.takeScreenshot();
        const buffer = Buffer.from(base64, 'base64');
        fs.writeFileSync(filepath, buffer);
        logger.info(`Screenshot saved: ${filepath}`);

        try {
            allure.addAttachment(name, buffer, 'image/png');
        } catch {
            logger.warn('Could not attach screenshot to Allure report');
        }

        return filepath;
    }

    async takeOnFailure(testName: string): Promise<string> {
        logger.info(`Taking failure screenshot for: ${testName}`);
        return this.take(`FAIL_${testName}`);
    }
}

export const screenshotHelper = new ScreenshotHelper();
