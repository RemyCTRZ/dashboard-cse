import { useRef, useState } from 'react';
import { apiService } from '../services/APIService';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import FileUploader from './FileUploader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import styles from '../styles/CreateModal.module.css'

var siret = require('siret'); // Module qui permet de vérifier la validité d'un SIRET

export default function CreateModal({ open, setOpen, setMonitorChange, monitorChange, imgSource, setImgSource }) {

    function handleModal(bool) {
        setOpen(bool);
        setMonitorChange(!monitorChange)
    };

    // Infos de l'utilisateur
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

    // Création de l'utilisateur
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
            <Dialog open={open} onClose={() => { handleModal(false) }}>
                <DialogTitle className={styles.dialog_title}>Création d'utilisateur</DialogTitle>
                <DialogContent className={styles.dialog_content}>
                    <div className={styles.first_row}>
                        <FileUploader
                            onFileSelectError={({ error }) => alert(error)}
                            onFileSelectSuccess={(file) => (file)}
                            setImgSource={setImgSource}
                            imgSource={imgSource}
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
                                        inputRef={lastnameRef}
                                        variant="standard"
                                        name="lastname"
                                        margin="dense"
                                        type="text"
                                        autoFocus
                                        fullWidth
                                    />
                                </div>
                                <div className={styles.div}>
                                    <label className={styles.label}>Prénom :</label>
                                    <TextField
                                        className={styles.text_field}
                                        inputRef={firstnameRef}
                                        variant="standard"
                                        name="firstname"
                                        margin="dense"
                                        type="text"
                                        fullWidth
                                    />
                                </div>
                                <div className={styles.div}>
                                    <label className={styles.label}>Date de naissance :</label>
                                    <TextField
                                        className={styles.text_field}
                                        inputRef={birthRef}
                                        variant="standard"
                                        name="birthdate"
                                        margin="dense"
                                        type="date"
                                        fullWidth
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
                                        inputRef={nameRef}
                                        variant="standard"
                                        margin="dense"
                                        type="name"
                                        name="name"
                                        autoFocus
                                        fullWidth
                                    />
                                </div>
                                <div className={styles.div}>
                                    <label className={styles.label}>Siret :</label>
                                    <TextField
                                        inputProps={{ maxLength: 14 }}
                                        className={styles.text_field}
                                        inputRef={siretRef}
                                        variant="standard"
                                        margin="dense"
                                        type="siret"
                                        name="siret"
                                        fullWidth
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
                                inputRef={mailRef}
                                variant="standard"
                                margin="dense"
                                type="email"
                                name="mail"
                                fullWidth
                            />
                        </div>
                        <div className={styles.div}>
                            <label className={styles.label}>Mot de passe :</label>
                            <TextField
                                className={styles.text_field}
                                inputRef={passwordRef}
                                variant="standard"
                                type="password"
                                name="password"
                                margin="dense"
                                fullWidth
                            />
                        </div>
                        <div className={styles.div}>
                            <label className={styles.label}>Adresse :</label>
                            <TextField
                                className={styles.text_field}
                                inputRef={addressRef}
                                variant="standard"
                                margin="dense"
                                name="address"
                                type="text"
                                fullWidth
                            />
                        </div>
                        <div className={styles.div}>
                            <label className={styles.label}>Ville :</label>
                            <TextField
                                className={styles.text_field}
                                inputRef={cityRef}
                                variant="standard"
                                margin="dense"
                                name="city"
                                type="text"
                                fullWidth
                            />
                        </div>
                        <div className={styles.div}>
                            <label className={styles.label}>Code postal :</label>
                            <TextField
                                className={styles.text_field}
                                inputProps={{ maxLength: 5 }}
                                variant="standard"
                                inputRef={zipRef}
                                name="zip_code"
                                margin="dense"
                                type="text"
                                fullWidth
                            />
                        </div>
                        <div className={styles.div}>
                            <label className={styles.label}>Téléphone :</label>
                            <TextField
                                inputProps={{ maxLength: 10, pattern: "[0-9]" }}
                                className={styles.text_field}
                                inputRef={phoneRef}
                                name="phone_number"
                                variant="standard"
                                margin="dense"
                                type="tel"
                                fullWidth
                            />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => { createUser() }}>Créer</Button>
                    <Button onClick={() => { handleModal(false) }}>Annuler</Button>
                </DialogActions>
            </Dialog >
        </div >
    );
}