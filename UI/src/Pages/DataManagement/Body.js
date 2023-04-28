import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ArticleList from '../../Components/ArticleList/ArticleList';
import ImageList from '../../Components/ImageList/ImageList';
import UserList from '../../Components/UserList/UserList';
import { apiDataGet, apiDataCreate } from '../../axios/api';

export default function Body() {
    const [value, setValue] = useState('image');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function createData (credentials)  {
        return apiDataCreate(credentials)
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

    async function getData (credentials)  {
        return apiDataGet(credentials)
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

    const createMyData = async () => {
        const response = await createData();
        if (response.success) {
            console.log("success")
        }else{
            console.log('error')
        }
    }

    const fetchData = async () => {
        const response = await getData();
        if (response.success) {
            return {users: response.users, articles: response.articles, images: response.images}
        }else{
            console.log('error')
        }
    }

    const exportData = async () => {
        const data = await fetchData()
        // console.log(users)
        // console.log(articles)
        // console.log(images)
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";
    
        link.click();
      };
    return (
        <Box sx={{ width: '63.2%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="tabs"
            >
                <Tab value="image" label="Images" />
                <Tab value="article" label="Articles" />
                <Tab value="user" label="Users" />
            </Tabs>
            {
            value === "image" ? 
                <ImageList/>
            :
            value === "article"? 
                <ArticleList/>
            :
                <UserList/>
            }
            <button type="button" onClick={exportData}>
                Export Data
            </button>
            <button type="button" onClick={createMyData}>
                Create Data
            </button>
        </Box>
    )
}