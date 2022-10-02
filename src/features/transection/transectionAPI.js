import axios from "../../utils/axios";

// export const getTransection = async () => {
//   const res = await axios.get("/transection");
//   return res.data;
// };

export const getTransection = async (type, search) => {
  let queryString = "";
  if (type) {
    queryString += `type=${type}`;
  }
  if (search) {
    queryString += `&q=${search}`;
  }

  const res = await axios.get(`/transection/?${queryString}`);
  return res.data;
};

export const createTransection = async (data) => {
  const res = await axios.post("/transection", data);
  return res.data;
};

export const updateTransection = async (id, data) => {
  const res = await axios.put(`/transection/${id}`, data);
  return res.data;
};

export const deleteTransection = async (id) => {
  const res = await axios.delete(`/transection/${id}`);
  return res.data;
};
