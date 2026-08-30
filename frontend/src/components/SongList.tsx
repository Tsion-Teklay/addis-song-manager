import styled from '@emotion/styled';
import type { JSX } from 'react';
import { deleteSongRequest, openForm, setPage } from '../features/songs/songsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { Song } from '../types/song';
import { Flex } from './ui/Box';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Text } from './ui/Text';

const Table = styled.table`
  width: 100%;
  font-size: 14px;

  th {
    text-align: left;
    padding: 10px 12px;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 500;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    white-space: nowrap;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    vertical-align: middle;
  }

  tr:last-of-type td {
    border-bottom: none;
  }
`;

const GenreTag = styled.span`
  display: inline-block;
  padding: 2px 10px;
  font-size: 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.primary};
`;

export function SongList(): JSX.Element {
  const dispatch = useAppDispatch();
  const { items, loading, error, page, totalPages, total } = useAppSelector(
    (state) => state.songs,
  );

  const handleDelete = (song: Song): void => {
    if (window.confirm(`Delete "${song.title}"?`)) {
      dispatch(deleteSongRequest(song.id));
    }
  };

  return (
    <Card>
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Text fontWeight="bold" fontSize={2}>
          Songs ({total})
        </Text>
        {loading && (
          <Text fontSize={0} color="muted">
            Loading…
          </Text>
        )}
      </Flex>

      {error && (
        <Text color="danger" mb={3} fontSize={1}>
          {error}
        </Text>
      )}

      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Year</th>
            <th aria-label="actions" />
          </tr>
        </thead>
        <tbody>
          {items.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>
                <GenreTag>{song.genre}</GenreTag>
              </td>
              <td>{song.year ?? '—'}</td>
              <td>
                <Flex justifyContent="flex-end" style={{ gap: 8 }}>
                  <Button variant="ghost" type="button" onClick={() => dispatch(openForm(song))}>
                    Edit
                  </Button>
                  <Button variant="danger" type="button" onClick={() => handleDelete(song)}>
                    Delete
                  </Button>
                </Flex>
              </td>
            </tr>
          ))}
          {!loading && items.length === 0 && (
            <tr>
              <td colSpan={6}>
                <Text color="muted" py={3}>
                  No songs match the current filters.
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Button
          variant="ghost"
          type="button"
          disabled={page <= 1}
          onClick={() => dispatch(setPage(page - 1))}
        >
          ← Prev
        </Button>
        <Text fontSize={0} color="muted">
          Page {page} of {totalPages}
        </Text>
        <Button
          variant="ghost"
          type="button"
          disabled={page >= totalPages}
          onClick={() => dispatch(setPage(page + 1))}
        >
          Next →
        </Button>
      </Flex>
    </Card>
  );
}