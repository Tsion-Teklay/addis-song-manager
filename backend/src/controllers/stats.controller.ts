import { NextFunction, Request, Response } from 'express';
import { Song } from '../models/Song.js';

export async function getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [result] = await Song.aggregate([
      {
        $facet: {
          totals: [
            {
              $group: {
                _id: null,
                totalSongs: { $sum: 1 },
                artists: { $addToSet: '$artist' },
                albums: { $addToSet: '$album' },
                genres: { $addToSet: '$genre' },
              },
            },
            {
              $project: {
                _id: 0,
                totalSongs: 1,
                totalArtists: { $size: '$artists' },
                totalAlbums: { $size: '$albums' },
                totalGenres: { $size: '$genres' },
              },
            },
          ],
          songsByGenre: [
            { $group: { _id: '$genre', songs: { $sum: 1 } } },
            { $project: { _id: 0, genre: '$_id', songs: 1 } },
            { $sort: { songs: -1, genre: 1 } },
          ],
          songsByArtist: [
            {
              $group: {
                _id: '$artist',
                songs: { $sum: 1 },
                albums: { $addToSet: '$album' },
              },
            },
            {
              $project: {
                _id: 0,
                artist: '$_id',
                songs: 1,
                albums: { $size: '$albums' },
              },
            },
            { $sort: { songs: -1, artist: 1 } },
          ],
          songsByAlbum: [
            {
              $group: {
                _id: { album: '$album', artist: '$artist' },
                songs: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                album: '$_id.album',
                artist: '$_id.artist',
                songs: 1,
              },
            },
            { $sort: { songs: -1, album: 1 } },
          ],
          genresByArtist: [
            { $group: { _id: '$artist', genres: { $addToSet: '$genre' } } },
            {
              $project: {
                _id: 0,
                artist: '$_id',
                genres: 1,
                totalGenres: { $size: '$genres' },
              },
            },
            { $sort: { totalGenres: -1, artist: 1 } },
          ],
        },
      },
    ]);

    const totals = result.totals[0] ?? {
      totalSongs: 0,
      totalArtists: 0,
      totalAlbums: 0,
      totalGenres: 0,
    };

    res.json({
      totals,
      songsByGenre: result.songsByGenre,
      songsByArtist: result.songsByArtist,
      songsByAlbum: result.songsByAlbum,
      genresByArtist: result.genresByArtist,
    });
  } catch (err) {
    next(err);
  }
}

export async function getFacets(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [genres, artists, albums] = await Promise.all([
      Song.distinct('genre'),
      Song.distinct('artist'),
      Song.distinct('album'),
    ]);
    res.json({ genres: genres.sort(), artists: artists.sort(), albums: albums.sort() });
  } catch (err) {
    next(err);
  }
}