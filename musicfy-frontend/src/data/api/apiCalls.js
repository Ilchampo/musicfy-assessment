import axios from 'axios';

const baseApiURL = 'http://localhost:8080/';

export const apiAlbum = axios.create({
    baseURL: baseApiURL + 'album/',
});

export const apiSong = axios.create({
    baseURL: baseApiURL + 'song/',
});
