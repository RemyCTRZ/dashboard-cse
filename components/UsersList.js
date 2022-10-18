import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styles from '../styles/UsersList.module.css'

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'lastName', headerName: 'Nom', width: 130 },
    { field: 'firstName', headerName: 'Prénom', width: 130 },
    { field: 'email', headerName: 'Email', width: 160 },
    { field: 'city', headerName: 'Ville', width: 160 },
    { field: 'createdAt', headerName: 'Créé le', width: 160 },
    { field: 'active', headerName: 'Actif', width: 130 },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'test@test.com' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'test@test.com' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: 'test@test.com' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'test@test.com' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'test@test.com' },
    { id: 6, lastName: 'Melisandre', firstName: 'Indiana', email: 'test@test.com' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: 'test@test.com' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', email: 'test@test.com' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 11, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 12, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 13, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 14, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', email: 'test@test.com' },
];

export default function UsersList() {
    return (
        <>
            <DataGrid
                className={styles.list}
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                checkboxSelection
            />
        </>
    );
}
