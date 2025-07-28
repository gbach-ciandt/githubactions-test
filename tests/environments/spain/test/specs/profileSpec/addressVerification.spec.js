const loginScreen = require("../../screenObjects/loginScreen/loginScreen");
const spainData = require("../../../../../data/spainCredentials.json");
const firstScreen = require("../../screenObjects/loginScreen/firstScreen");
const profileScreen = require("../../screenObjects/profileScreen/profileScreen");
const profileAddressScreen = require("../../screenObjects/profileScreen/addressProfileScreen");

describe("Profile changes -> address!", () => {
  before(async () => {
    await firstScreen.clickOnAllowNotifications();
    //await firstScreen.clickOnAcceptTheCookies();

    await loginScreen.clickOnLogin();
    await loginScreen.login(
      spainData.mainCredential.email,
      spainData.mainCredential.password);

    const isLoginButtonEnabled = await loginScreen.isLoginButtonEnabled();
    expect(isLoginButtonEnabled).toBe(true);

    await loginScreen.clickOnLoginButton();
    await loginScreen.verifyTheDeliveryTittleIsDisplayed();
  });

  it("Add a new address", async () => {
    await profileScreen.clickOnExpandTheMenu();
    await profileScreen.clickOnProfileOption();
    await profileAddressScreen.clickOnSavedAddresses();
    await profileAddressScreen.clickOnAddNewAddress();  
    await profileAddressScreen.waitForLocationResolved();
    await profileAddressScreen.clickOninsertAddressButton();
    await profileAddressScreen.insertTextForAddressPlace();
    await profileAddressScreen.clickOnConfirmAddress();
    await profileAddressScreen.clickOnContinueAddressButton();
    await profileAddressScreen.clickOnContinuefillOutAddressButton();
    const newAddressInserted = await profileAddressScreen.validateThatAddressExists();
    expect(newAddressInserted).toBe(true);
  });
  
  it("Edit the new address", async () => {
    await profileAddressScreen.clickOnEditAddress();
    await profileAddressScreen.clickOnChangeAddressFloor()
    await profileAddressScreen.clickOnSaveAddress();
    const address_floor = await profileAddressScreen.validateEditedAddressFloor();
    await expect(address_floor).toBe(profileAddressScreen.defaultAddressFloor);
  })
  
  it("Delete the new address", async () => {
    await profileAddressScreen.clickOnDeleteAddress();
    const newAddressExists = await profileAddressScreen.validateThatAddressWasDeleted();
    expect(newAddressExists).toBe(false);
  })
  
});

