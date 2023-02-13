class LoginPage {
  elements = {
    usernameInput: () => cy.get("input[name='username']"),
    passwordInput: () => cy.get("input[name='password']"),
    loginBtn: () => cy.get("button[type='submit']"),
    message: () => cy.get("p[data-v-0b423d90]"),
    profileName: () => cy.get(".oxd-userdropdown-name"),
  };

  fillInputs(username, password) {
    this.elements.usernameInput().type(username);
    this.elements.passwordInput().type(password);
  }

  submitLogin() {
    this.elements.loginBtn().click();
  }

  validateProfileName(name) {
    this.elements
      .profileName()
      .invoke("text")
      .then((text) => expect(text).to.eq(name));
  }

  validateMessage(message) {
    this.elements
      .message()
      .invoke("text")
      .then((text) => {
        expect(text).to.eq(message);
      });
  }
}

export default new LoginPage();
