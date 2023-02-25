import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const loader = useRef(null);
    const [nomore, setNomore] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [refreshCount, setRefreshCount] = useState(0);

    async function showArticles (credentials)  {
        return  apiArticleMainShow(credentials)
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

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setRefreshCount((prev)=>prev+1)
            setRefresh(true);
        }
      }, []);
    
    const refreshData = useCallback(async () => {
        try{
            setLoading(true)
            const dataNum = articles.length
            const response = await showArticles({value, dataNum});
            if (articles && !nomore) {
                var addData = response.articlesInform
                if ( response.articlesInform === undefined) {
                    addData = []
                }else if (response.articlesInform.length < 15){
                    setNomore(true)
                }
                const newData = articles.concat(addData)
                setArticles(newData)
                setNotfind(false)
                setLoading(false)
            } else if (nomore) {
                setLoading(false)
            }
            else{
                setNotfind(true)
                setLoading(false)
            }
        } catch (err) {
            setError(true)
            console.log(err)
        }
    },[articles, value, nomore])

    useEffect ( ()=>{
        if (!nomore && refresh && refreshCount > 1){
            refreshData()
        }
    }, [ refreshData, value, refresh, nomore, articles.length, refreshCount ])


    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
          };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, [handleObserver])

    useEffect( ()=>{
        const fetchData = async () => {
            const response = await showArticles({value, dataNum:0});
            if (response.success && !refresh) {
                setArticles(response.articlesInform)
                setNotfind(false)
                if (response.articlesInform.length < 15 ){
                    setNomore(true)
                    setLoading(false)
                }
            }else if ( !refresh ){
                setNotfind(true)
                setNomore(true)
                setLoading(false)
            }
        }
        fetchData()
    },[value, articles, refresh])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setRefresh(false)
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
                                                primary = { <NavLink to={`/${article.category}_Articles/${article.id}`} 
                                                            className='listitem'
                                                            state={{id:article.id, readOnly:true}}>
                                                    {article.searchTimes}<br/>瀏覽</NavLink> }
                                                id='search-Time'
                                            />
                                            <ListItemText
                                                id='article-data'
                                                primary= { <NavLink to={`/${article.category}_Articles/id=${article.id}`} 
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
                {loading && <p>Loading...</p>}
                {error && <p>Error!</p>}
                <div ref={loader} id='sensor'/>
            </div>
        </div>
    )
}

export default Body