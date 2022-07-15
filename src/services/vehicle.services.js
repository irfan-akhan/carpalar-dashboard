import axiosInstance from '../utils/axios';

export async function addVehicle(input) {
  try {
    const {
      data: { vehicle },
    } = await axiosInstance.post('/api/vehicles', input);
    return vehicle;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function searchVehicles(query) {
  try {
    const {
      data: { vehicles },
    } = await axiosInstance.get('/api/vehicles/search?term=' + query);
    return vehicles;
  } catch (error) {
    console.log('service err catch', error);
    throw new Error(error.message);
  }
}
export async function getVehicle(id) {
  try {
    const {
      data: { vehicle },
    } = await axiosInstance.get('/api/vehicles/' + id);
    return vehicle;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getVehicles() {
  try {
    const {
      data: { vehicles },
    } = await axiosInstance.get('/api/vehicles');
    console.log('all vehicles', vehicles);
    return vehicles;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function updateVehicle(id, input) {
  try {
    const {
      data: { vehicle },
    } = await axiosInstance.patch('/api/vehicles/' + id, input);
    return vehicle;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function deleteVehicle(id) {
  try {
    const {
      data: { vehicle },
    } = await axiosInstance.delete('/api/vehicles/' + id);
    return vehicle;
  } catch (error) {
    throw new Error(error.message);
  }
}
