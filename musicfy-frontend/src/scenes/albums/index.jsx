import { Avatar, Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useAlbum } from './utils';
import { useNavigate } from 'react-router-dom';

const Albums = () => {
    const { albums } = useAlbum();
    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0.5,
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'artist',
            headerName: 'Artist',
            flex: 1,
        },
        {
            field: 'year',
            headerName: 'Year',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'imageUrl',
            headerName: 'Image',
            flex: 1,
            renderCell: (params) => <Avatar src={params.row.imageUrl} variant='rounded' />,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1,
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            flex: 1,
        },
        {
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => {
                return (
                    <strong>
                        <Button
                            variant='contained'
                            color='primary'
                            size='small'
                            style={{ marginLeft: 16 }}
                            onClick={() => {
                                navigate(`/album/edit/${params.row.id}`);
                            }}>
                            Edit
                        </Button>
                        <Button variant='contained' color='secondary' size='small' style={{ marginLeft: 16 }}>
                            Delete
                        </Button>
                    </strong>
                );
            },
        },
    ];

    return (
        <Box m='20px'>
            <Header title='ALBUMS' subtitle='List of existing albums' />
            <Box
                m='40px 0 0 0'
                height='75vh'
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300],
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400],
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiCheckbox-root': {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`,
                    },
                }}>
                <DataGrid rows={albums} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
};

export default Albums;
