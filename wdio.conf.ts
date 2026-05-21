import type { Options } from '@wdio/types';
import { androidCapabilities } from './src/config/capabilities';
import { envConfig } from './src/config/envConfig';
import { screenshotHelper } from './src/helpers/screenshotHelper';
import { logger } from './src/utils/logger';
import fs from 'fs';
import path from 'path';

const isCI = envConfig.isCI;

const reportsDir = path.resolve(__dirname, 'reports');
const allureResultsDir = path.resolve(reportsDir, 'allure-results');
const screenshotsDir = path.resolve(reportsDir, 'screenshots');

[allureResultsDir, screenshotsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Copy Allure metadata into results dir
const categoriesFile = path.resolve(__dirname, 'allure', 'categories.json');
if (fs.existsSync(categoriesFile)) {
    fs.copyFileSync(categoriesFile, path.join(allureResultsDir, 'categories.json'));
}

// Generate environment.properties for local runs (CI generates its own)
if (!isCI) {
    const envProps = [
        'Platform=Android',
        'App=ApiDemos-debug.apk',
        'Framework=WebdriverIO 9.x',
        'Runner=Appium / UiAutomator2',
        `Environment=${isCI ? 'CI' : 'Local'}`,
    ].join('\n');
    fs.writeFileSync(path.join(allureResultsDir, 'environment.properties'), envProps);
}

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        tsNodeOpts: {
            project: './tsconfig.json',
        },
    },
    port: envConfig.appium.port,
    specs: ['./src/tests/**/*.spec.ts'],
    suites: {
        smoke: ['./src/tests/smoke.spec.ts'],
        login: ['./src/tests/login.spec.ts'],
        navigation: ['./src/tests/navigation.spec.ts'],
        form: ['./src/tests/formValidation.spec.ts'],
        negative: ['./src/tests/negative.spec.ts'],
    },
    maxInstances: 1,
    capabilities: [androidCapabilities as WebdriverIO.Capabilities],
    logLevel: isCI ? 'info' : 'warn',
    bail: 0,
    waitforTimeout: envConfig.timeouts.explicit,
    connectionRetryTimeout: isCI ? 90000 : 120000,
    connectionRetryCount: 3,
    services: isCI
        ? []
        : [
              [
                  'appium',
                  {
                      args: { relaxedSecurity: true },
                      command: 'appium',
                  },
              ],
          ],
    framework: 'mocha',
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: allureResultsDir,
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: isCI ? 90000 : 120000,
        retries: 1,
    },

    beforeSession() {
        logger.info(`Starting test session (CI: ${isCI})`);
    },

    before() {
        logger.info('Test suite starting');
    },

    afterTest: async function (test, _context, { passed }) {
        if (!passed && envConfig.screenshots.onFailure) {
            await screenshotHelper.takeOnFailure(test.title);
        }
    },

    after() {
        logger.info('Test suite completed');
    },

    afterSession() {
        logger.info('Test session ended');
    },
};
