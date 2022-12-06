export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._username = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    const username = this._username.textContent;
    const about = this._about.textContent;
    const avatar = this._avatar.src;
    const user = { username, about, avatar };
    return user;
  }

  setUserInfo(newUsername, newAbout) {
    this._username.textContent = newUsername;
    this._about.textContent = newAbout;
  }

  setUserAvatar(newAvatar) {
    this._avatar.src = newAvatar;
  }
}
