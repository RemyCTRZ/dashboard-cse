import { DialogContentText } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { getCookie, hasCookie } from 'cookies-next'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { BsExclamationLg } from 'react-icons/bs'
import { FiEdit2 } from 'react-icons/fi'
import { renewToken } from '../pages'
import { apiService } from '../services/APIService'
import styles from '../styles/UpdateModal.module.css'
import FileUploader from './FileUploader'

export default function UpdateModal({ user, candidates, companies, setMonitorChange, monitorChange, optionsAxios, imgSource, setImgSource }) {

    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    function pushError(error) {
        setError(true)
        setErrorMsg(error)
    }

    function modalClick(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    const [open, setOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({
        lastname: '',
        firstname: '',
        birthdate: '',
        name: '',
        siret: '',
        city: '',
        mail: '',
        phone_number: '',
        zip_code: '',
        role: '',
    })

    useEffect(() => {
        setUserInfo(user)
    }, [])


    const updateUser = () => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.mail)) return pushError('Email invalide')
        renewToken()
        if (hasCookie('accessToken')) optionsAxios = {
            headers: {
                Authorization: `Bearer ${getCookie('accessToken')}`
            }
        }
        if (userInfo.role == 'candidat') apiService.put(`candidates/${user.user_id}`, userInfo, optionsAxios)
            .then(response => {
                setMonitorChange(!monitorChange)
                handleModal(false)
            })
            .catch(error => pushError(error.response.data.message))
        if (userInfo.role == 'entreprise') apiService.put(`companies/${user.user_id}`, userInfo, optionsAxios)
            .then(response => {
                setMonitorChange(!monitorChange)
                handleModal(false)
            })
            .catch(error => pushError(error.response.data.message))
    }

    const handleChange = (e) => {
        const value = e.target.value
        setUserInfo({
            ...userInfo,
            [e.target.name]: value
        })
    }

    const handleModal = (bool) => {
        setOpen(bool)
    }

    return (
        <div className={styles.cell}>
            <button className={styles.btn} onClick={() => { handleModal(true) }}>
                <FiEdit2 className={styles.icon} />
            </button>
            <Dialog sx={{ zIndex: '0' }} className={styles.dialog} open={open} onClose={() => { handleModal(false) }}>
                {error &&
                    <div className={styles.error_shadow} onClick={() => setError(false)}>
                        <BsExclamationLg className={styles.error_icon} onClick={(e) => modalClick(e)} />
                        <div className={styles.error_container} onClick={(e) => modalClick(e)}>
                            <h2 className={styles.error_title}>Erreur :</h2>
                            <p className={styles.error_msg}>{errorMsg ? errorMsg : "Message d'erreur"}</p>
                            <div className={styles.error_btn_container}>
                                <button className={styles.error_btn} onMouseUp={() => setError(false)}>OK</button>
                                <span className={styles.error_btn_truc} />
                            </div>
                        </div>
                    </div>
                }
                <DialogTitle className={styles.dialog_title}>Modification de profil</DialogTitle>
                <DialogContent className={styles.dialog_content}>
                    <article className={styles.article}>
                        <FileUploader
                            onFileSelectSuccess={(file) => (file)}
                            onFileSelectError={({ error }) => pushError(error)}
                            imgSource={imgSource}
                            setImgSource={setImgSource}
                        />


                        {candidates &&
                            <>
                                <div className={styles.div}>
                                    <label className={styles.label}>Nom :</label>
                                    <TextField
                                        className={styles.text_field}
                                        autoFocus
                                        margin="dense"
                                        type="text"
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
                                        type="date"
                                        name="birthdate"
                                        variant="standard"
                                        value={dayjs(userInfo.birthdate).format('YYYY-MM-DD')}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 8 }}
                                    />
                                </div>
                            </>}


                        {companies &&
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
                                        inputProps={{ maxLength: 14 }}
                                    />
                                </div>
                            </>
                        }
                    </article>

                    <article className={styles.article}>
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
                                inputMode='numeric'
                                name="zip_code"
                                variant="standard"
                                value={userInfo.zip_code}
                                onChange={handleChange}
                                inputProps={{ maxLength: 5 }}
                                required
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
                                value={userInfo.phone_number}
                                onChange={handleChange}
                                inputProps={{ maxLength: 10 }}
                            />
                        </div>
                        <div className={styles.div}>
                            <label className={styles.label}>Rôle :</label>
                            <DialogContentText className={styles.role}>{userInfo.role}</DialogContentText>
                        </div>
                    </article>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        updateUser()
                    }}>Confirmer</Button>
                    <Button onClick={() => { handleModal(false) }}>Annuler</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}