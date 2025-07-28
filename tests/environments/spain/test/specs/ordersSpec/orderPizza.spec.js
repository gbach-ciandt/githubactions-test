const loginScreen = require("../../screenObjects/loginScreen/loginScreen");
const spainData = require("../../../../../data/spainCredentials.json");
const firstScreen = require("../../screenObjects/loginScreen/firstScreen");
const orderMenuScreen = require("../../screenObjects/orderScreen/orderMenuScreen")
const profileAddressScreen = require("../../screenObjects/profileScreen/addressProfileScreen");
const sleep = require("../../../../../utils/sleep");
const { browser, expect } = require("@wdio/globals");

describe("Order a pizza!", () => {
  before(async () => {
    await firstScreen.clickOnAllowNotifications();
    await firstScreen.clickOnAcceptTheCookies();

    await loginScreen.clickOnLogin();
    await loginScreen.login(
      spainData.mainCredential.email,
      spainData.mainCredential.password);

    const isLoginButtonEnabled = await loginScreen.isLoginButtonEnabled();
    expect(isLoginButtonEnabled).toBe(true);

    await loginScreen.clickOnLoginButton();
    await loginScreen.verifyTheDeliveryTittleIsDisplayed();
  });
  
  it("it should add a pizza to the cart and sucessfully edit it", async () => {
    await orderMenuScreen.clickOnCreateNewOrder();
    await orderMenuScreen.clickOnMenuButton();
    await orderMenuScreen.clickOnSelectPizzas();
    await orderMenuScreen.clickOnSelectRandomPizza();
    await orderMenuScreen.clickOnAddPizzaButton();
    await orderMenuScreen.clickOnSelectPizzaFlavor();
    await orderMenuScreen.clickOnSelectPizzaFlavor();
    await orderMenuScreen.clickOnIncreasePizzaQuantity();
    await orderMenuScreen.clickOnAddToOrderButton();
    await orderMenuScreen.clickOnGoBackToMenuButton();
    await orderMenuScreen.clickOnEditPizzaButton();
    await orderMenuScreen.clickOnIncreasePizzaQuantity();
    await orderMenuScreen.clickOnAddToOrderButton();
    const qtd = await orderMenuScreen.fetchItemQuantity();
    expect(qtd).toBe("3")
  });

  it("Add a safe address for checkout", async () => {
    await orderMenuScreen.clickOnLocationDetails()
    const safeAddress = await profileAddressScreen.validateThatAddressWasDeleted();
    if(!safeAddress){
      await profileAddressScreen.clickOnAddNewAddress();  
      await profileAddressScreen.waitForLocationResolved();
      await profileAddressScreen.clickOninsertAddressButton();
      await profileAddressScreen.insertTextForAddressPlace();
      await profileAddressScreen.clickOnConfirmAddress();
      await profileAddressScreen.clickOnContinueAddressButton();
      await profileAddressScreen.clickOnContinuefillOutAddressButton();
      await orderMenuScreen.clickOnContinueRequest();
    }
    await profileAddressScreen.clickOnEditAddress();
    await orderMenuScreen.clickOnContinueRequest();
  });
  
  it("It should validate the price in checkout", async () => {
    const priceMenu = await orderMenuScreen.fetchPriceMenu();
    await orderMenuScreen.clickOnBuyButton();
    await orderMenuScreen.clickOnIgnorePromosButton();
    await sleep(3000)
    await browser.actions([
        browser.action('pointer')
            .move(1000, 1000)
            .down()
            .move(250, 250)
            .up(),
    ])
    const priceCheckout =  await orderMenuScreen.fetchPriceCheckout();
    expect(priceMenu).toBe(priceCheckout)
  });

  it("It should order a pizza", async() => {
    await orderMenuScreen.selectPaymentMoney()
    await orderMenuScreen.clickOnBuyProductsButton()
    const finishPage = await orderMenuScreen.finalizedProduct();
    expect(finishPage).toBe(true)
  })  
});