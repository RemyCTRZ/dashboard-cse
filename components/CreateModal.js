import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef, useState } from 'react';
import styles from '../styles/CreateModal.module.css'
import { apiService } from '../services/APIService';
import { FaUserPlus } from 'react-icons/fa';
import FileUploader from './FileUploader';

var siret = require('siret');

export default function CreateModal({ setMonitorChange, monitorChange, imgSource, setImgSource }) {

    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('candidat')

    const mailRef = useRef(null)
    const passwordRef = useRef(null)
    const zipRef = useRef(null)
    const cityRef = useRef(null)
    const addressRef = useRef(null)
    const phoneRef = useRef(null)
    const lastnameRef = useRef(null)
    const firstnameRef = useRef(null)
    const birthRef = useRef(null)
    const nameRef = useRef(null)
    const siretRef = useRef(null)

    const handleModal = (bool) => {
        setOpen(bool);
        setMonitorChange(!monitorChange)
    };

    const createUser = () => {
        const formInfo = {
            mail: mailRef.current.value,
            password: passwordRef.current.value,
            is_active: false,
            is_pending: true,
            zip_code: zipRef.current.value,
            city: cityRef.current.value,
            address: addressRef.current.value,
            phone_number: phoneRef.current.value,
            role: selectedRole,
            availabilities: ['Janvier'],
            avatar: imgSource
        }

        if (selectedRole == 'candidat') {
            Object.assign(formInfo, { lastname: lastnameRef.current.value, firstname: firstnameRef.current.value, birthdate: birthRef.current.value })
            apiService.post(`candidates/`, formInfo)
                .then(response => handleModal(false))
                .catch(error => alert(error.response.data.error.errors[0].message))
        }

        if (selectedRole == 'recruteur') {
            if (!siret.isSIRET(siretRef.current.value)) return alert("Le siret n'est pas valide")
            Object.assign(formInfo, { name: nameRef.current.value, siret: siretRef.current.value })
            apiService.post(`companies/`, formInfo)
                .then(response => handleModal(false))
                .catch(error => alert(error.response.data.error.errors[0].message))
        }
    }

    return (
        <div>
            <button className={styles.create_btn} onClick={() => { handleModal(true) }}><FaUserPlus /></button>
            <Dialog open={open} onClose={() => { handleModal(false) }}>
                <DialogTitle className={styles.dialog_title}>Création d'utilisateur</DialogTitle>
                <DialogContent className={styles.dialog_content}>
                    <div className={styles.first_row}>
                        <FileUploader
                            onFileSelectSuccess={(file) => (file)}
                            onFileSelectError={({ error }) => alert(error)}
                            imgSource={imgSource}
                            setImgSource={setImgSource}
                        />
                        <div className={styles.div}>
                            <label className={styles.label}>
                                <span className={styles.span_role} >Rôle :</span>
                            </label>
                            <select className={styles.select} name="role" onChange={(e) => setSelectedRole(e.target.value)}>
                                <option value="candidat">Candidat</option>
                                <option value="recruteur">Recruteur</option>
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
                                        inputRef={lastnameRef}
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
                                        inputRef={firstnameRef}
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
                                        inputRef={birthRef}
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
                                        inputRef={nameRef}
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
                                        inputRef={siretRef}
                                        inputProps={{ maxLength: 14 }}
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
                                inputRef={mailRef}
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
                                inputRef={passwordRef}
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
                                inputRef={addressRef}
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
                                inputRef={cityRef}
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
                                inputRef={zipRef}
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
                                inputRef={phoneRef}
                                inputProps={{ maxLength: 10, pattern: "[0-9]" }}
                            />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => {
                        createUser()
                    }}>Créer</Button>
                    <Button onClick={() => { handleModal(false) }}>Annuler</Button>
                </DialogActions>
            </Dialog >
        </div >
    );
}