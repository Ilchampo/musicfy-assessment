import { useEffect, useState } from 'react';
import { apiAlbum } from '../../data/api/apiCalls';

export const useAlbum = () => {
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAlbum = async () => {
        const { data } = await apiAlbum.get('/get');
        setAlbums(data.payload);
        setIsLoading(false);
    };
    useEffect(() => {
        getAlbum();
    }, []);

    return { albums, isLoading };
};
