import { connectDB, disconnectDB } from '../config/db.js';
import { Song } from '../models/Song.js';

const songs = [
  { title: 'Tizita', artist: 'Mahmoud Ahmed', album: 'Ere Mela Mela', genre: 'Ethio-Jazz', year: 1975 },
  { title: 'Belomi Benna', artist: 'Mahmoud Ahmed', album: 'Ere Mela Mela', genre: 'Ethio-Jazz', year: 1975 },
  { title: 'Yekermo Sew', artist: 'Mulatu Astatke', album: 'Mulatu of Ethiopia', genre: 'Ethio-Jazz', year: 1972 },
  { title: 'Yegelle Tezeta', artist: 'Mulatu Astatke', album: 'Mulatu of Ethiopia', genre: 'Ethio-Jazz', year: 1972 },
  { title: 'Almaz', artist: 'Aster Aweke', album: 'Aster', genre: 'Pop', year: 1989 },
  { title: 'Tchuhet', artist: 'Aster Aweke', album: 'Aster', genre: 'Pop', year: 1989 },
  { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', genre: 'Synth-pop', year: 2020 },
  { title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', genre: 'Synth-pop', year: 2020 },
  { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', genre: 'Rock', year: 1975 },
  { title: 'Love of My Life', artist: 'Queen', album: 'A Night at the Opera', genre: 'Rock', year: 1975 },
  { title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', genre: 'Grunge', year: 1991 },
  { title: 'Come as You Are', artist: 'Nirvana', album: 'Nevermind', genre: 'Grunge', year: 1991 },
];

async function seed(): Promise<void> {
  await connectDB();
  await Song.deleteMany({});
  const inserted = await Song.insertMany(songs);
  console.log(`Seeded ${inserted.length} songs`);
  await disconnectDB();
}

void seed();