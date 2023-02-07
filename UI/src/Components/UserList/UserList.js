import React, {useState, useEffect, useMemo, useCallback} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import noresult from '../../assets/noresult.webp'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { apiDataShow, apiDataDelete } from '../../axios/api';
import { toast } from 'react-toastify';
import { DataGrid,  GridActionsCellItem } from '@mui/x-data-grid';

export default function UserList () {
    const [users, setUsers] = useState([])
    const [notfind, setNotfind] = useState(false)
    const [id, setID] = useState();
    const [userName, setUserName] = useState('')
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
        const fetchData = async () => {
            const response = await showData({type:'Users'});
            if (response.success) {
                setUsers(response.inform)
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

    const handleToggle = useCallback((value) => () => {
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
      },[checked]);

    const handleSetID = useCallback((ID) => {
        console.log(ID)
        setID(ID)
    },[])
    const handleSetUserName = useCallback((name) => { 
        console.log(name)
        setUserName(name)
    },[])

    const handleClickDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDelete = async () => {
        console.log('checked', checked)
        const response = await deleteData({type:'Users',deleteList:checked})
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
        console.log('ID',ID)
        const deleteList = [ID]
        const response = await deleteData({type:'Users',deleteList:deleteList})
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
        const arr = users.map(user =>{return (user.id)})
        setChecked(arr)
        setSelectAll(true)
    }
    const handleCancel = () => {
        setChecked([])
        setSelectAll(false)
    }

    const columns = useMemo(
        () => [
        //`SELECT "id", "userName", "email", "googleName", "role", "verified", "authorName" FROM "Users"; `
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'userName', headerName: 'User Name', width: 150},
        {field: 'email', headerName: 'Email', width: 250},
        {field: 'googleName', headerName: 'Google Name', width: 150},
        {field: 'role', headerName: 'Role', width: 50},
        {field: 'verified', headerName: 'Verified', width: 100},
        {field: 'authorName', headerName: 'Author Name', width: 150},
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                icon={<Checkbox
                    edge="start"
                    checked={checked.indexOf(params.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                />}
                label="Check"
                onClick={handleToggle(params.id)}
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete User"
                onClick={()=>{handleSetID(params.id);handleSetUserName(params.row.userName);;setUseButtonIcon(true);handleClickDeleteOpen()}}
                showInMenu
              />,
            ],
          },
    ],
    [handleSetID, handleSetUserName, handleToggle, checked]
    )

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
                        (
                            <Box sx={{ height: 400, width: '100%' }}>
                                <DataGrid rows={users} columns={columns} />
                            </Box>
                        )}
                </Paper>
            </div>
            <Dialog
                open={deleteOpen}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {useButtonIcon?"確定要刪除'"+userName+"'?" :"確定要將選取的使用者全刪除?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    刪除後將無法復原。
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteClose}>取消</Button>
                <Button onClick={()=> {useButtonIcon?handleDeleteButton(id):handleDelete()}} autoFocus>
                    確定
                </Button>
                </DialogActions>
            </Dialog>
            </div>
    )
}