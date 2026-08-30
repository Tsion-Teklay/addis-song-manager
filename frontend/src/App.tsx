import { useEffect, type JSX } from 'react';
import { SongList } from './components/SongList';
import { Box } from './components/ui/Box';
import { Heading, Text } from './components/ui/Text';
import { fetchSongsRequest } from './features/songs/songsSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.songs.filters);

  // Re-fetches whenever a filter or the page changes - the saga handles the request.
  useEffect(() => {
    dispatch(fetchSongsRequest(filters));
  }, [dispatch, filters]);

  return (
    <Box maxWidth="1120px" mx="auto" px={4} py={6}>
      <Heading fontSize={6}>Song Manager</Heading>
      <Text color="muted" mt={1} mb={5}>
        MERN test project - Express + MongoDB API, React + Redux-Saga client
      </Text>

      <SongList />
    </Box>
  );
}