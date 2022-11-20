import { Router } from 'express';
import * as SongController from '../Controllers/Song.controller';

const songRouter = Router();

// @routes  GET /song/get/:albumId
// @descri  Gets all songs from an album
// @params  {albumId}: Album Id
// @access  Public
songRouter.get('/get/:albumId', SongController.GetAllSongs);

// @routes  POST /create/:albumId
// @descri  Creates a new song
// @params  {albumId}: Album Id
// @access  Public
songRouter.post('/create', SongController.CreateSong);

// @routes  PUT /song/edit/:id
// @descri  Updates the fields of the song
// @params  {Id}: Song Id
// @access  Public
songRouter.put('/edit/:id', SongController.EditSongById);

// @routes  PUT /song/delete/:id
// @descri  Updates the Deleted field to true
// @params  {Id}: Song Id
// @access  Public
songRouter.put('/delete/:id', SongController.DeleteSongById);

export default songRouter;
