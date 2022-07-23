import axios from 'axios';
import axiosInstance from '../utils/axios';

export async function getSecureS3Url() {
  try {
    const { data } = await axiosInstance.post('/uploadUrl', {
      vehicleName: 'vehicleName',
    });
    console.log('secrureurl resp', data);
    console.log('secrureurl', data.url);
    return data.url;
  } catch (error) {
    console.log('secrure url error', error);
    throw new Error(error);
  }
}
export async function uploadImagesToS3(inputImageFile) {
  try {
    const imageFile = new FormData();
    imageFile.append('imageFile', inputImageFile);
    const url = await getSecureS3Url();
    const { data } = await axios.put(url, {
      Headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: imageFile,
    });
    console.log('data uploadImagesToS3', data);
    const imageUrl = url.split('?')[0];
    console.log('actuall image url', imageUrl);
  } catch (error) {
    console.log('error uploadImagesToS3', error);
  }
}
