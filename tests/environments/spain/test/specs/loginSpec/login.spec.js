const loginScreen = require("../../screenObjects/loginScreen/loginScreen");
const spainData = require("../../../../../data/spainCredentials.json");
const firstScreen = require("../../screenObjects/loginScreen/firstScreen");

describe("Validate the login process", () => {
  it("Login with a valid user", async () => {
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
});
