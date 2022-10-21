import { DataGrid } from '@mui/x-data-grid';
import styles from '../styles/UsersList.module.css'
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5'
import { BsCheckLg } from 'react-icons/bs'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

export default function UsersList({ users, candidates, companies, setMonitorChange, monitorChange }) {

    useEffect(() => {
        candidates?.map(candidate => {
            Object.assign(candidate, candidate.User)
            delete candidate['User']
        })
        companies?.map(company => {
            Object.assign(company, company.User)
            delete company['User']
        })
    }, [candidates, companies, users])

    const usersColumns = [
        { field: 'user_id', headerName: 'ID', width: 70 },
        { field: 'mail', headerName: 'Email', width: 180 },
        { field: 'city', headerName: 'Ville', width: 200 },
        { field: 'zip_code', headerName: 'Code postal', width: 120 },
        { field: 'phone_number', headerName: 'Téléphone', width: 130 },
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
        { field: 'role', headerName: 'Rôle', width: 130 },
        { field: 'createdAt', headerName: 'Créé le', width: 110 },
        {
            field: 'actions', headerName: 'Actions', width: 100,
            renderCell: (params) => (
                <div className={styles.container}>
                    <UpdateModal user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
                    <DeleteModal user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
                </div>
            ),
        },
    ];

    const candidatesColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'lastname', headerName: 'Nom', width: 180 },
        { field: 'firstname', headerName: 'Prénom', width: 180 },
        { field: 'birthdate', headerName: 'Date de naissance', width: 180 },
        { field: 'mail', headerName: 'Email', width: 180 },
        { field: 'city', headerName: 'Ville', width: 200 },
        { field: 'zip_code', headerName: 'Code postal', width: 120 },
        { field: 'phone_number', headerName: 'Téléphone', width: 130 },
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
        { field: 'createdAt', headerName: 'Créé le', width: 110 },
        {
            field: 'actions', headerName: 'Actions', width: 100,
            renderCell: (params) => (
                <div className={styles.container}>
                    <UpdateModal user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} candidates={candidates} />
                    <DeleteModal user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
                </div>
            ),
        },
    ];

    const companiesColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nom', width: 180 },
        { field: 'siret', headerName: 'SIRET', width: 130 },
        { field: 'mail', headerName: 'Email', width: 180 },
        { field: 'city', headerName: 'Ville', width: 200 },
        { field: 'zip_code', headerName: 'Code postal', width: 120 },
        { field: 'phone_number', headerName: 'Téléphone', width: 130 },
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
        { field: 'createdAt', headerName: 'Créé le', width: 110 },
        {
            field: 'actions', headerName: 'Actions', width: 100,
            renderCell: (params) => (
                <div className={styles.container}>
                    <UpdateModal user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} companies={companies} />
                    <DeleteModal user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
                </div>
            ),
        },
    ];

    return (
        <>
            {users ? <>
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
                    rows={users}
                    columns={usersColumns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    disableSelectionOnClick
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                />

            </> : ''}
            {candidates ? <>
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
                    rows={candidates}
                    columns={candidatesColumns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    disableSelectionOnClick
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                />

            </> : ''}
            {companies ? <>
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
                    rows={companies}
                    columns={companiesColumns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    disableSelectionOnClick
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                />

            </> : ''}
        </>
    );
}