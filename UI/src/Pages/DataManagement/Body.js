import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ArticleList from '../../Components/ArticleList/ArticleList';
import ImageList from '../../Components/ImageList/ImageList';
import UserList from '../../Components/UserList/UserList';

export default function Body() {
    const [value, setValue] = React.useState('image');

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
        </Box>
    )
}