import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';


export default function Body () {

    const [editAuthor, setEditAuthor] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    const handleAuthorClick = () => {
        setEditAuthor(!editAuthor);
    }

    const handleUserClick = () => {
        setEditUser(!editUser);
    }

    const handleEmailClick = () => {
        setEditEmail(!editEmail);
    }


    return (
        <div id="Body">
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent:'center', flexDirection:'column' }}>
                <div className='data'>
                    <span className='titles'>Author Name:</span>
                    <TextField id="author" 
                            variant="standard" 
                            InputProps={{
                                    readOnly: !editAuthor,
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
                    <span className='titles'>User Name:</span>
                    <TextField id="user" 
                            variant="standard" 
                            InputProps={{
                                    readOnly: !editUser,
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
                    <span className='titles'>Email:</span>
                    <TextField id="email" 
                            variant="standard" 
                            InputProps={{
                                    readOnly: !editEmail,
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
            </Box>
        </div>
    );
}