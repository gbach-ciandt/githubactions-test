const sleep = require("../../../../../utils/sleep");

class ProfileAddressScreen {
    get defaultAddress(){
      return "Calle de Formigal, 1, Madrid, Spain"
    }

    get defaultAddressFloor(){
      return "modulo10elevadona7";
    }

    get defaultAddressNickname(){
      return "palindromo"
    }

    get defaultAddressExists() {
      return $('android=new UiSelector().text("palindromo")');
    }

    get savedAdressOption() {
      return $('id=zena.dominos.qa:id/profile_menu_custom_address');
    }

    get addNewAddressButton() {
      return $('id=zena.dominos.qa:id/continueSaveButton');
    }

    get dontGetLocation() {
      return $('id=android:id/button2');
    }

    get locationSpace() {
      return $('id=zena.dominos.qa:id/addressTv');
    }

    get insertAddressButton() {
      return $('id=zena.dominos.qa:id/closeButton');
    }

    get insertTextForAddressButton() {
      return $('id=zena.dominos.qa:id/places_autocomplete_search_input');
    }

    get textForAddressPlace() {
      return $('id=zena.dominos.qa:id/places_autocomplete_search_bar');
    }

    get confirmAddress() {
      return $('id=zena.dominos.qa:id/places_autocomplete_prediction_primary_text');
    }

    get continueAddressButton() {
      return $('id=zena.dominos.qa:id/mainButton');
    }

    // problema aqui!
    get continuefillOutAddressButton() {
      return $('id=zena.dominos.qa:id/continueSaveButton');
    }

    get addressToBeDeleted() {
      return $('android=new UiSelector().text("Calle de Formigal, 1")');
    }

    get addressNickname(){
      return $('android=new UiSelector().className("android.widget.EditText").instance(6)');
    }

    get editAddressButton() {
      return $('android=new UiSelector().text("palindromo")');
    }

    get editAddressFloor() {
      return $('android=new UiSelector().className("android.widget.EditText").instance(4)');
    }

    get saveEditedAddress() {
      return $('android=new UiSelector().text("Guardar")');
    }

    get deleteAddress() {
      return $('android=new UiSelector().text(" ELIMINAR DIRECCIÓN ")');
    }

    get confirmDeleteAddress() {
      return $('id=zena.dominos.qa:id/delete_popup_et_entry');
    }

    get confirmDeleteAddressText() {
      return "ELIMINAR";
    }

    get confirmDeleteAddressButton() {
      return $('id=zena.dominos.qa:id/delete_popup_button_delete');
    }

    async waitForLocationResolved() {
      let isVisible = await this.dontGetLocation.isDisplayed().catch(() => false);
      while(!isVisible){
          isVisible = await this.dontGetLocation.isDisplayed().catch(() => false);
      }
      await this.clickOnDontGetLocation()
    }

    async waitForFinishNewLocation() {
      let isVisible = await this.continuefillOutAddressButton.isDisplayed().catch(() => false);
      while(!isVisible){
        isVisible = await this.continuefillOutAddressButton.isDisplayed().catch(() => false);
      }
      await this.clickOnContinuefillOutAddressButton()
    }

    async waitForAddressAPIResolved() {
      let isVisible = await this.locationSpace.isDisplayed().catch(() => false);
      while(!isVisible){
        isVisible = await this.locationSpace.isDisplayed().catch(() => false);
      }
    
      let element = await this.locationSpace
      const regex = /\bFormigal\b/; 
      let text = await element.getText()
      while(!regex.test(text)){
        text = await element.getText(text)
      }
      await sleep(500)
    }

    async clickOnSavedAddresses() {
      await this.savedAdressOption.waitForDisplayed({ timeout: 30000 });
      await this.savedAdressOption.click();
    }

    async clickOnAddNewAddress() {
      await this.addNewAddressButton.waitForDisplayed({ timeout: 30000 });
      await this.addNewAddressButton.click();
    }

    async clickOnDontGetLocation() {
      await this.dontGetLocation.waitForDisplayed({ timeout: 30000 });
      await this.dontGetLocation.click();
    }

    async clickOninsertAddressButton() {
      await this.insertAddressButton.waitForDisplayed({ timeout: 30000 });
      await this.insertAddressButton.click();
    }

    async insertTextForAddressPlace() {
      await this.insertTextForAddressButton.waitForDisplayed({ timeout: 30000 });
      await this.insertTextForAddressButton.click()
      await this.textForAddressPlace.waitForDisplayed({ timeout: 30000 });
      await this.textForAddressPlace.setValue(this.defaultAddress);
      await sleep(5000);
    }

    async clickOnConfirmAddress() {
      await this.confirmAddress.waitForDisplayed({ timeout: 30000 });
      await this.confirmAddress.click();
    }

    async clickOnContinueAddressButton() {
      await this.waitForAddressAPIResolved()
      await this.continueAddressButton.waitForDisplayed({ timeout: 30000 });
      await this.continueAddressButton.click();
    }

    async clickOnContinuefillOutAddressButton() {
      await this.addressNickname.waitForDisplayed({ timeout: 30000 });
      await this.addressNickname.setValue(this.defaultAddressNickname);
      await this.continuefillOutAddressButton.waitForDisplayed({ timeout: 30000 });
      await this.continuefillOutAddressButton.click();
    }

    async clickOnEditAddress() {
      await this.editAddressButton.waitForDisplayed({ timeout: 30000 });
      await this.editAddressButton.click();
    }

    async clickOnChangeAddressFloor(){
      await this.editAddressFloor.waitForDisplayed({ timeout: 30000 });
      await this.editAddressFloor.setValue(this.defaultAddressFloor);
    }

    async validateEditedAddressFloor() {
      await this.clickOnEditAddress();
      return await this.editAddressFloor.getText();
    }

    async clickOnSaveAddress() {
      await this.saveEditedAddress.waitForDisplayed({ timeout: 30000 });
      await this.saveEditedAddress.click();
    }

    async clickOnDeleteAddress() {
      await this.deleteAddress.waitForDisplayed({ timeout: 30000 });
      await this.deleteAddress.click()
      await this.confirmDeleteAddress.waitForDisplayed({ timeout: 30000 });
      await this.confirmDeleteAddress.setValue(this.confirmDeleteAddressText);
      await this.confirmDeleteAddressButton.click()
      await sleep(2000);
    }   

    async validateThatAddressExists() {
      return await this.defaultAddressExists.waitForExist({ timeout: 40000 });
    }

    async validateThatAddressWasDeleted() {
      return await this.defaultAddressExists.waitForExist({ timeout: 5000 }).catch(() => false);
    }
}
  
  module.exports = new ProfileAddressScreen();