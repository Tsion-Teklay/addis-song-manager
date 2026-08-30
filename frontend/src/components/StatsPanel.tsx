import styled from '@emotion/styled';
import type { JSX } from 'react';
import { useAppSelector } from '../store/hooks';
import { Box, Flex, Grid } from './ui/Box';
import { Card } from './ui/Card';
import { Heading, Text } from './ui/Text';

const Bar = styled.div<{ ratio: number }>`
  height: 6px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primary};
  width: ${({ ratio }) => Math.max(4, ratio * 100)}%;
  transition: width 200ms ease;
`;

interface StatRow {
  label: string;
  sub?: string;
  value: number;
}

function StatList({ title, rows }: { title: string; rows: StatRow[] }): JSX.Element {
  const max = rows.reduce((acc, row) => Math.max(acc, row.value), 0) || 1;

  return (
    <Card>
      <Text color="muted" fontSize={0} mb={3} style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
        {title}
      </Text>
      <Grid style={{ gap: 12 }}>
        {rows.slice(0, 6).map((row) => (
          <Box key={`${row.label}-${row.sub ?? ''}`}>
            <Flex justifyContent="space-between" mb={1}>
              <Text fontSize={1}>
                {row.label}
                {row.sub ? ` · ${row.sub}` : ''}
              </Text>
              <Text fontSize={1} color="muted">
                {row.value}
              </Text>
            </Flex>
            <Bar ratio={row.value / max} />
          </Box>
        ))}
        {rows.length === 0 && (
          <Text color="muted" fontSize={1}>
            No data yet.
          </Text>
        )}
      </Grid>
    </Card>
  );
}

function TotalCard({ label, value }: { label: string; value: number }): JSX.Element {
  return (
    <Card>
      <Text color="muted" fontSize={0} style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
        {label}
      </Text>
      <Heading fontSize={5} mt={2}>
        {value}
      </Heading>
    </Card>
  );
}

export function StatsPanel(): JSX.Element {
  const { data, loading, error } = useAppSelector((state) => state.stats);

  if (error) {
    return (
      <Card>
        <Text color="danger">{error}</Text>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <Text color="muted">{loading ? 'Loading statistics…' : 'No statistics available.'}</Text>
      </Card>
    );
  }

  return (
    <Box>
      <Heading fontSize={4} mb={4}>
        Statistics
      </Heading>

      <Grid
        mb={4}
        style={{ gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}
      >
        <TotalCard label="Songs" value={data.totals.totalSongs} />
        <TotalCard label="Artists" value={data.totals.totalArtists} />
        <TotalCard label="Albums" value={data.totals.totalAlbums} />
        <TotalCard label="Genres" value={data.totals.totalGenres} />
      </Grid>

      <Grid style={{ gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <StatList
          title="Songs per genre"
          rows={data.songsByGenre.map((item) => ({ label: item.genre, value: item.songs }))}
        />
        <StatList
          title="Songs per artist"
          rows={data.songsByArtist.map((item) => ({
            label: item.artist,
            sub: `${item.albums} album${item.albums === 1 ? '' : 's'}`,
            value: item.songs,
          }))}
        />
        <StatList
          title="Songs per album"
          rows={data.songsByAlbum.map((item) => ({
            label: item.album,
            sub: item.artist,
            value: item.songs,
          }))}
        />
      </Grid>
    </Box>
  );
}