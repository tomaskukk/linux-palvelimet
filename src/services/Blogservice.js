import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  console.log(token);
};

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  };

  const request = axios.get("/api/users/blogs", config);
  return request.then(response => response.data);
};

const create = async newObject => {
  console.log("Token from create", token);

  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

export default { setToken, getAll, create, update };
