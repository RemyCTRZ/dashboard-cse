import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import styles from '../styles/CreateModal.module.css'
import { apiService } from '../services/APIService';
import { FaUserPlus } from 'react-icons/fa';

export default function CreateModal() {

    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('candidate')
    const [userInfo, setUserInfo] = useState('')

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
                        <div className={styles.div}>
                            <label className={styles.label}>
                                <span className={styles.span_role} >Rôle :</span>
                            </label>
                            <select className={styles.select} required name="role" onChange={(e) => setSelectedRole(e.target.value)}>
                                <option value="candidate">Candidat</option>
                                <option value="company">Recruteur</option>
                                <option value="admin">Administrateur</option>
                            </select>
                        </div>

                        {selectedRole == "candidate" ? (
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
                        ) : ''}

                        {selectedRole == "company" ? (
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
                                    />
                                </div>
                            </>
                        ) : ''}

                        {selectedRole == "admin" ? (
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
                        ) : ''}

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
                                type="text"
                                fullWidth
                                name="phone_number"
                                variant="standard"
                                onChange={handleChange}
                                inputProps={{ maxLength: 10 }}
                            />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => { handleModal(false) }}>Créer</Button>
                    <Button onClick={() => { handleModal(false) }}>Annuler</Button>
                </DialogActions>
            </Dialog >
        </div >
    );
}