import  React, { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Head from '../Head';
import { apiArticleMyShow, apiArticleMySearch } from '../../../axios/api';
import dayjs from 'dayjs';
import noresult from '../../../assets/noresult.webp'
import ClearIcon from '@mui/icons-material/Clear';
import useComponentVisible from "../../../hook/useComponentVisible";

import './css/searchpage.css'
import IconButton from '@mui/material/IconButton';


export default function SearchPage  ()  {
    const [notfind, setNotfind] = useState(false)
    const [searchStr, setSearchStr] = useState('');
    const [articles, setArticles] = useState([])
    const {ref, isComponentVisible} = useComponentVisible(false)
    const searchRef = useRef(null)
    async function showArticles (credentials)  {
        return apiArticleMyShow(credentials)
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
        return apiArticleMySearch(credentials)
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
            const response = await showArticles();
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
    const handleSearch = async (e) => {
        e.preventDefault()
        if (searchStr){
            const response = await searchArticles({searchStr: searchStr})
            if (response.success) {
                setArticles(response.articlesInform)
                setNotfind(false)
            }else{
                setNotfind(true)
            }
        }
    }
    const handleClick = () => {
        searchRef.current.focus()
    }
    const handleClearClick = () => {
        setSearchStr('')
    }
    return (
        <div className="page">
            <Head />
        <div className='SearchPage'>
            <Box sx={{display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
            <div className='Searchbar'>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    height: 50,
                    },
                }}
                id='box'
                ref={ref}
            >
                    <Paper elevation={1} id='searchPaper' onClick={handleClick}>
                        <form onSubmit={handleSearch} id = 'searchForm'>
                            <input id='searchinput' 
                                   placeholder='Search'
                                   value={searchStr}
                                   onChange={e=>setSearchStr(e.target.value)} 
                                   ref={searchRef}
                                   />
                            {isComponentVisible && searchStr ?
                                <IconButton
                                    onClick={handleClearClick}
                                    type="button"
                                >
                                    <ClearIcon fontSize="large"/>
                                </IconButton>
                            :
                                <IconButton
                                    type="submit"
                                >
                                    <SearchIcon fontSize="large"/>
                                </IconButton>
                            }
                        </form>
                    </Paper>
            </Box>
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
                                        primary= { <NavLink to={`/${article.category}/id=${article.id}`} 
                                                            className='listitem'
                                                            state={{id:article.id, readOnly:true}}>
                                                    {article.title}</NavLink> }
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {'Author: '+ (article.author === article.authorName ?article.author:article.author+"("+article.authorName+")")}
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