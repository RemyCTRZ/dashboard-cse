import { DataGrid } from '@mui/x-data-grid';
import styles from '../styles/UsersList.module.css'
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { useState } from 'react';

export default function UsersList({ users }) {

    const [userList, setUserList] = useState()

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        // { field: 'lastName', headerName: 'Nom', width: 130 },
        // { field: 'firstName', headerName: 'Prénom', width: 130 },
        { field: 'mail', headerName: 'Email', width: 160 },
        { field: 'city', headerName: 'Ville', width: 160 },
        { field: 'zip_code', headerName: 'Code postal', width: 160 },
        { field: 'phone_number', headerName: 'Téléphone', width: 160 },
        { field: 'is_active', headerName: 'Actif', width: 130 },
        { field: 'is_pending', headerName: 'En attente', width: 130 },
        { field: 'role', headerName: 'Rôle', width: 130 },
        { field: 'createdAt', headerName: 'Créé le', width: 160 },
        {
            field: 'actions', headerName: 'Actions', width: 500,
            renderCell: (params) => (
                <strong className={styles.container}>
                    <UpdateModal user={params.row} />
                    <DeleteModal user={params.row} setUserList={setUserList} />
                </strong>
            ),
        },
    ];

    return (
        <>
            <DataGrid
                className={styles.list}
                rows={userList ? userList : users}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
            />
        </>
    );
}