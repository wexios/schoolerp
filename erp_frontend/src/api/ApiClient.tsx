import axios from "axios";

const SchoolErpClient = axios.create({
  baseURL: "http://localhost:8080/api" // Assuming your server is running on localhost:8080
});

SchoolErpClient.interceptors.request.use((config) => {
  // Add any request headers you need, such as authorization
  return config;
});

SchoolErpClient.interceptors.response.use((response) => {
  // Add any response handling logic here
  return response;
});

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await SchoolErpClient.post('/user/auth/login', { username, password });
    return response.data;
  } catch (error:any) {
    throw new Error(error.response.data.error);
  }
};

export default SchoolErpClient;
