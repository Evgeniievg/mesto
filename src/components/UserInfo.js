class UserInfo {
  constructor({
    nameSelector,
    descriptionSelector,
    avatarSelector,
  }) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userId = "";
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
      userId: this._userId,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }
}

export default UserInfo;
