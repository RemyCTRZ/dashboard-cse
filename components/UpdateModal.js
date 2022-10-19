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

export default function UpdateModal({ user }) {

    const [open, setOpen] = useState(false);

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
                        value={user.mail}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user.city}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user.zip_code}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user.phone_number}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user.role}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleModal(false) }}>Confirmer</Button>
                    <Button onClick={() => { handleModal(false) }}>Annuler</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}