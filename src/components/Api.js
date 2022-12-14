export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async renderInitialCards({ renderer }) {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      });
      const cards = res.ok ? await res.json() : Promise.reject(res.status);
      renderer(cards);
    } catch (err) {
      throw new Error(`Error ${err}.`);
    }
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status);
      })
      .catch((err) => {
        throw new Error(`Error ${err}.`);
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
    }).catch((err) => {
      throw new Error(`Error ${err}.`);
    });
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).catch((err) => {
      throw new Error(`Error ${err}.`);
    });
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).catch((err) => {
      throw new Error(`Error ${err}.`);
    });
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
      headers: this._headers,
    }).catch((err) => {
      throw new Error(`Error ${err}.`);
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
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status);
      })
      .catch((err) => {
        throw new Error(`Error ${err}.`);
      });
  }

  deleteContent(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).catch((err) => {
      throw new Error(`Error ${err}.`);
    });
  }
}
