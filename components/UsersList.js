import { useState } from 'react';
import styles from '../styles/UsersList.module.css'
import { DataGrid, frFR } from '@mui/x-data-grid'
import UpdateModal from './UpdateModal'
import DeleteModal from './DeleteModal'
import { IoClose } from 'react-icons/io5'
import { BsCheckLg } from 'react-icons/bs'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import CreateModal from './CreateModal'
import dayjs from 'dayjs'


export default function AdminsList({ admins, candidates, companies, setMonitorChange, monitorChange, optionsAxios }) {

    const [copy, setCopy] = useState(false)

    const handleClick = (params) => {
        setCopy(true)
        navigator.clipboard.writeText(params.value)
    }

    const adminsColumn = [
        { field: 'user_id', headerName: 'ID', width: 40 },
        { field: 'mail', headerName: 'Email', width: 180 },
        { field: 'city', headerName: 'Ville', width: 200 },
        { field: 'zip_code', headerName: 'Code postal', width: 120 },
        {
            field: 'phone_number', headerName: 'Téléphone', width: 130,
            renderCell: (params) => {
                let formated1 = params.value.split("").splice(0, 2).join('')
                let formated2 = params.value.split("").splice(2, 2).join('')
                let formated3 = params.value.split("").splice(4, 2).join('')
                let formated4 = params.value.split("").splice(6, 2).join('')
                let formated5 = params.value.split("").splice(8, 2).join('')
                let telephone = formated1 + ' ' + formated2 + ' ' + formated3 + ' ' + formated4 + ' ' + formated5
                return <p>{telephone}</p>
            }
        },
        {
            field: 'is_active', headerName: 'Actif', width: 80, sortable: false,
            renderCell: (params) => (
                params.value ? params.value = <BsCheckLg className={styles.true} /> : params.value = <IoClose className={styles.false} />
            )
        },
        {
            field: 'is_pending', headerName: 'Validé', width: 80,
            renderCell: (params) => {
                return params.value || params.row.is_to_be_completed ? params.value = <BiDotsHorizontalRounded className={styles.pending} /> : params.value = <BsCheckLg className={styles.true} />
            }
        },
        {
            field: 'is_to_be_completed', headerName: 'Dossier valide', width: 80,
            renderCell: (params) => (
                params.value ? params.value = <BiDotsHorizontalRounded className={styles.pending} /> : params.value = <BsCheckLg className={styles.true} />
            )
        },
        { field: 'role', headerName: 'Rôle', width: 130 },
        {
            field: 'createdAt', headerName: 'Créé le', width: 110,
            renderCell: (params) => (
                dayjs(params.value).format('DD/MM/YYYY')
            )
        },
        // {
        //     field: 'actions', headerName: 'Actions', width: 100,
        //     renderCell: (params) => (
        //         <div className={styles.container}>
        //             <UpdateModal optionsAxios={optionsAxios} user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
        //             <DeleteModal optionsAxios={optionsAxios} user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
        //         </div>
        //     ),
        // },
    ];

    const candidatesColumns = [
        { field: 'user_id', headerName: 'ID', width: 40 },
        { field: 'lastname', headerName: 'Nom', width: 180 },
        { field: 'firstname', headerName: 'Prénom', width: 180 },
        {
            field: 'birthdate', headerName: 'Date de naissance', width: 110,
            renderCell: (params) => (
                dayjs(params.value).format('DD/MM/YYYY')
            )
        },
        { field: 'mail', headerName: 'Email', width: 180 },
        { field: 'city', headerName: 'Ville', width: 200 },
        { field: 'zip_code', headerName: 'Code postal', width: 120 },
        {
            field: 'phone_number', headerName: 'Téléphone', width: 130,
            renderCell: (params) => {
                let formated1 = params.value.split("").splice(0, 2).join('')
                let formated2 = params.value.split("").splice(2, 2).join('')
                let formated3 = params.value.split("").splice(4, 2).join('')
                let formated4 = params.value.split("").splice(6, 2).join('')
                let formated5 = params.value.split("").splice(8, 2).join('')
                let telephone = formated1 + ' ' + formated2 + ' ' + formated3 + ' ' + formated4 + ' ' + formated5
                return <p>{telephone}</p>
            }
        },
        {
            field: 'is_active', headerName: 'Actif', width: 80, sortable: false,
            renderCell: (params) => (
                params.value ? params.value = <BsCheckLg className={styles.true} /> : params.value = <IoClose className={styles.false} />
            )
        },
        {
            field: 'is_pending', headerName: 'Validé', width: 80,
            renderCell: (params) => (
                params.value ? params.value = <BiDotsHorizontalRounded className={styles.pending} /> : params.value = <BsCheckLg className={styles.true} />
            )
        },
        {
            field: 'is_to_be_completed', headerName: 'Dossier valide', width: 80,
            renderCell: (params) => (
                params.value ? params.value = <BiDotsHorizontalRounded className={styles.pending} /> : params.value = <BsCheckLg className={styles.true} />
            )
        },
        {
            field: 'createdAt', headerName: 'Créé le', width: 110,
            renderCell: (params) => (
                dayjs(params.value).format('DD/MM/YYYY')
            )
        },
        {
            field: 'actions', headerName: 'Actions', width: 100,
            renderCell: (params) => (
                <div className={styles.container}>
                    <UpdateModal optionsAxios={optionsAxios} user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} candidates={candidates} />
                    <DeleteModal optionsAxios={optionsAxios} user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
                </div>
            ),
        },
    ];

    const companiesColumns = [
        { field: 'user_id', headerName: 'ID', width: 40 },
        { field: 'name', headerName: 'Nom', width: 180 },
        {
            field: 'siret', headerName: 'SIRET', width: 150,
            renderCell: (params) => {
                let formated1 = params.value.split("").splice(0, 3).join('')
                let formated2 = params.value.split("").splice(3, 3).join('')
                let formated3 = params.value.split("").splice(6, 3).join('')
                let formated4 = params.value.split("").splice(9, 5).join('')
                return <p> {formated1 + ' ' + formated2 + ' ' + formated3 + ' ' + formated4}</p>
            }
        },
        { field: 'mail', headerName: 'Email', width: 180 },
        { field: 'city', headerName: 'Ville', width: 200 },
        { field: 'zip_code', headerName: 'Code postal', width: 120 },
        {
            field: 'phone_number', headerName: 'Téléphone', width: 130,
            renderCell: (params) => {
                let formated1 = params.value.split("").splice(0, 2).join('')
                let formated2 = params.value.split("").splice(2, 2).join('')
                let formated3 = params.value.split("").splice(4, 2).join('')
                let formated4 = params.value.split("").splice(6, 2).join('')
                let formated5 = params.value.split("").splice(8, 2).join('')
                let telephone = formated1 + ' ' + formated2 + ' ' + formated3 + ' ' + formated4 + ' ' + formated5
                return <p>{telephone}</p>
            }
        },
        {
            field: 'is_active', headerName: 'Actif', width: 80, sortable: false,
            renderCell: (params) => (
                params.value ? params.value = <BsCheckLg className={styles.true} /> : params.value = <IoClose className={styles.false} />
            )
        },
        {
            field: 'is_pending', headerName: 'Validé', width: 80,
            renderCell: (params) => (
                params.value ? params.value = <BiDotsHorizontalRounded className={styles.pending} /> : params.value = <BsCheckLg className={styles.true} />
            )
        },
        {
            field: 'is_to_be_completed', headerName: 'Dossier valide', width: 80,
            renderCell: (params) => (
                params.value ? params.value = <BiDotsHorizontalRounded className={styles.pending} /> : params.value = <BsCheckLg className={styles.true} />
            )
        },
        {
            field: 'createdAt', headerName: 'Créé le', width: 110,
            renderCell: (params) => (
                dayjs(params.value).format('DD/MM/YYYY')
            )
        },
        {
            field: 'actions', headerName: 'Actions', width: 100,
            renderCell: (params) => (
                <div className={styles.container}>
                    <UpdateModal optionsAxios={optionsAxios} user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} companies={companies} />
                    <DeleteModal optionsAxios={optionsAxios} user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
                </div>
            ),
        },
    ];


    return (
        <>
            {admins &&
                <DataGrid
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundImage: 'linear-gradient(0deg,hsl(199deg 100% 14%) 0%,hsl(199deg 100% 18%) 50%,hsl(199deg 100% 22%) 100%)',
                            color: '#fff',
                        },
                        '& .MuiDataGrid-cell': {
                            border: '.5px solid #f1f1f1',
                        },
                        '& .MuiButtonBase-root': {
                            color: '#fff'
                        },
                    }}
                    getRowId={(row) => row.user_id}
                    className={styles.list}
                    rows={admins}
                    columns={adminsColumn}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    onCellDoubleClick={handleClick}
                    disableSelectionOnClick
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                />
            }

            {candidates &&
                <DataGrid
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundImage: 'linear-gradient(0deg,hsl(199deg 100% 14%) 0%,hsl(199deg 100% 18%) 50%,hsl(199deg 100% 22%) 100%)',
                            color: '#fff',
                        },
                        '& .MuiDataGrid-cell': {
                            border: '.5px solid #f1f1f1',
                        },
                        '& .MuiButtonBase-root': {
                            color: '#fff'
                        },
                    }}
                    className={styles.list}
                    getRowId={(row) => row.user_id}
                    rows={candidates}
                    columns={candidatesColumns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    onCellDoubleClick={handleClick}
                    disableSelectionOnClick
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                />
            }

            {companies &&
                <DataGrid
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundImage: 'linear-gradient(0deg,hsl(199deg 100% 14%) 0%,hsl(199deg 100% 18%) 50%,hsl(199deg 100% 22%) 100%)',
                            color: '#fff',
                        },
                        '& .MuiDataGrid-cell': {
                            border: '.5px solid #f1f1f1',
                        },
                        '& .MuiButtonBase-root': {
                            color: '#fff'
                        },
                    }}
                    className={styles.list}
                    getRowId={(row) => row.user_id}
                    rows={companies}
                    columns={companiesColumns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    onCellDoubleClick={handleClick}
                    disableSelectionOnClick
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                />
            }
            <CreateModal monitorChange={monitorChange} setMonitorChange={setMonitorChange} />
            <div className={!copy ? styles.copy : styles.copy_active} onAnimationEnd={() => setCopy(false)}>
                <p className={styles.copy_txt}>Copié avec succès</p>
            </div>
        </>
    );
}