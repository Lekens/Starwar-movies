import axios from 'axios';
const config = {};
export const api = {
  get: async (path) => {
    try {
      const response =  await axios.get(path, config);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  post: async (path, data) => {
    try {
      const response = await axios.post(path, data, config);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  put: async (path, data) => {
    try {
      const response = await axios.put(path, data, config);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  patch: async (path, data) => {
    try {
      const response = await axios.patch(path, data, config);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  delete: async (path) => {
    try {
      const response = await axios.delete(path, config);
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
