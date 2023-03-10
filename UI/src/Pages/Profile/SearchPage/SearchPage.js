import  React, { useState, useEffect, useRef, useCallback } from "react";
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
import { apiArticleMyShow, apiArticleMySearch, apiArticleDelete } from '../../../axios/api';
import dayjs from 'dayjs';
import noresult from '../../../assets/noresult.webp'
import ClearIcon from '@mui/icons-material/Clear';
import useComponentVisible from "../../../hook/useComponentVisible";
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './css/searchpage.css'
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';


export default function SearchPage  ()  {
    const [notfind, setNotfind] = useState(false)
    const [searchStr, setSearchStr] = useState('');
    const [articles, setArticles] = useState([])
    const {ref, isComponentVisible} = useComponentVisible(false)
    const searchRef = useRef(null)
    const [checked, setChecked] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [useButtonIcon, setUseButtonIcon] = useState(false);
    const [id, setID] = useState();
    const [hasSelected, setHasSelected] = useState(false);
    const [dataFetch, setDataFetch] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [handleerror, setHandleError] = useState(false)
    const loader = useRef(null);
    const [nomore, setNomore] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [refreshCount, setRefreshCount] = useState(0);
    const [searching, setSearching] = useState('');

    const handleToggle = (value) => () => {
        // console.log('value',value)
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        // console.log('currentIndex:', currentIndex)
        // console.log('newChecked:', newChecked)
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        // console.log('new newChecked', newChecked)
    
        setChecked(newChecked);
      };

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
    async function deleteArticles  (credentials)  {
        return apiArticleDelete(credentials)
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
    useEffect ( () => {
        if (success) {
            toast.success('???????????? ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
        if (error) {
            toast.info('??????????????? ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
    }, [success,error, dataFetch])
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
            const response = await searchArticles({searchStr:searching,dataNum});
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
            setHandleError(true)
            console.log(err)
        }
    },[articles, nomore, searching])

    useEffect ( ()=>{
        if (!nomore && refresh && refreshCount > 1){
            refreshData()
        }
    }, [ refreshData, refresh, nomore, articles.length, refreshCount ])


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
            const response = await showArticles();
            if (response.success) {
                setArticles(response.articlesInform)
                setNotfind(false)
                if (response.articlesInform.length < 15 && !refresh ){
                    setNomore(true)
                    setLoading(false)
                }
            }else if (!refresh){
                setNotfind(true)
                setNomore(true)
                setLoading(false)
            }
        }
        fetchData()
        setSearchStr('')
    },[refresh])
    const handleSearch = async (e) => {
        e.preventDefault()
        setSearching(searchStr)
        if (searchStr){
            const response = await searchArticles({searchStr: searchStr})
            if (response.success) {
                setArticles(response.articlesInform)
                setNotfind(false)
                if (response.articlesInform.length < 15 ){
                    setNomore(true)
                    setLoading(false)
                }
            }else {
                setNotfind(true)
                setNomore(true)
                setLoading(false)
            }
        }
    }

    useEffect( ()=>{
        setHasSelected(checked.length !== 0)
    }, [checked] )
    const handleClick = () => {
        searchRef.current.focus()
    }
    const handleClearClick = () => {
        setSearchStr('')
    }
    const handleSelectAll = () => {
        const arr = articles.map(article =>{return (article.id)})
        setChecked(arr)
        setSelectAll(true)
    }
    const handleCancel = () => {
        setChecked([])
        setSelectAll(false)
    }

    const handleClickDeleteOpen = () => {
        setDeleteOpen(true);
    };
    

    const handleSetID = (ID) => {
        setID(ID)
    }

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDelete = async () => {
        console.log('checked', checked)
        const response = await deleteArticles({deleteList:checked})
        console.log(response)
        if (response.success){
            setDataFetch(!dataFetch)
            setSuccess(true)
            setError(false)
        } else if( response.message === 'Have Unvalid Article ID') {
            setSuccess(false)
            setError(false)
        }
        setDeleteOpen(false);
    }
    const handleDeleteButton = async (articleID) => {
        console.log('articleID',articleID)
        const deleteList = [articleID]
        const response = await deleteArticles({deleteList:deleteList})
        console.log(response)
        if (response.success){
            setDataFetch(!dataFetch)
            setSuccess(true)
            setError(false)
        } else if( response.message === 'Have Unvalid Article ID') {
            setSuccess(false)
            setError(false)
        }
        setDeleteOpen(false);
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
            <Box sx={{ width:'50%','& button': { m: 1 } }}>
                <div id='button'>
                    { selectAll ?<Button variant="outlined" size='small' onClick={handleCancel}>Cancel Select</Button>:<Button variant="outlined" size='small' onClick={handleSelectAll}>Select All</Button>}
                    <Button variant="outlined" size='small' disabled={!hasSelected} onClick={()=>{setUseButtonIcon(false);handleClickDeleteOpen();}} startIcon={<DeleteIcon />}>Delete</Button>
                </div>
            </Box>
            <div className="article-list">
                <Paper sx={{ width: '100%'}}>
                    {notfind ?
                        (<div className='emptyList-wrap'>
                            <img src={noresult} alt='empty'/>
                            <div id="noResult">No Result ! </div>
                        </div>)
                        :
                        (<List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                            {articles.map((article, i) => {
                                const labelId = `checkbox-list-label-${article.id}`;
                                return(
                                    <div key={article.id}>
                                        <ListItem alignItems="flex-start" 
                                            secondaryAction={
                                                <>
                                                    <IconButton edge="end" aria-label="comments" onClick={()=>{handleSetID(i);setUseButtonIcon(true);handleClickDeleteOpen()}}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                              }
                                              disablePadding
                                        >
                                            <ListItemButton>
                                                <ListItemIcon onClick={handleToggle(article.id)} >
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(article.id) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary= { 
                                                                <>
                                                                <NavLink to={`/${article.category}_Articles/id=${article.id}`} 
                                                                        className='listitem'
                                                                        state={{id:article.id, readOnly:true}}>
                                                                {article.title}</NavLink> 
                                                                <NavLink to={`/${article.category}_Articles/id=${article.id}`} 
                                                                        className='listitem'
                                                                        state={{id:article.id, readOnly:false}}>
                                                                    <IconButton edge="end" aria-label="comments">
                                                                        <EditIcon fontSize='small' />
                                                                    </IconButton>
                                                                </NavLink> 
                                                                </>
                                                            }
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
                                            </ListItemButton>
                                        </ListItem>
                                        {i + 1 === articles.length? <></>:<Divider />}
                                    </div>
                                )
                            })}
                        </List>)}
                </Paper>
            </div>
            </Box>
            <Dialog
                open={deleteOpen}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {useButtonIcon?"???????????????'"+articles.at(id).title+"'?" :"??????????????????????????????????"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ???????????????????????????
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteClose}>??????</Button>
                <Button onClick={()=> {useButtonIcon?handleDeleteButton(articles.at(id).id):handleDelete()}} autoFocus>
                    ??????
                </Button>
                </DialogActions>
            </Dialog>
            {loading && <p>Loading...</p>}
            {handleerror && <p>Error!</p>}
            <div ref={loader} id='sensor'/>
        </div>
        </div>
    )
}