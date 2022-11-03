import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi'
import styles from '../styles/UpdateModal.module.css'
import { apiService } from '../services/APIService';

export default function UpdateModal({ user, candidates, companies, setMonitorChange, monitorChange }) {

    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        lastname: '',
        firstname: '',
        birthdate: '',
        name: '',
        siret: '',
        city: '',
        mail: '',
        // password: user.password,
        phone_number: '',
        zip_code: '',
        is_active: '',
        is_pending: '',
        role: '',
    })

    useEffect(() => {
        setUserInfo(user)
    }, [])

    const updateUser = () => {
        apiService.put(`users/${user.user_id}`, userInfo).then(response => setMonitorChange(!monitorChange))
    }

    const handleChange = (e) => {
        const value = e.target.value
        setUserInfo({
            ...userInfo,
            [e.target.name]: value
        })
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
                <DialogTitle className={styles.dialog_title}>Modification de profil</DialogTitle>
                <DialogContent className={styles.dialog_content}>

                    {candidates ? (
                        <>
                            <div className={styles.div}>
                                <label className={styles.label}>Nom :</label>
                                <TextField
                                    className={styles.text_field}
                                    autoFocus
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    name="lastname"
                                    variant="standard"
                                    value={userInfo.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.div}>
                                <label className={styles.label}>Prénom :</label>
                                <TextField
                                    className={styles.text_field}
                                    autoFocus
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    name="firstname"
                                    variant="standard"
                                    value={userInfo.firstname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.div}>
                                <label className={styles.label}>Date de naissance :</label>
                                <TextField
                                    className={styles.text_field}
                                    autoFocus
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    name="birthdate"
                                    variant="standard"
                                    value={userInfo.birthdate}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    ) : ''}

                    {companies ? (
                        <>
                            <div className={styles.div}>
                                <label className={styles.label}>Nom :</label>
                                <TextField
                                    className={styles.text_field}
                                    autoFocus
                                    margin="dense"
                                    type="name"
                                    fullWidth
                                    name="name"
                                    variant="standard"
                                    value={userInfo.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.div}>
                                <label className={styles.label}>Siret :</label>
                                <TextField
                                    className={styles.text_field}
                                    autoFocus
                                    margin="dense"
                                    type="siret"
                                    fullWidth
                                    name="siret"
                                    variant="standard"
                                    value={userInfo.siret}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    ) : ''}

                    <div className={styles.div}>
                        <label className={styles.label}>Adresse mail :</label>
                        <TextField
                            className={styles.text_field}
                            autoFocus
                            margin="dense"
                            type="email"
                            fullWidth
                            name="mail"
                            variant="standard"
                            value={userInfo.mail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.div}>
                        <label className={styles.label}>Ville :</label>
                        <TextField
                            className={styles.text_field}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            name="city"
                            variant="standard"
                            value={userInfo.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.div}>
                        <label className={styles.label}>Code postal :</label>
                        <TextField
                            className={styles.text_field}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            name="zip_code"
                            variant="standard"
                            value={userInfo.zip_code}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.div}>
                        <label className={styles.label}>Téléphone :</label>
                        <TextField
                            className={styles.text_field}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            name="phone_number"
                            variant="standard"
                            value={userInfo.phone_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.div}>
                        <label className={styles.label}>Rôle :</label>
                        <TextField
                            className={styles.text_field}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            name="role"
                            variant="standard"
                            value={userInfo.role}
                            onChange={handleChange}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        updateUser()
                        handleModal(false)
                    }}>Confirmer</Button>
                    <Button onClick={() => { handleModal(false) }}>Annuler</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}