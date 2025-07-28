class LoginScreen {
  // Locators
  get btnLogin() {
    return $('id=zena.dominos.qa:id/fragment_new_home_button_sign_in');
  }

  get emailField() {
    return $('id=zena.dominos.qa:id/login_email_entry');
  }

  get passwordField() {
    return $('id=zena.dominos.qa:id/password_field_et_password');
  }

  get loginButton() {
    return $('id=zena.dominos.qa:id/login_sign_in_button');
  }

  get deliveryButtonOption() {
    return $('id=zena.dominos.qa:id/fragment_new_home_button_new_order');
  }

  get loggedInScreen(){
    return $('id=zena.dominos.qa:id/fragment_new_home_vv_background_video');
  }
  
  // Methods
  async clickOnLogin() {
    await this.btnLogin.waitForExist({ timeout: 30000 }); 
    await this.btnLogin.click();
  }

  async login(username, password) {
    await this.emailField.setValue(username);
    await this.passwordField.setValue(password);
  }

  async isLoginButtonEnabled() {
    return await this.loginButton.isEnabled();
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }

  async verifyTheDeliveryTittleIsDisplayed() {
    await this.deliveryButtonOption.waitForExist({ timeout: 40000 });
  }

  async isDeliveryButtonEnabled() {
    return await this.deliveryButtonOption.isEnabled();
  }

  async loginSuccessful(){
    return await this.loggedInScreen.isEnabled();
  }
}

module.exports = new LoginScreen();
