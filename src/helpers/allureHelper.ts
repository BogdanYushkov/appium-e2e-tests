import allure from '@wdio/allure-reporter';
import { logger } from '../utils/logger';

export class AllureHelper {
    static addStep(name: string): void {
        allure.addStep(name);
        logger.info(`Step: ${name}`);
    }

    static addFeature(feature: string): void {
        allure.addFeature(feature);
    }

    static addStory(story: string): void {
        allure.addStory(story);
    }

    static addSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): void {
        allure.addSeverity(severity);
    }

    static addDescription(description: string): void {
        allure.addDescription(description);
    }
}
