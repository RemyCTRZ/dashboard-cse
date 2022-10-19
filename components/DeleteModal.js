import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import styles from '../styles/DeleteModal.module.css'
import { FiTrash2 } from 'react-icons/fi'
import { apiService } from '../services/APIService'

export default function DeleteModal({ user, setUserList }) {

    const [open, setOpen] = useState(false);

    const handleModal = (bool) => {
        setOpen(bool);
    };

    const deleteUser = () => {
        apiService.delete('users', user.id)
            .then(
                response => {
                    apiService.get('users')
                        .then(
                            response => {
                                setUserList(response.data)
                            }
                        )
                }
            )
    }

    return (
        <div>
            <button className={styles.btn} onClick={() => { handleModal(true) }}>
                <FiTrash2 className={styles.icon}/>
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
                        handleModal(false)
                        deleteUser()
                    }} autoFocus>Confirmer</Button>
                    <Button onClick={() => { handleModal(false) }}>Annuler</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
