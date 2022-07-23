import axios from "axios";
import axiosInstance from "../utils/axios";

export async function getSecureS3Url() {
    const {data} = await axiosInstance.post('/uploadUrl',{vehicleName:"vehicleName"})
    console.log('secrureurl resp', data)
    console.log('secrureurl', data.url)
    
}
export async function uploadImagesToS3(url) {

    try {
       const {data} = await axios.put(url, {Headers:{"Content-Type":"multipart/form-data"},body:imageFile});
       console.log('data uploadImagesToS3', data)
       const imageUrl = url.split('?')[0]
       console.log('actuall image url', imageUrl)
    } catch (error) {
        console.log('error uploadImagesToS3', error)
    }
}
