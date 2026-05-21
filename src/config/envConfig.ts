const isCI = !!process.env.CI;

export const APP_PACKAGE = 'io.appium.android.apis';
export const APP_ACTIVITY = '.ApiDemos';

export const envConfig = {
    isCI,
    appium: {
        host: 'localhost',
        port: 4723,
        path: '/',
    },
    timeouts: {
        implicit: 10000,
        explicit: isCI ? 20000 : 15000,
        appiumCommand: isCI ? 300000 : 240000,
        pageLoad: isCI ? 45000 : 30000,
    },
    retry: {
        maxAttempts: isCI ? 2 : 3,
        delay: isCI ? 2000 : 1000,
    },
    screenshots: {
        dir: 'reports/screenshots',
        onFailure: true,
    },
    logging: {
        level: 'info' as const,
        dir: 'reports/logs',
    },
};
