import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import { apiUserAccount, apiUserUpdate } from '../../axios/api';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useData from '../../Components/App/useData';
import { toast } from 'react-toastify';
import { UseLoginContext } from '../../Context/LoginCnt';
import { useNavigate } from "react-router-dom"


export default function Body () {

    const [author, setAuthor] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [editAuthor, setEditAuthor] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [oriData, setOriData] = useState();
    const [isChanged, setIsChanged] = useState(false)
    const [valid, setValid] = useState(true);
    const [open, setOpen] = useState(false)
    const [changeEmail, setChangeEmail] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [click, setClick] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [authorExist, setAuthorExist] = useState(false);
    const [success, setSuccess] = useState(false);
    const {setData} = useData();
    const {login, changeLogin} = UseLoginContext();
    const formRef = useRef()
    const [notEmpty, setNotEmpty] = useState(false);
    const navigate = useNavigate()

    useEffect ( () => {
        if (!login && click) {
            toast.success('已登出 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })
            navigate('/')
        }
    }, [login, click, navigate])

    useEffect ( () => {
        if (success) {
            toast.success('儲存成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
        if (emailExist) {
            toast.info('此信箱已用過 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
        if (userExist) {
            toast.info('此使用者名稱已用過 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
        if (authorExist) {
            toast.info('此筆名已用過 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
        if (!emailValid) {
            toast.info('Email格式有誤 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
    }, [success,emailExist, userExist, authorExist, emailValid, click])

    async function userAccount ()  {
        return apiUserAccount()
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

    async function userUpdate (credentials)  {
        return apiUserUpdate(credentials)
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

    useEffect(() => {
        const fetchData = async () => {
            const response = await userAccount()
            if (response.success) {
                setAuthor(response.data.authorName)
                setUser(response.data.userName)
                setEmail(response.data.email)
                setOriData(response.data)
                if (changeEmail) {
                    changeLogin(false)
                }
            }
        } 
        fetchData()
    }, [changeEmail, changeLogin])

    useEffect(() => {
        if ( oriData !== undefined &&oriData.authorName === author && oriData.userName === user && oriData.email === email){
            setIsChanged(false)
        } else { setIsChanged(true) }
        if ( author && user && email ){
            setNotEmpty(true)
        } else { setNotEmpty(false)}
    }, [oriData, author, email, user ])

    const handleAuthorClick = () => {
        setEditAuthor(!editAuthor);
    }

    const handleUserClick = () => {
        setEditUser(!editUser);
    }

    const handleEmailClick = () => {
        setEditEmail(!editEmail);
    }

    const handleBtnClick = () => {
        setClick(!click)
        formRef.current.reportValidity();
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmailValid(re.test(email))
        setValid(author && user && email)
        setEmailExist(false)
        setAuthorExist(false)
        setUserExist(false)
        setChangeEmail(oriData.email !== email)
        if ( author && user && email && re.test(email))
            setOpen(oriData.email !== email)
    }

    const handleClose = () => {
        setOpen(false);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(changeEmail)
        if (valid && !changeEmail && emailValid) {
            const response = await userUpdate({
                authorName: author,
                userName: user,
                email
            })
            console.log(response)
            if ( response.success ){
                if ( localStorage.getItem('user') ) {
                    console.log('test')
                    console.log(response.data)
                    setData(response.data)
                }
                setSuccess(true)
                setEmailExist(false)
                setAuthorExist(false)
                setUserExist(false)
            }else if (response.message === 'This account has been used') {
                setSuccess(false)
                setEmailExist(true)
                setAuthorExist(false)
                setUserExist(false)
                setEmailValid(true)
            }else if (response.message === 'This user name has been used') {
                setSuccess(false)
                setEmailExist(false)
                setAuthorExist(false)
                setUserExist(true)
                setEmailValid(true)
            }else if (response.message === 'This author name has been used') {
                setSuccess(false)
                setEmailExist(false)
                setAuthorExist(true)
                setUserExist(false)
                setEmailValid(true)
            }
        }
    }

    const handleCheckSubmit = async () => {
        if (valid && emailValid) {
            const response = await userUpdate({
                authorName: author,
                userName: user,
                email
            })
            console.log(response)
            if ( response.success ){
                if ( localStorage.getItem('user') ) {
                    console.log('test')
                    console.log(response.data)
                    setData(response.data)
                }
                setSuccess(true)
                setEmailExist(false)
                setAuthorExist(false)
                setUserExist(false)
            }else if (response.message === 'This account has been used') {
                setSuccess(false)
                setEmailExist(true)
                setAuthorExist(false)
                setUserExist(false)
                setEmailValid(true)
            }else if (response.message === 'This user name has been used') {
                setSuccess(false)
                setEmailExist(false)
                setAuthorExist(false)
                setUserExist(true)
                setEmailValid(true)
            }else if (response.message === 'This author name has been used') {
                setSuccess(false)
                setEmailExist(false)
                setAuthorExist(true)
                setUserExist(false)
                setEmailValid(true)
            }
            setOpen(false)
        }
    }


    return (
        <div id="Body">
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent:'center', flexDirection:'column' }}
                 ref={formRef}
                 component="form"
                 onSubmit={handleSubmit}
            >
                <div className='data'>
                    <span className='titles'>*Author Name:</span>
                    <TextField id="author" 
                            variant="standard" 
                            sx={{ width: '200px'}}
                            required
                            value={author}
                            onChange={e=>{setAuthor(e.target.value)}}
                            InputProps={{
                                    readOnly: !editAuthor,
                                    inputProps: {
                                        style: { textAlign: "center" },
                                    }
                                }}/>
                        {editAuthor?
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleAuthorClick}>
                                <DoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            </IconButton>
                            :
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleAuthorClick}>
                                <EditIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            </IconButton>
                        }
                </div>
                <div className='data'>
                    <span className='titles'>*User Name:</span>
                    <TextField id="user" 
                            variant="standard" 
                            sx={{ width: '200px'}}
                            required
                            value={user}
                            onChange={e=>{setUser(e.target.value)}}
                            InputProps={{
                                    readOnly: !editUser,
                                    inputProps: {
                                        style: { textAlign: "center" },
                                    }
                                }}/>
                        {editUser?
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleUserClick}>
                                <DoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            </IconButton>
                            :
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleUserClick}>
                                <EditIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            </IconButton>
                        }
                </div>
                <div className='data'>
                    <span className='titles'>*Email:</span>
                    <TextField id="email" 
                            variant="standard" 
                            sx={{ width: '200px'}}
                            required
                            value={email}
                            onChange={e=>{setEmail(e.target.value)}}
                            InputProps={{
                                    readOnly: !editEmail,
                                    inputProps: {
                                        style: { textAlign: "center" },
                                    }
                                }}/>
                        {editEmail?
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleEmailClick}>
                                <DoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            </IconButton>
                            :
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleEmailClick}>
                                <EditIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            </IconButton>
                        }
                </div>
                <div id='submitButton'>
                    <Button type="submit" variant='outlined' disabled={!isChanged || !notEmpty} onClick={handleBtnClick}>Save</Button>
                </div>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"確定要更改email？"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    若確定要更改系統將會自動登出。並請以新的帳號登人。
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button onClick={handleCheckSubmit} autoFocus>
                    確定
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}