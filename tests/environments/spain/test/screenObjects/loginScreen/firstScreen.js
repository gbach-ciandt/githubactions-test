class FirstScreen {
    // Locators
    get allowTheNotifications() {
      return $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
    }
  
    get acceptCookiesButton() {
      return $('id=zena.dominos.qa:id/btn_accept_cookies');
    }
  
    // Methods
    async clickOnAllowNotifications() {
      await this.allowTheNotifications.waitForExist({ timeout: 30000 }); 
      await this.allowTheNotifications.click();
    }

    async clickOnAcceptTheCookies() {
      await this.acceptCookiesButton.waitForExist({ timeout: 40000 }); 
      await this.acceptCookiesButton.click();
    }
  }
  
  module.exports = new FirstScreen();
  