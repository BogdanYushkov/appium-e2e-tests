import path from 'path';
import { envConfig, APP_PACKAGE, APP_ACTIVITY } from './envConfig';

export const androidCapabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:app': path.resolve(__dirname, '../../apps/ApiDemos-debug.apk'),
    'appium:appPackage': APP_PACKAGE,
    'appium:appActivity': APP_ACTIVITY,
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': envConfig.isCI ? 180 : 240,
    'appium:uiautomator2ServerInstallTimeout': envConfig.isCI ? 90000 : 60000,
    'appium:adbExecTimeout': envConfig.isCI ? 90000 : 60000,
};
