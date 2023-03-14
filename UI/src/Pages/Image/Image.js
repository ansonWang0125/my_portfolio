import { useState, useEffect } from 'react';
import { apiGetImage } from '../../axios/api';
import { Buffer } from 'buffer';
import { useLocation } from 'react-router-dom';
import useQuery from '../../hook/useQuery';
import './Image.css'

const Image = () => {

    const [srcValue, setSrcValue] = useState()
    const location = useLocation()
    const originalname = (location.state !== null ? location.state.originalname : 'undefined');
    const query = useQuery()
    const id = query.value.id
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
        <div id='image'>
            <img src={srcValue} alt={originalname}/>
            <h5>{originalname}</h5>
        </div>
    )
}

export default Image;