import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { apiArticleMainShow } from '../../../axios/api';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const Body = () => {

    const [value, setValue] = useState('new');
    const [articles, setArticles] = useState([])
    const [notfind, setNotfind] = useState(false)

    async function showArticles (credentials)  {
        return ( await apiArticleMainShow(credentials)
         .then(response=> {
            if (response.status === 201) {
                return response.data
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .catch((error) => {
            console.log('error: ' + error);
         }) )
    }

    useEffect( ()=>{
        const fetchData = async () => {
            const response = await showArticles({value});
            console.log(response)
            if (response.success) {
                setArticles(response.articlesInform)
                setNotfind(false)
            }else{
                setNotfind(true)
            }
        }
        fetchData()
    },[value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="body">
            <Box sx={{ width: '50%', typography: 'body1', display: 'flex', alignItems:'center'}}>
                <label id='label'>相關文章</label>
                <Tabs
                    sx={{ width: '180', marginLeft:'auto' }}
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="new" label="最新" />
                    <Tab value="hot" label="熱門" />
                </Tabs>
            </Box>
            <div id='content'>
                <Paper sx={{ width: '100%'}}>
                    {notfind ?
                        (<div className='emptyList-wrap'>
                            <div id="noResult">No Result ! </div>
                        </div>)
                        :
                        (<List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                            {articles.map((article, i) => {
                                return(
                                    <div key={article.id}>
                                        <ListItem alignItems="flex-start" >
                                            <ListItemText
                                                primary = { <NavLink to={`/Website_Articles/${article.title}`} 
                                                            className='listitem'
                                                            state={{id:article.id, readOnly:true}}>
                                                    {article.searchTimes}<br/>瀏覽</NavLink> }
                                                id='search-Time'
                                            />
                                            <ListItemText
                                                id='article-data'
                                                primary= { <NavLink to={`/Website_Articles/${article.title}`} 
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
                                                    {"-------Create at "+dayjs(article.createTime).format('YYYY/MM/DD')+", Edit at "+dayjs(article.time).format('YYYY/MM/DD')}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        {i + 1 === articles.length? <></>:<Divider />}
                                    </div>
                                )
                            })}
                        </List>)}
                </Paper>
            </div>
        </div>
    )
}

export default Body