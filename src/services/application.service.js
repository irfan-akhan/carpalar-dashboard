import axiosInstance from '../utils/axios';

export async function getAllApplications() {
  try {
    const { data } = await axiosInstance.get('/api/applications');
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function getSingleApplication(id) {
  try {
    const { data } = await axiosInstance.get('/api/applications/' + id);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function updateApplication(id, payload) {
  try {
    const { data } = await axiosInstance.patch(
      '/api/applications/' + id,
      payload
    );
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}
