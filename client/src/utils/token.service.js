/** @format */

class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user?.accessToken;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    user.accessToken = token;
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }

  setUser(user) {
    console.log(JSON.stringify(user));
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    sessionStorage.removeItem("user");
  }
}

export default new TokenService();
