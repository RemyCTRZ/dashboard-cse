import styles from '../styles/FileUploader.module.css'

export default function FileUploader({ onFileSelectError, onFileSelectSuccess, imgSource, setImgSource }) {

    const handleFileInput = (e) => {

        const file = e.target.files[0]

        if (file.size > 1000000) {
            onFileSelectError({ error: "Le fichier est trop volumineux (1MB max)" })
        }
        else if (!file.type.includes("image")) {
            onFileSelectError({ error: "Le fichier n'est pas une image" })
        }
        else {
            onFileSelectSuccess(file)
            setImgSource(URL.createObjectURL(file))
        }
    }

    return (
        <div className={styles.div}>
            <img className={styles.avatar} label='avatar' src={imgSource} />
            <input className={styles.input} type='file' id="selectedFile" onChange={handleFileInput} />
            <label className={styles.label} htmlFor="selectedFile">Parcourir...</label>
        </div>
    )
}
