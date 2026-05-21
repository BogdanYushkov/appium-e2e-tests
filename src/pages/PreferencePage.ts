import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class PreferencePage extends BasePage {
    get pageIdentifier() {
        return $('android=new UiSelector().text("Checkbox preference")');
    }

    get checkboxPreferenceTitle() {
        return $('android=new UiSelector().text("Checkbox preference")');
    }

    get checkboxWidget() {
        return $('android=new UiSelector().resourceId("android:id/checkbox").instance(0)');
    }

    get switchPreferenceTitle() {
        return $('android=new UiSelector().text("Switch preference")');
    }

    get switchWidget() {
        return $('android=new UiSelector().resourceId("android:id/switch_widget")');
    }

    get editTextPreference() {
        return $('android=new UiSelector().text("Edit text preference")');
    }

    get listPreference() {
        return $('android=new UiSelector().text("List preference")');
    }

    get editTextDialog() {
        return $('android=new UiSelector().resourceId("android:id/edit")');
    }

    get dialogOkButton() {
        return $('android=new UiSelector().resourceId("android:id/button1")');
    }

    get dialogCancelButton() {
        return $('android=new UiSelector().resourceId("android:id/button2")');
    }

    get parentCheckbox() {
        return $('android=new UiSelector().text("Parent checkbox preference")');
    }

    get childCheckbox() {
        return $('android=new UiSelector().text("Child checkbox preference")');
    }

    async toggleCheckbox(): Promise<void> {
        logger.info('Toggling checkbox preference');
        await this.click(this.checkboxPreferenceTitle);
    }

    async isCheckboxChecked(): Promise<boolean> {
        const el = await this.checkboxWidget;
        return (await el.getAttribute('checked')) === 'true';
    }

    async toggleSwitch(): Promise<void> {
        logger.info('Toggling switch preference');
        await this.click(this.switchPreferenceTitle);
    }

    async isSwitchChecked(): Promise<boolean> {
        const el = await this.switchWidget;
        return (await el.getAttribute('checked')) === 'true';
    }

    async openEditTextDialog(): Promise<void> {
        logger.info('Opening edit text dialog');
        await this.click(this.editTextPreference);
    }

    async setEditTextValue(text: string): Promise<void> {
        await this.openEditTextDialog();
        const el = await this.editTextDialog;
        await el.waitForDisplayed({ timeout: 10000 });
        await el.clearValue();
        await el.setValue(text);
        // Dismiss keyboard via IME done action (back key closes the entire dialog)
        try {
            await browser.execute('mobile: performEditorAction', { action: 'done' });
        } catch {
            // Fallback: tap outside the input to defocus and dismiss keyboard
            await el.click();
        }
        await this.dialogOkButton.waitForDisplayed({ timeout: 10000 });
        await this.dialogOkButton.click();
        logger.info(`Set edit text to: "${text}"`);
        await this.waitForDialogClosed();
    }

    async cancelEditTextDialog(): Promise<void> {
        await this.openEditTextDialog();
        const el = await this.editTextDialog;
        await el.waitForDisplayed({ timeout: 10000 });
        // Use back() to dismiss keyboard/overlays, then back() again if dialog still open
        await browser.back();
        await browser.waitUntil(
            async () => {
                try {
                    return !(await el.isDisplayed());
                } catch {
                    return true;
                }
            },
            { timeout: 5000 }
        ).catch(async () => {
            // Dialog still open after first back — press back again to cancel
            await browser.back();
        });
        logger.info('Cancelled edit text dialog');
    }

    async openListPreference(): Promise<void> {
        logger.info('Opening list preference dialog');
        await this.click(this.listPreference);
    }

    private async waitForDialogClosed(): Promise<void> {
        await browser.waitUntil(
            async () => {
                try {
                    return !(await this.dialogOkButton.isDisplayed());
                } catch {
                    return true;
                }
            },
            { timeout: 10000, timeoutMsg: 'Dialog did not close in time' }
        );
    }
}
