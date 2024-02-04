import Request from "../helpers/RequestHelper";

const fetchData = async () => {
  const res = await Request("post", "/");
  console.log(res);
  return res;
};

const createCompany = async (data) => {
  const res = await Request("post", "/admin/menu/addCompany/", data);
  return res;
};

const updateCompany = async (row) => {
  const res = await Request(
    "post",
    "/admin/menu/updateCompany/" + row.id + "/",
    {
      new_donation: row.donatedHair,
    }
  );
  return res;
};
const deleteCompany = async (id) => {
  const res = await Request("delete", "/admin/menu/deleteCompany/" + id + "/");
  return res;
};

const getSearchedTable = async (props) => {
  const res = await Request("post", "/admin/menu/search/", props);
  console.log(res);
  return res;
};

const companyService = {
  fetchData,
  createCompany,
  updateCompany,
  deleteCompany,
  getSearchedTable,
};

export default companyService;
