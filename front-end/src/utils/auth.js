export const isUserLoggedIn = () => {
  return !!localStorage.getItem("token");
};