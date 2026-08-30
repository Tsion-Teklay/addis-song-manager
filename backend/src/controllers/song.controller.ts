import { NextFunction, Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { ISong, Song } from '../models/Song.js';
import { ApiError } from '../middleware/errorHandler.js';

interface ListQuery {
  page?: string;
  limit?: string;
  genre?: string;
  artist?: string;
  album?: string;
  search?: string;
  sort?: string;
}

function buildFilter(query: ListQuery): FilterQuery<ISong> {
  const filter: FilterQuery<ISong> = {};

  if (query.genre) filter.genre = query.genre;
  if (query.artist) filter.artist = query.artist;
  if (query.album) filter.album = query.album;

  if (query.search) {
    const rx = new RegExp(query.search.trim(), 'i');
    filter.$or = [{ title: rx }, { artist: rx }, { album: rx }, { genre: rx }];
  }

  return filter;
}

export async function listSongs(
  req: Request<unknown, unknown, unknown, ListQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(req.query.limit ?? 10)));
    const sort = req.query.sort ?? '-createdAt';
    const filter = buildFilter(req.query);

    const [items, total] = await Promise.all([
      Song.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit),
      Song.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (err) {
    next(err);
  }
}

export async function getSong(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) throw new ApiError(404, 'Song not found');
    res.json(song);
  } catch (err) {
    next(err);
  }
}

export async function createSong(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, artist, album, genre, year } = req.body as Partial<ISong>;
    const song = await Song.create({ title, artist, album, genre, year });
    res.status(201).json(song);
  } catch (err) {
    next(err);
  }
}

export async function updateSong(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = req.body as Partial<ISong>;
    const allowed = ['title', 'artist', 'album', 'genre', 'year'] as const;
    const update: Partial<ISong> = {};
    for (const key of allowed) {
      if (body[key] !== undefined) update[key] = body[key] as never;
    }

    const song = await Song.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!song) throw new ApiError(404, 'Song not found');
    res.json(song);
  } catch (err) {
    next(err);
  }
}

export async function deleteSong(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) throw new ApiError(404, 'Song not found');
    res.json({ id: req.params.id, message: 'Song deleted' });
  } catch (err) {
    next(err);
  }
}