export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  // editUser() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: "PATCH", {
  //     _headers: this._headers
  //   },
  //   body: JSON.stringify({
  //     name: "",

  //   })
  // })
}
