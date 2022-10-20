import { DataGrid } from '@mui/x-data-grid';
import styles from '../styles/UsersList.module.css'
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5'
import { BsCheckLg } from 'react-icons/bs'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { red } from '@mui/material/colors';

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
        { field: 'mail', headerName: 'Email', width: 160 },
        { field: 'city', headerName: 'Ville', width: 160 },
        { field: 'zip_code', headerName: 'Code postal', width: 160 },
        { field: 'phone_number', headerName: 'Téléphone', width: 160 },
        {
            field: 'is_active', headerName: 'Actif', width: 80, sortable: false,
            renderCell: (params) => (
                params.colDef.headerName = <p className={styles.title}>Actif</p>,
                console.log(params.colDef.headerName),
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
        { field: 'createdAt', headerName: 'Créé le', width: 160 },
        {
            field: 'actions', headerName: 'Actions', width: 500,
            renderCell: (params) => (
                <strong className={styles.container}>
                    <UpdateModal user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
                    <DeleteModal user={params.row} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />
                </strong>
            ),
        },
    ];

    const candidatesColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'lastname', headerName: 'Nom', width: 160 },
        { field: 'firstname', headerName: 'Prénom', width: 160 },
        { field: 'mail', headerName: 'Email', width: 160 },
        { field: 'city', headerName: 'Ville', width: 160 },
        { field: 'zip_code', headerName: 'Code postal', width: 160 },
        { field: 'phone_number', headerName: 'Téléphone', width: 160 },
        { field: 'is_active', headerName: 'Actif', width: 130 },
        { field: 'is_pending', headerName: 'En attente', width: 130 },
        { field: 'createdAt', headerName: 'Créé le', width: 160 },
        {
            field: 'actions', headerName: 'Actions', width: 500,
            renderCell: (params) => (
                <strong className={styles.container}>
                    <UpdateModal user={params.row} setMonitorChange={setMonitorChange} />
                    <DeleteModal user={params.row} setMonitorChange={setMonitorChange} />
                </strong>
            ),
        },
    ];

    const companiesColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nom', width: 160 },
        { field: 'siret', headerName: 'SIRET', width: 160 },
        { field: 'mail', headerName: 'Email', width: 160 },
        { field: 'city', headerName: 'Ville', width: 160 },
        { field: 'zip_code', headerName: 'Code postal', width: 160 },
        { field: 'phone_number', headerName: 'Téléphone', width: 160 },
        { field: 'is_active', headerName: 'Actif', width: 130 },
        { field: 'is_pending', headerName: 'En attente', width: 130 },
        { field: 'createdAt', headerName: 'Créé le', width: 160 },
        {
            field: 'actions', headerName: 'Actions', width: 500,
            renderCell: (params) => (
                <strong className={styles.container}>
                    <UpdateModal user={params.row} setMonitorChange={setMonitorChange} />
                    <DeleteModal user={params.row} setMonitorChange={setMonitorChange} />
                </strong>
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
                        }
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