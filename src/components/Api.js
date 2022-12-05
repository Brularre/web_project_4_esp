export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  renderInitialCards({ renderer }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status);
      })
      .then((items) => {
        renderer(items);
      })
      .catch((err) => {
        console.log(`Error ${err}. Inténtalo de nuevo más tarde`);
      });
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  editUser(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
      headers: this._headers,
    });
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
      headers: this._headers,
    });
  }

  postContent(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
      headers: this._headers,
    });
  }
}
