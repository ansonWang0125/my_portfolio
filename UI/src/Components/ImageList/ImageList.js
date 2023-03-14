import React, {useState, useEffect} from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import noresult from '../../assets/noresult.webp'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { apiDataShow, apiDataDelete } from '../../axios/api';
import { toast } from 'react-toastify';

export default function ImageList () {
    const [images, setImages] = useState([])
    const [notfind, setNotfind] = useState(false)
    const [id, setID] = useState();
    const [useButtonIcon, setUseButtonIcon] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [dataFetch, setDataFetch] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [checked, setChecked] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [hasSelected, setHasSelected] = useState(false);

    async function showData (credentials)  {
        return apiDataShow(credentials)
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

    async function deleteData  (credentials)  {
        return apiDataDelete(credentials)
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
        console.log('dataFetch')
        const fetchData = async () => {
            const response = await showData({type:'Images'});
            console.log('response: ' + response.success)
            if (response.success) {
                setImages(response.inform)
                setNotfind(false)
            }else{
                setNotfind(true)
            }
        }
        fetchData()
    },[dataFetch])

    useEffect ( () => {
        if (success) {
            toast.success('成功刪除 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
        if (error) {
            toast.info('無刪除權限 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
    }, [success,error, dataFetch])

    useEffect( ()=>{
        setHasSelected(checked.length !== 0)
    }, [checked] )

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

    const handleSetID = (ID) => {
        setID(ID)
    }

    const handleClickDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDelete = async () => {
        const response = await deleteData({type:'Images',deleteList:checked})
        if (response.success){
            setDataFetch(!dataFetch)
            setSuccess(true)
            setError(false)
        } else if( response.message === 'Have Unvalid ID') {
            setSuccess(false)
            setError(false)
        }
        setDeleteOpen(false);
    }
    const handleDeleteButton = async (ID) => {
        const deleteList = [ID]
        const response = await deleteData({type:'Images',deleteList:deleteList})
        if (response.success){
            setDataFetch(!dataFetch)
            setSuccess(true)
            setError(false)
        } else if( response.message === 'Have Unvalid ID') {
            setSuccess(false)
            setError(false)
        }
        setDeleteOpen(false);
    }

    const handleSelectAll = () => {
        const arr = images.map(image =>{return (image.id)})
        setChecked(arr)
        setSelectAll(true)
    }
    const handleCancel = () => {
        setChecked([])
        setSelectAll(false)
    }

    return (
        <div className="articleList">
             <Box sx={{ width:'100%','& button': { m: 1 } }}>
                <div id='button'>
                    { selectAll ?<Button variant="outlined" size='small' onClick={handleCancel}>Cancel Select</Button>:<Button variant="outlined" size='small' onClick={handleSelectAll}>Select All</Button>}
                    <Button variant="outlined" size='small' disabled={!hasSelected} onClick={()=>{setUseButtonIcon(false);handleClickDeleteOpen();}} startIcon={<DeleteIcon />}>Delete</Button>
                </div>
            </Box>
        <div id="article-list">
                <Paper sx={{ width: '100%'}}>
                    {notfind ?
                        (<div className='emptyList-wrap'>
                            <img src={noresult} alt='empty'/>
                            <div id="noResult">No Result ! </div>
                        </div>)
                        :
                        (<List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }}>
                            {images.map((image, i) => {
                                const labelId = `image-list-label-${image.id}`;
                                return(
                                    <div key={image.id}>
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
                                                <ListItemIcon onClick={handleToggle(image.id)} >
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(image.id) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary= { 
                                                                <>
                                                                <NavLink to={`/Image/i?id=${image.id}`} 
                                                                        className='listitem'
                                                                        state={{originalname:image.originalname}}>
                                                                {image.originalname}</NavLink> 
                                                                </>
                                                            }
                                                    secondary={
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {'Upload Aritcle: '+ (image.title)}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        {i + 1 === images.length? <></>:<Divider />}
                                    </div>
                                )
                            })}
                        </List>)}
                </Paper>
            </div>
            <Dialog
                open={deleteOpen}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {useButtonIcon?"確定要刪除'"+images.at(id).originalname+"'?" :"確定要將選取的圖片刪除?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    刪除後將無法復原。
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteClose}>取消</Button>
                <Button onClick={()=> {useButtonIcon?handleDeleteButton(images.at(id).id):handleDelete()}} autoFocus>
                    確定
                </Button>
                </DialogActions>
            </Dialog>
            </div>
    )
}