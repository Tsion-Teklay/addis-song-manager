import styled from '@emotion/styled';
import { useEffect, useState, type FormEvent, type JSX } from 'react';
import {
  closeForm,
  createSongRequest,
  updateSongRequest,
} from '../features/songs/songsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { SongInput } from '../types/song';
import { Box, Flex, Grid } from './ui/Box';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Heading, Label, Text } from './ui/Text';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 10;
`;

const Dialog = styled.form`
  width: 100%;
  max-width: 480px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 24px;
`;

const emptyForm: SongInput = { title: '', artist: '', album: '', genre: '', year: undefined };

export function SongForm(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const { isFormOpen, editing, saving, error } = useAppSelector((state) => state.songs);
  const [form, setForm] = useState<SongInput>(emptyForm);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        artist: editing.artist,
        album: editing.album,
        genre: editing.genre,
        year: editing.year,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editing, isFormOpen]);

  if (!isFormOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (editing) {
      dispatch(updateSongRequest({ id: editing.id, data: form }));
    } else {
      dispatch(createSongRequest(form));
    }
  };

  const field = (key: keyof SongInput, label: string, required = true): JSX.Element => (
    <Box>
      <Label mb={1} color="muted">
        {label}
      </Label>
      <Input
        required={required}
        type={key === 'year' ? 'number' : 'text'}
        value={form[key] ?? ''}
        onChange={(event) =>
          setForm((prev) => ({
            ...prev,
            [key]: key === 'year' ? Number(event.target.value) || undefined : event.target.value,
          }))
        }
      />
    </Box>
  );

  return (
    <Overlay onClick={() => dispatch(closeForm())}>
      <Dialog onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
        <Heading fontSize={4} mb={4}>
          {editing ? 'Edit song' : 'Add a new song'}
        </Heading>

        <Grid style={{ gap: 12 }}>
          {field('title', 'Title')}
          {field('artist', 'Artist')}
          {field('album', 'Album')}
          {field('genre', 'Genre')}
          {field('year', 'Year (optional)', false)}
        </Grid>

        {error && (
          <Text color="danger" fontSize={1} mt={3}>
            {error}
          </Text>
        )}

        <Flex justifyContent="flex-end" mt={5} style={{ gap: 8 }}>
          <Button variant="ghost" type="button" onClick={() => dispatch(closeForm())}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Create song'}
          </Button>
        </Flex>
      </Dialog>
    </Overlay>
  );
}