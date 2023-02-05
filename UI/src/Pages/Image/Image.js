import { useState, useEffect } from 'react';
import { apiGetImage } from '../../axios/api';
import { Buffer } from 'buffer';

const Image = () => {

    const [srcValue, setSrcValue] = useState()
    const href = window.location.href
    const id = href.substring(href.lastIndexOf('/')+1)
    console.log(id)

    async function getImage (credentials)  {
        return apiGetImage(credentials)
         .then(response=> {
            if (response.status === 201) {
                return response.data
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
    }

    useEffect(()=>{
        const fetchImage = async () => {
            const getResponse = await getImage(id)
            if (getResponse.success) {
                console.log('data = ', getResponse.image)
                let ImageBase64 = Buffer.from(getResponse.image, 'binary').toString('base64')
                setSrcValue("data:image/png;base64,"+ImageBase64)
            } else{
                console.log(getResponse.message)
            }
        }
        fetchImage()
    },[id])

    return (
        <img src={srcValue} alt=""/>
    )
}

export default Image;