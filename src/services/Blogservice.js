import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const getAllByUser = async () => {
  console.log(token);
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
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then(response => response.data);
};

const del = id => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then(response => response.data);
};

export default { setToken, getAllByUser, create, update, getAll, del };
