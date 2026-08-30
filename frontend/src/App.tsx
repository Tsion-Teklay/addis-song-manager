import { useEffect, type JSX } from 'react';
import { SongFilters } from './components/SongFilters';
import { SongForm } from './components/SongForm';
import { SongList } from './components/SongList';
import { StatsPanel } from './components/StatsPanel';
import { Box, Flex } from './components/ui/Box';
import { Heading, Text } from './components/ui/Text';
import { fetchFacetsRequest, fetchSongsRequest } from './features/songs/songsSlice';
import { fetchStatsRequest } from './features/stats/statsSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.songs.filters);

  useEffect(() => {
    dispatch(fetchFacetsRequest());
    dispatch(fetchStatsRequest());
  }, [dispatch]);

  // Re-fetches whenever a filter or the page changes - the saga handles the request.
  useEffect(() => {
    dispatch(fetchSongsRequest(filters));
  }, [dispatch, filters]);

  return (
    <Box maxWidth="1120px" mx="auto" px={4} py={6}>
      <Flex justifyContent="space-between" alignItems="baseline" mb={5} flexWrap="wrap">
        <Box>
          <Heading fontSize={6}>Song Manager</Heading>
        </Box>
      </Flex>

      <SongFilters />
      <SongList />

      <Box mt={7}>
        <StatsPanel />
      </Box>

      <SongForm />
    </Box>
  );
}