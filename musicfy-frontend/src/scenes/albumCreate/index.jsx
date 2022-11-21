import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { handleFormSubmit } from './utils';
import { useNavigate } from 'react-router-dom';

const CreateAlbum = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate();

    return (
        <Box m='20px'>
            <Header title='CREATE ALBUM' subtitle='Create a New Album' />

            <Formik
                onSubmit={(fields) => {
                    handleFormSubmit(fields, navigate);
                }}
                initialValues={initialValues}
                validationSchema={checkoutSchema}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display='grid'
                            gap='30px'
                            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                            sx={{
                                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                            }}>
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label='Album Name'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name='name'
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: 'span 2' }}
                            />
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label='Artist Name'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.artist}
                                name='artist'
                                error={!!touched.artist && !!errors.artist}
                                helperText={touched.artist && errors.artist}
                                sx={{ gridColumn: 'span 2' }}
                            />
                            <TextField
                                fullWidth
                                variant='filled'
                                type='number'
                                label='Album Year'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.year}
                                name='year'
                                error={!!touched.year && !!errors.year}
                                helperText={touched.year && errors.year}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label='Image Url'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.imageUrl}
                                name='imageUrl'
                                error={!!touched.imageUrl && !!errors.imageUrl}
                                helperText={touched.imageUrl && errors.imageUrl}
                                sx={{ gridColumn: 'span 4' }}
                            />
                        </Box>
                        <Box display='flex' justifyContent='end' mt='20px'>
                            <Button type='submit' color='secondary' variant='contained'>
                                Create New Album
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    name: yup.string().required('This field is required'),
    artist: yup.string().required('This field is required'),
    year: yup
        .number()
        .required('This field is required')
        .min(2010, 'The minimum year is 2010')
        .max(2021, 'The maximum year is 2021'),
    imageUrl: yup.string().required('This field is required'),
});

const initialValues = {
    name: '',
    artist: '',
    year: '',
    imageUrl: '',
};

export default CreateAlbum;
