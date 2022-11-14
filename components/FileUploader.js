import React, { useState } from 'react'
import styles from '../styles/FileUploader.module.css'

export default function FileUploader({ onFileSelectError, onFileSelectSuccess, imgSource, setImgSource }) {

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
            setImgSource(URL.createObjectURL(file))
            setInvalidFile(false)
        }
    }

    return (
        <div className={styles.div}>
            <img className={styles.avatar} label='avatar' src={imgSource == '../assets/images/profile_pic.png' ? '../assets/images/profile_pic.png' : imgSource} />
            <input className={styles.input} type='file' id="selectedFile" onChange={handleFileInput} />
            <label className={styles.label} htmlFor="selectedFile">Parcourir...</label>
        </div>
    )
}
