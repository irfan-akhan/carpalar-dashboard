import axiosInstance from '../utils/axios';

export async function getUsers() {
  try {
    const {
      data: { users },
    } = await axiosInstance.get('/api/users');
    return users;
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function getSingleUser(id) {
  try {
    const {
      data: { user },
    } = await axiosInstance.get('/api/users/' + id);
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function updateUser(id, payload) {
  try {
    const { data } = await axiosInstance.patch('/api/users/' + id, payload);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}
