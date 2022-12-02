export default class UserInfo {
  constructor({ name, about }) {
    this._username = name;
    this._about = about;
  }

  getUserInfo() {
    const username = this._username.textContent;
    const about = this._about.textContent;
    const user = { username, about };
    return user;
  }

  setUserInfo(newUsername, newAbout) {
    this._username.textContent = newUsername;
    this._about.textContent = newAbout;
  }
}
