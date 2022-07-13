import axiosInstance from '../utils/axios';

export async function login(input) {
  try {
    const { data } = await axiosInstance.post('/signin', input);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}

export async function signUp(input) {
  try {
    const { data } = await axiosInstance.post('/api/users', input);
    console.log('data', data);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function passwordReset(params) {}
