export default class UserInfo {
  constructor({ name, description }) {
    this._username = name;
    this._userDescription = description;
  }

  getUserInfo() {
    const username = this._username.textContent;
    const description = this._userDescription.textContent;
    this._userInfo = { username, description };
    return this._userInfo;
  }

  setUserInfo(newUsername, newDescription) {
    this._username.textContent = newUsername;
    this._userDescription.textContent = newDescription;
  }
}
