import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

interface GenresContextData {
  // children: ReactNode;
  genres: GenreResponseProps[];
  selectedGenreId: number;
  setGenres: (genres: GenreResponseProps[]) => void;
  setSelectedGenreId: (id: number) => void;
  handleClickButton: (id: number) => void;
}

interface GenresProviderProps {
  children: ReactNode;
  genres: GenreResponseProps[];
  selectedGenreId: number;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export const GenresContext = createContext({} as GenresContextData);

export function GenresContextProvider({
  children,
  ...rest
}: GenresProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenresContext.Provider
      value={{
        genres,
        setGenres,
        selectedGenreId,
        setSelectedGenreId,
        handleClickButton,
      }}
    >
      {children}
    </GenresContext.Provider>
  );
}
