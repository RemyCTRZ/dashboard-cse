import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi'
import styles from '../styles/UpdateModal.module.css'
import { apiService } from '../services/APIService';

export default function UpdateModal({ user }) {

    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        city: user.city,
        mail: user.mail,
        // password: user.password,
        phone_number: user.phone_number,
        zip_code: user.zip_code,
        is_active: user.is_active,
        is_pending: user.is_pending,
        role: user.role
    })

    const handleChange = (e) => {
        const value = e.target.value
        setUserInfo({
            ...userInfo,
            [e.target.name]: value
        })
    }

    console.log(userInfo)

    const updateUser = () => {
        apiService.put(`users /${user.user_id}`, userInfo).then(response => console.log(response))
    }

    const handleModal = (bool) => {
        setOpen(bool);
    };

    return (
        <div>
            <button className={styles.btn} onClick={() => { handleModal(true) }}>
                <FiEdit2 className={styles.icon} />
            </button>
            <Dialog open={open} onClose={() => { handleModal(false) }}>
                <DialogTitle>Modification de profil</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={userInfo.mail}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userInfo.city}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userInfo.zip_code}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userInfo.phone_number}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userInfo.role}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { updateUser(), handleModal(false) }}>Confirmer</Button>
                    <Button onClick={() => { handleModal(false) }}>Annuler</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}