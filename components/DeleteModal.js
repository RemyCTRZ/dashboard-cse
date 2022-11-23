import { apiService } from '../services/APIService'
import { FiTrash2 } from 'react-icons/fi'
import { useState } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import styles from '../styles/DeleteModal.module.css'

export default function DeleteModal({ user, setMonitorChange, monitorChange, optionsAxios }) {

    const [open, setOpen] = useState(false);

    const handleModal = (bool) => {
        setOpen(bool);
    };

    const deleteUser = () => {
        apiService.delete('users', user.user_id, optionsAxios)
            .then(
                response => {
                    apiService.get('users')
                        .then(
                            response => {
                                setMonitorChange(!monitorChange)
                            }
                        )
                }
            )
    }

    return (
        <div>
            <button className={styles.btn} onClick={() => { handleModal(!open) }}>
                <FiTrash2 className={styles.icon} />
            </button>
            <Dialog
                open={open}
                onClose={() => { handleModal(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmer la suppression de " + user.mail + " ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Cette action est irréversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleModal(!open)
                        deleteUser()
                    }} autoFocus>Confirmer</Button>
                    <Button onClick={() => { handleModal(!open) }}>Annuler</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
