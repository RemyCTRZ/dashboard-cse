import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import styles from '../styles/CreateModal.module.css'
import { apiService } from '../services/APIService';
import { FaUserPlus } from 'react-icons/fa';
import FileUploader from './FileUploader';

export default function CreateModal({ setMonitorChange, monitorChange }) {

    const [selectedAvatar, setSelectedAvatar] = useState()
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('candidat')
    const [userInfo, setUserInfo] = useState({
        mail: null,
        password: null,
        is_active: false,
        is_pending: true,
        zip_code: null,
        city: null,
        address: null,
        phone_number: null,
        role: "candidat",
        lastname: null,
        firstname: null,
        birthdate: null,
        name: null,
        siret: null,
    })

    const createUser = () => {
        if (userInfo.role == 'candidat') apiService.post(`candidates/`, userInfo).then(response => setMonitorChange(!monitorChange))
        if (userInfo.role == 'entreprise') apiService.post(`companies/`, userInfo).then(response => setMonitorChange(!monitorChange))
        if (userInfo.role == 'admin') apiService.post(`admins/`, userInfo).then(response => setMonitorChange(!monitorChange))
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
            <button className={styles.create_btn} onClick={() => { handleModal(true) }}><FaUserPlus /></button>
            <Dialog open={open} onClose={() => { handleModal(false) }}>
                <DialogTitle className={styles.dialog_title}>Création d'utilisateur</DialogTitle>
                <DialogContent className={styles.dialog_content}>
                    <div className={styles.first_row}>
                        <FileUploader
                            onFileSelectSuccess={(file) => setSelectedAvatar(file)}
                            onFileSelectError={({ error }) => alert(error)}
                        />
                        <div className={styles.div}>
                            <label className={styles.label}>
                                <span className={styles.span_role} >Rôle :</span>
                            </label>
                            <select className={styles.select} required name="role" onChange={(e) => { handleChange(e); setSelectedRole(e.target.value) }}>
                                <option value="candidat">Candidat</option>
                                <option value="recruteur">Recruteur</option>
                                <option value="admin">Administrateur</option>
                            </select>
                        </div>

                        {selectedRole == "candidat" &&
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
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.div}>
                                    <label className={styles.label}>Date de naissance :</label>
                                    <TextField
                                        className={styles.text_field}
                                        autoFocus
                                        margin="dense"
                                        type="date"
                                        fullWidth
                                        name="birthdate"
                                        variant="standard"
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        }

                        {selectedRole == "recruteur" &&
                            <>
                                <div className={styles.div}>
                                    <label className={styles.label}>Nom de l'entreprise :</label>
                                    <TextField
                                        className={styles.text_field}
                                        autoFocus
                                        margin="dense"
                                        type="name"
                                        fullWidth
                                        name="name"
                                        variant="standard"
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
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 14 }}
                                    />
                                </div>
                            </>
                        }

                        {selectedRole == "admin" &&
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
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        }
                    </div>

                    <div className={styles.second_row}>

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
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.div}>
                            <label className={styles.label}>Mot de passe :</label>
                            <TextField
                                className={styles.text_field}
                                autoFocus
                                margin="dense"
                                type="password"
                                fullWidth
                                name="password"
                                variant="standard"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.div}>
                            <label className={styles.label}>Adresse :</label>
                            <TextField
                                className={styles.text_field}
                                autoFocus
                                margin="dense"
                                type="text"
                                fullWidth
                                name="address"
                                variant="standard"
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
                                onChange={handleChange}
                                inputProps={{ maxLength: 5 }}
                            />
                        </div>
                        <div className={styles.div}>
                            <label className={styles.label}>Téléphone :</label>
                            <TextField
                                className={styles.text_field}
                                autoFocus
                                margin="dense"
                                type="tel"
                                fullWidth
                                name="phone_number"
                                variant="standard"
                                onChange={handleChange}
                                inputProps={{ maxLength: 10, pattern: "[0-9]" }}
                            />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => {
                        handleModal(false)
                        createUser()
                    }}>Créer</Button>
                    <Button onClick={() => { handleModal(false) }}>Annuler</Button>
                </DialogActions>
            </Dialog >
        </div >
    );
}