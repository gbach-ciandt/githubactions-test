class ProfileScreen {
    // Locators
    get btnExpandTheMenu() {
      return $("~Expandir menú");
    }

    get profileMenuOption() {
      return $('android=new UiSelector().text("Perfil")');
    }

    get changePasswordOption() {
      return $("id=zena.dominos.qa:id/profile_menu_custom_change_password");
    }
  
    get currentPasswordField() {
      return $('android=new UiSelector().text("Contraseña actual")');
    }
  
    get newPasswordField() {
      return $('android=new UiSelector().text("Contraseña nueva")');
    }
  
    get confirmPasswordField() {
      return $('android=new UiSelector().text("Confirmar contraseña")');
    }
  
    get btnSave() {
      return $("id=zena.dominos.qa:id/tool_bar_button_end");
    }
  
    get txtPasswordChanged() {
      return $("id=android:id/message");
    }
  
    get btnOkThanks() {
      return $('//android.widget.Button[@resource-id="android:id/button3"]');
    }
  
    get personalDetailsOption() {
      return $('id=zena.dominos.qa:id/profile_menu_custom_info');
    }
  
    get phoneNumberField() {
      return $('id=zena.dominos.qa:id/personal_info_cv_phone_number');
    }
  
    get clickOnSignOut() {
      return $('id=zena.dominos.qa:id/profile_menu_button_sign_out');
    }

    // Methods
    async clickOnExpandTheMenu() {
      await this.btnExpandTheMenu.click();
    }

    async clickOnProfileOption() {
      await this.profileMenuOption.waitForDisplayed({ timeout: 30000 });
      await this.profileMenuOption.click();
    }
  
    async clickOnChangePassword() {
      await this.changePasswordOption.click();
    }

    async fillPasswordChanged(currentPassword, newPassword, confirmPassword) {
      await this.currentPasswordField.setValue(currentPassword);
      await this.newPasswordField.setValue(newPassword);
      await this.confirmPasswordField.setValue(confirmPassword);
    }
  
    async clickOnSavedButton() {
      await this.btnSave.click();
    }
  
    async validatheThePasswordChangedModal() {
      await this.txtPasswordChanged.waitForDisplayed({ timeout: 30000 });
      return await this.txtPasswordChanged.getText();
    }
  
    async clickOnOkThanksButton() {
      await this.btnOkThanks.click();
    }
  
    async clickOnPersonalDetailsOption() {
      await this.personalDetailsOption.click();
    }
  
    async clearInputField() {
      await this.phoneNumberField.waitForDisplayed({ timeout: 30000 });
      await this.phoneNumberField.click(); 
      await this.phoneNumberField.setValue(''); 
  }
  
    async fillInThePhoneNumberField(phoneNumber) {
      await this.phoneNumberField.setValue(phoneNumber);
    }
  
  
    async validateThePhoneNumberWasChanged() {
      await this.phoneNumberField.waitForDisplayed({ timeout: 30000 });
      return await this.phoneNumberField.getText();
    }
  
    async clickOnSignOut() {
      await this.clickOnSignOut.waitForDisplayed({ timeout: 30000 });
      await this.clickOnSignOut.click();
    }
  }
  
  module.exports = new ProfileScreen();
  
  