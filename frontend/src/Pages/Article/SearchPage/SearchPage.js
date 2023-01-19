import  React, { useState, useEffect} from "react";
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SearchBar from "material-ui-search-bar";
import Box from '@mui/material/Box';
import Head from '../Head';
import { apiArticleShow, apiArticleSearch } from '../../../axios/api';
import dayjs from 'dayjs';
import noresult from '../../../assets/noresult.webp'

import './css/searchpage.css'


export default function SearchPage  ()  {
    const category = 'Website'
    const [notfind, setNotfind] = useState(false)
    const [searchStr, setSearchStr] = useState('');
    const [articles, setArticles] = useState([])
    async function showArticles (credentials)  {
        return apiArticleShow(credentials)
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
    async function searchArticles (credentials)  {
        return apiArticleSearch(credentials)
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
    useEffect( ()=>{
        const fetchData = async () => {
            const response = await showArticles({category});
            if (response.success) {
                setArticles(response.articlesInform)
                setNotfind(false)
            }else{
                setNotfind(true)
            }
        }
        fetchData()
        setSearchStr('')
    },[])
    const handleSearch = async () => {
        console.log(searchStr)
        if (searchStr){
            const response = await searchArticles({category:category,searchStr: searchStr})
            if (response.success) {
                setArticles(response.articlesInform)
                setNotfind(false)
            }else{
                setNotfind(true)
            }
        }
        // if (searchStr) props.history.push(`/list/${searchStr.split(' ').join(':')}`);
        // else props.history.push('/');
    }
    return (
        <div className="page">
            <Head />
        <div className='SearchPage'>
            <Box className='Box'>
            <div className='Searchbar'>
                <SearchBar
                    onChange={(newValue) => { setSearchStr(newValue) }}
                    onRequestSearch={() => handleSearch()}
                    value={searchStr}
                    style={{
                        width: '100%'
                    }}
                />
            </div>
            <div className="article-list">
            {notfind ?
                (<div className='emptyList-wrap'>
                    <img src={noresult} alt='empty'/>
                    <div id="noResult">No Result ! </div>
                </div>)
                :
                (<List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                    {articles.map(article => {
                        return(
                            <div key={article.id}>
                                <ListItem alignItems="flex-start" >
                                    <ListItemText
                                        primary= { <NavLink to={`/Website_Articles/${article.title}`} 
                                                            className='listitem'
                                                            state={{id:article.id}}>
                                                    {article.title}</NavLink> }
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {'Author: '+ article.author}
                                            </Typography>
                                            {"-------Edit at "+dayjs(article.time).format('YYYY/MM/DD')}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}
                </List>)}
            </div>
            </Box>
        </div>
        </div>
    )
}