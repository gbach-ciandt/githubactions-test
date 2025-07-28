const sleep = require("../../../../../utils/sleep")
class OrderMenuScreen {
  // Locators
  get newOrderButton() {
    return $('id=zena.dominos.qa:id/fragment_new_home_button_new_order');
  }

  get menuButton(){
    return $('id=zena.dominos.qa:id/cartFoodMenuButton');
  }

  get selectPizzasButton(){
    return $('android=new UiSelector().resourceId("zena.dominos.qa:id/menu_new_item_iv").instance(1)');
  }

  get selectRandomPizzaButton() {
    return $('android=new UiSelector().resourceId("zena.dominos.qa:id/view_holder_product_set_iv_product_image").instance(1)');
  }

  get acceptPizzaButton(){
    return $('id=zena.dominos.qa:id/select_product');
  }

  get selectPizzaFlavorButton(){
    return $('android=new UiSelector().resourceId("zena.dominos.qa:id/product_type_container").instance(0)');
  }
  
  get increasePizzaQuantity() {
    return $('id=zena.dominos.qa:id/product_builder_ib_increase');
  }

  get addToOrderButton(){
    return $('id=zena.dominos.qa:id/product_builder_button_add_to_order');
  }

  get goBackToMenuButton(){
    return $('android=new UiSelector().className("android.widget.ImageView").instance(0)');
  }
  
  get editItemButton(){
    return $('id=zena.dominos.qa:id/product_line_view_tv_edit');
  }

  get itemQuantityButton() {
    return $('android=new UiSelector().resourceId("android:id/text1")');
  }
  
  get totalPriceInMenu(){
    return $('id=zena.dominos.qa:id/grand_total_amount');
  }

  get payButton() {
    return $('android=new UiSelector().resourceId("zena.dominos.qa:id/checkout_button_section_checkout").instance(1)');
  }

  get ignorePromosButton(){
    return $('android=new UiSelector().resourceId("zena.dominos.qa:id/go_to_checkout_button")');
  }
  
  get totalPriceInCheckout(){
    return $('id=zena.dominos.qa:id/order_summary_tv_total_value');
  }

  get locationDetails(){
    return $('id=zena.dominos.qa:id/cart_cv_address_view');
  }

  get editAddressDetails(){
    return $('id=zena.dominos.qa:id/edit_address_tv');
  }

  get continueRequest(){
    return $('id=zena.dominos.qa:id/orderTimingOptionsButton');
  }
  
  get buyTheProducts() {
    return $('id=zena.dominos.qa:id/checkout_button_place_order');
  }

  get selectMoneyAsPaymentMethod() {
    return $('id=zena.dominos.qa:id/payment_method_cash');
  }

  get majorStatus(){
    return $('android=new UiSelector().resourceId("majorStatus")');
  }

  get orderDonePage(){
     return $('android=new UiSelector().resourceId("zena.dominos.qa:id/storeDetail")');
  }
  // Methods
  async clickOnCreateNewOrder() {
    await this.newOrderButton.waitForExist({ timeout: 30000 }); 
    await this.newOrderButton.click();
  }

  async clickOnMenuButton() {
    await this.menuButton.waitForExist({ timeout: 30000 }); 
    await this.menuButton.click();
  }

  async clickOnSelectPizzas() {
    await this.selectPizzasButton.waitForExist({ timeout: 30000 }); 
    await this.selectPizzasButton.click();
  }

  async clickOnSelectRandomPizza() {
    await this.selectRandomPizzaButton.waitForExist({ timeout: 30000 }); 
    await this.selectRandomPizzaButton.click();
  }

  async clickOnAddPizzaButton(){
    await this.acceptPizzaButton.waitForExist({ timeout: 30000 }); 
    await this.acceptPizzaButton.click();
  }

  async clickOnSelectPizzaFlavor(){
    await this.selectPizzaFlavorButton.waitForExist({ timeout: 30000 }); 
    await this.selectPizzaFlavorButton.click();
  }

  async clickOnIncreasePizzaQuantity(){
    await this.increasePizzaQuantity.waitForExist({ timeout: 30000 }); 
    await this.increasePizzaQuantity.click();
  }

  async clickOnAddToOrderButton(){
    await this.addToOrderButton.waitForExist({ timeout: 30000 }); 
    await this.addToOrderButton.click();
  }

  async clickOnGoBackToMenuButton(){
    await this.goBackToMenuButton.waitForExist({ timeout: 30000 }); 
    await this.goBackToMenuButton.click();
  }

  async clickOnEditPizzaButton() {
    await this.editItemButton.waitForExist({ timeout: 30000 }); 
    await this.editItemButton.click();
  }

  async fetchItemQuantity(){
    await this.itemQuantityButton.waitForExist({ timeout: 30000 }); 
    return await this.itemQuantityButton.getText()
  }

  async fetchPriceMenu() {
    await this.totalPriceInMenu.waitForExist({ timeout: 30000 }); 
    return await this.totalPriceInMenu.getText()
  }

  async clickOnBuyButton(){
    await this.payButton.waitForExist({ timeout: 30000 }); 
    await this.payButton.click();
  }

  async clickOnIgnorePromosButton(){
    await this.ignorePromosButton.waitForExist({ timeout: 30000 }); 
    await this.ignorePromosButton.click()
  }

  async fetchPriceCheckout(){
    await this.totalPriceInCheckout.waitForExist({ timeout: 10000 }); 
    return await this.totalPriceInCheckout.getText()
  }

  async clickOnLocationDetails(){
    await this.locationDetails.waitForExist({ timeout: 10000 }); 
    await this.locationDetails.click();
    await this.editAddressDetails.waitForExist({ timeout: 10000 });
    await this.editAddressDetails.click(); 
  }

  async clickOnContinueRequest(){
    await this.continueRequest.waitForExist({ timeout: 20000 }); 
    await this.continueRequest.click();
  }

  async clickOnBuyProductsButton(){
    await this.buyTheProducts.waitForExist({ timeout: 20000 }); 
    await this.buyTheProducts.click(); 
  }

  async selectPaymentMoney(){
    await this.selectMoneyAsPaymentMethod.waitForExist({ timeout: 20000 }); 
    await this.selectMoneyAsPaymentMethod.click();
  }

  async finalizedProduct(){
    return await this.orderDonePage.waitForExist({ timeout: 30000 }).catch(() => false); 
  }

  //isDisplayed().catch(() => false);
}

module.exports = new OrderMenuScreen();