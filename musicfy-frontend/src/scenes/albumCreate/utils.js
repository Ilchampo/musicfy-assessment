import { apiAlbum } from '../../data/api/apiCalls';

export const handleFormSubmit = async (values, navigate) => {
    let resp = await apiAlbum.post('/create', values);

    if (resp.status === 400) {
        alert('Maximum albums limit reached');
        return;
    }
    navigate('/album');
};
