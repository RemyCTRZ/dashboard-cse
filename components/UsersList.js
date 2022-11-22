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


export default function AdminsList({ candidates, companies, setMonitorChange, monitorChange, optionsAxios }) {

    const [copy, setCopy] = useState(false)
    const [imgSource, setImgSource] = useState('../assets/images/profile_pic.png')

    const handleClick = (params) => {
        setCopy(true)
        navigator.clipboard.writeText(params.value)
    }

    const candidatesColumns = [
        { field: 'user_id', headerName: 'ID', flex: .5, align: 'center', headerAlign: 'center' },
        { field: 'lastname', headerName: 'Nom', flex: 1 },
        { field: 'firstname', headerName: 'Prénom', flex: 1 },
        {
            field: 'birthdate', headerName: 'Date de naissance', flex: 1, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                dayjs(params.value).format('DD/MM/YYYY')
            )
        },
        { field: 'mail', headerName: 'Email', flex: 1 },
        { field: 'city', headerName: 'Ville', flex: 1 },
        { field: 'zip_code', headerName: 'Code postal', flex: .7, align: 'center', headerAlign: 'center' },
        {
            field: 'phone_number', headerName: 'Téléphone', flex: .7, align: 'center', headerAlign: 'center',
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
            field: 'is_active', headerName: 'Actif', flex: .5, sortable: false, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                params.value ? params.value = <BsCheckLg className={styles.true} /> : params.value = <IoClose className={styles.false} />
            )
        },
        {
            field: 'createdAt', headerName: 'Créé le', flex: 1, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                dayjs(params.value).format('DD/MM/YYYY')
            )
        },
        {
            field: 'actions', headerName: 'Actions', flex: .7, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                <div className={styles.container}>
                    <UpdateModal imgSource={imgSource} setImgSource={setImgSource} optionsAxios={optionsAxios} user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} candidates={candidates} />
                    <DeleteModal optionsAxios={optionsAxios} user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
                </div>
            ),
        },
    ];

    const companiesColumns = [
        { field: 'user_id', headerName: 'ID', flex: .3, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'Nom', flex: 1 },
        {
            field: 'siret', headerName: 'SIRET', flex: .7, align: 'center', headerAlign: 'center',
            renderCell: (params) => {
                let formated1 = params.value.split("").splice(0, 3).join('')
                let formated2 = params.value.split("").splice(3, 3).join('')
                let formated3 = params.value.split("").splice(6, 3).join('')
                let formated4 = params.value.split("").splice(9, 5).join('')
                return <p> {formated1 + ' ' + formated2 + ' ' + formated3 + ' ' + formated4}</p>
            }
        },
        { field: 'mail', headerName: 'Email', flex: 1 },
        { field: 'city', headerName: 'Ville', flex: 1 },
        { field: 'zip_code', headerName: 'Code postal', flex: .3, align: 'center', headerAlign: 'center', },
        {
            field: 'phone_number', headerName: 'Téléphone', flex: .5,
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
            field: 'is_active', headerName: 'Actif', flex: .3, align: 'center', headerAlign: 'center', sortable: false,
            renderCell: (params) => (
                params.value ? params.value = <BsCheckLg className={styles.true} /> : params.value = <IoClose className={styles.false} />
            )
        },
        {
            field: 'createdAt', headerName: 'Créé le', flex: .5, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                dayjs(params.value).format('DD/MM/YYYY')
            )
        },
        {
            field: 'actions', headerName: 'Actions', flex: .5, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                <div className={styles.container}>
                    <UpdateModal imgSource={imgSource} setImgSource={setImgSource} optionsAxios={optionsAxios} user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} companies={companies} />
                    <DeleteModal optionsAxios={optionsAxios} user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
                </div>
            ),
        },
    ];


    return (
        <>
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
            <CreateModal imgSource={imgSource} setImgSource={setImgSource} monitorChange={monitorChange} setMonitorChange={setMonitorChange} />
            <div className={!copy ? styles.copy : styles.copy_active} onAnimationEnd={() => setCopy(false)}>
                <p className={styles.copy_txt}>Copié avec succès</p>
            </div>
        </>
    );
}