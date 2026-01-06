export const isUserLoggedIn = () => {
  return !!localStorage.getItem("token");
};


export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("adminToken");
};
