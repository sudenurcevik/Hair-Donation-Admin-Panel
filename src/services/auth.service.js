import Request from "../helpers/RequestHelper";

const login = async (user) => {
  const res = await Request("post", "/admin/login/", user);
  // const res = {
  //   data: { email: "sude", password: "fkgfogf" },
  //   status: 200,
  // };
  return res;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
