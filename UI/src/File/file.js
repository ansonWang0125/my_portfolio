import { apiUploadImage, apiGetImage } from '../../axios/api';

const uploadFiles = (file, onUploadProgress) => {
    let formData = new FormData();
  
    formData.append("file", file);
  
    return apiUploadImage(formData)
         .then(response=> {
            if (response.status === 201) {
                return response.data
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
  };
  
  const getFiles = () => {
    return apiGetImage()
         .then(response=> {
            if (response.status === 201) {
                return response.data
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
  };
  
export  {
    uploadFiles,
    getFiles,
};