import type { ChangeEvent, JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { openForm, setFilters } from '../features/songs/songsSlice';
import { Button } from './ui/Button';
import { Flex, Box } from './ui/Box';
import { Input, Select } from './ui/Input';
import { Label } from './ui/Text';

export function SongFilters(): JSX.Element {
  const dispatch = useAppDispatch();
  const { filters, facets } = useAppSelector((state) => state.songs);

  const handleChange =
    (key: 'genre' | 'artist' | 'search') =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch(setFilters({ [key]: event.target.value }));
    };

  return (
    <Flex flexWrap="wrap" alignItems="flex-end" mb={4} style={{ gap: 12 }}>
      <Box flex="1 1 220px">
        <Label mb={1} color="muted">
          Search
        </Label>
        <Input
          placeholder="Title, artist or album"
          value={filters.search ?? ''}
          onChange={handleChange('search')}
        />
      </Box>

      <Box flex="0 1 180px">
        <Label mb={1} color="muted">
          Genre
        </Label>
        <Select value={filters.genre ?? ''} onChange={handleChange('genre')}>
          <option value="">All genres</option>
          {facets.genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Select>
      </Box>

      <Box flex="0 1 180px">
        <Label mb={1} color="muted">
          Artist
        </Label>
        <Select value={filters.artist ?? ''} onChange={handleChange('artist')}>
          <option value="">All artists</option>
          {facets.artists.map((artist) => (
            <option key={artist} value={artist}>
              {artist}
            </option>
          ))}
        </Select>
      </Box>

      <Button type="button" onClick={() => dispatch(openForm(null))}>
        + Add song
      </Button>
    </Flex>
  );
}