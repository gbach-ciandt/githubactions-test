const loginScreen = require("../../screenObjects/loginScreen/loginScreen");
const spainData = require("../../../../../data/spainCredentials.json");
const firstScreen = require("../../screenObjects/loginScreen/firstScreen");
const profileScreen = require("../../screenObjects/profileScreen/profileScreen");
const {generateRandomPassword, updateCredentialsJSON } = require("../../../../../utils/randomPassword")
const sleep = require("../../../../../utils/sleep")

describe("Profile updates", () => {
  beforeEach(async () => {
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

    const isDeliveryButtonEnabled = await loginScreen.isDeliveryButtonEnabled();
    expect(isDeliveryButtonEnabled).toBe(true);
  });

  it("Change the password", async () => {
    const newPassword = generateRandomPassword(12);

    await profileScreen.clickOnExpandTheMenu();
    await profileScreen.clickOnProfileOption();
    await profileScreen.clickOnChangePassword();

    await profileScreen.fillPasswordChanged(
      spainData.mainCredential.password,
      newPassword,
      newPassword);

    await profileScreen.clickOnSavedButton();

    await profileScreen.validatheThePasswordChangedModal();
    await profileScreen.clickOnOkThanksButton();
    
    // If the OkThanksButton leads the user to homescreen, success! 
    const backToLogin = await loginScreen.isLoginButtonEnabled()
    expect(backToLogin).toBe(true)

    updateCredentialsJSON(newPassword)
    await sleep(100)

    await loginScreen.login(
      spainData.mainCredential.email,
      spainData.mainCredential.password);

    await loginScreen.clickOnLoginButton();
    // If login was successful!, password was changed correctly!
    const success = await loginScreen.loginSuccessful();
    expect(success).toBe(true);
  });
});
