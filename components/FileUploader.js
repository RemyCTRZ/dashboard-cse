import React, { useState } from 'react'
import styles from '../styles/FileUploader.module.css'

export default function FileUploader({ onFileSelectError, onFileSelectSuccess, selectedAvatar }) {

    const [invalidFile, setInvalidFile] = useState(false)

    const handleFileInput = (e) => {

        const file = e.target.files[0]

        if (file.size > 1000000) {
            onFileSelectError({ error: "Le fichier est trop volumineux (1MB max)" })
            setInvalidFile(true)
        }
        else if (!file.type.includes("image")) {
            onFileSelectError({ error: "Le fichier n'est pas une image" })
            setInvalidFile(true)
        }
        else {
            onFileSelectSuccess(file)
            setInvalidFile(false)
        }
    }

    return (
        <div className={styles.div}>
            <img className={styles.avatar} label='avatar' src={!selectedAvatar ? '../assets/images/profile_pic.png' : selectedAvatar} />
            <input className={styles.input} type='file' id="selectedFile" onChange={handleFileInput} />
            <label className={styles.label} htmlFor="selectedFile">Parcourir...</label>
        </div>
    )
}
