import Cookies from "universal-cookie";

const cookies = new Cookies();

const AuthService = {
  isAuthenticated() {
    return cookies.get("auth") === "true";
  },

  signIn() {
    cookies.set("auth", true, { path: "/" });
  },

  signOut() {
    cookies.set("auth", false, { path: "/" });
  }
};

export default AuthService;
