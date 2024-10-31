import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { apiService } from '../services/APIService'
import styles from '../styles/DeleteModal.module.css'

export default function DeleteModal({ user, setMonitorChange, monitorChange, optionsAxios, setError, setErrorMsg }) {

    function pushError(error) {
        setError(true)
        setErrorMsg(error)
    }

    const [open, setOpen] = useState(false)

    const handleModal = (bool) => {
        setOpen(bool)
    }

    const deleteUser = () => {
        apiService.delete('users', user.user_id, optionsAxios)
            .then(
                () => {
                    apiService.get('users')
                        .then(
                            () => {
                                setMonitorChange(!monitorChange)
                            }
                        )
                        .catch(() => pushError('Utilisateurs introuvables'))
                }
            )
            .catch(() => pushError('Impossible de supprimer cet utilisateur'))
    }

    return (
        <div>
            <button className={styles.btn} onClick={() => { handleModal(!open) }}>
                <FiTrash2 className={styles.icon} />
            </button>
            <Dialog
                open={open}
                onClose={() => { handleModal(false) }}
            >
                <DialogTitle>
                    {"Confirmer la suppression de " + user.mail + " ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
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
    )
}
