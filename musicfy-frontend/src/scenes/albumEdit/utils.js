import { apiAlbum } from '../../data/api/apiCalls';

export const handleFormSubmit = async (values, id, navigate) => {
    await apiAlbum.put(`/edit/${id}`, values);
    navigate('/album');
};
