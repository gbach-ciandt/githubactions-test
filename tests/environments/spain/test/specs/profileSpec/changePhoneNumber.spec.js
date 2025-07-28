const loginScreen = require("../../screenObjects/loginScreen/loginScreen");
const spainData = require("../../../../../data/spainCredentials.json");
const firstScreen = require("../../screenObjects/loginScreen/firstScreen");
const profileScreen = require("../../screenObjects/profileScreen/profileScreen");

describe("Profile updates", () => {
  beforeEach(async () => {
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

    const isDeliveryButtonEnabled = await loginScreen.isDeliveryButtonEnabled();
    expect(isDeliveryButtonEnabled).toBe(true);
  });

  it("Change the phone number", async () => {
    await profileScreen.clickOnExpandTheMenu();
    await profileScreen.clickOnProfileOption();
    await profileScreen.clickOnPersonalDetailsOption();
    await profileScreen.clearInputField();
    await profileScreen.fillInThePhoneNumberField('999999999')
    await profileScreen.clickOnSavedButton();
    await profileScreen.clickOnPersonalDetailsOption();

    const txtPhoneNumberChanged = await profileScreen.validateThePhoneNumberWasChanged();
    await expect(txtPhoneNumberChanged).toBe('999999999');
  });
});
