import { Router } from 'express';
import * as AlbumController from '../Controllers/Album.controller';

const albumRouter = Router();

// @routes  GET /album/get
// @descri  Gets all the active albums from the database
// @params  {Id}: Album Id
// @access  Public
albumRouter.get('/get', AlbumController.GetAllAlbums);

// @routes  POST /album/create
// @descri  Creates a new album
// @params  None
// @access  Public
albumRouter.post('/create', AlbumController.CreateAlbum);

// @routes  GET /album/get/:id
// @descri  Gets a single album by id
// @params  {Id}: Album Id
// @access  Public
albumRouter.get('/get/:id', AlbumController.GetAlbumById);

// @routes  PUT /album/edit/:id
// @descri  Updates the fields of the album
// @params  {Id}: Album Id
// @access  Public
albumRouter.put('/edit/:id', AlbumController.EditAlbumById);

// @routes  PUT /album/delete/:id
// @descri  Updates the Deleted field to true
// @params  {Id}: Album Id
// @access  Public
albumRouter.put('/delete/:id', AlbumController.DeleteAlbumById);

export default albumRouter;
