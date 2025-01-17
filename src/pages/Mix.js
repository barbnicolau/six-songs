import { useState } from 'react';
import styled from 'styled-components';
import CardSong from '../components/CardSong';

const testData = [
  {
    id: 1,
    title: 'Gasoline',
    artist: 'The Weeknd',
    cover:
      'https://images.genius.com/f15065ef66cd717c267d3f2e37313bc1.300x300x1.jpg',
  },
  {
    id: 2,
    title: 'Murder on the Dancefloor',
    artist: 'Sophie Ellis-Bextor',
    cover:
      'https://images.genius.com/5c60e500c2fee0bb00b23d68d92feaa6.300x300x1.jpg',
  },
  {
    id: 3,
    title: 'Flor de Lis',
    artist: 'Djavan',
    cover:
      'https://images.genius.com/ebddef4931e5380d7ba8fb7aa598f98b.300x300x1.jpg',
  },
  {
    id: 4,
    title: 'SAOKO',
    artist: 'ROSALÍA',
    cover:
      'https://images.genius.com/d10cb78671f6e0fc1c257e5c95b9d4d1.300x300x1.jpg',
  },
  {
    id: 5,
    title: 'L.E.S. Artistes',
    artist: 'Santigold',
    cover:
      'https://images.genius.com/a4e71e062f28f73bed6144244b187163.300x300x1.png',
  },
  {
    id: 6,
    title:
      'Medley Lud Session - Modo Avião / A Tua Voz / 700 por Hora / Radar / A Música Mais Triste do Ano',
    artist: 'LUDMILLA & Gloria Groove',
    cover:
      'https://images.genius.com/2578775d3363e98151f725aee8267c8c.300x300x1.png',
  },
];

const Wrapper = styled.div`
  padding: 40px 60px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 20vh 80vh;
  grid-gap: 16px;
  min-height: 100vh;

  & h1 {
    grid-column: 1 / span 12;
  }

  & .search {
    grid-column: 1 / span 5;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  & .selected {
    grid-column: 6 / span 7;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export default function Mix() {
  const [searchResults, setSearchResults] = useState(testData);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const handleSelectSong = (id) => {
    const selected = searchResults.find((song) => song.id === id);
    const selectedIndex = searchResults.findIndex((song) => song.id === id);
    searchResults[selectedIndex].selected = true;
    setSelectedSongs([...selectedSongs, selected]);
  };

  const handleRemoveSong = (id) => {
    const selected = selectedSongs.filter((song) => song.id !== id);
    const selectedIndex = searchResults.findIndex((song) => song.id === id);
    searchResults[selectedIndex].selected = false;
    setSelectedSongs([...selected]);
  };

  const handleMoveUp = (id) => {
    const selected = selectedSongs.find((song) => song.id === id);
    const selectedIndex = selectedSongs.findIndex((song) => song.id === id);
    selectedSongs.splice(selectedIndex, 1);
    selectedSongs.splice(selectedIndex - 1, 0, selected);
    setSelectedSongs([...selectedSongs]);
  };

  const handleMoveDown = (id) => {
    const selected = selectedSongs.find((song) => song.id === id);
    const selectedIndex = selectedSongs.findIndex((song) => song.id === id);
    selectedSongs.splice(selectedIndex, 1);
    selectedSongs.splice(selectedIndex + 1, 0, selected);
    setSelectedSongs([...selectedSongs]);
  };

  console.log(selectedSongs);

  return (
    <Wrapper>
      <h1>This is the mix creation page!</h1>
      <div className="search">
        {searchResults.map(({ id, title, artist, cover, selected }) => {
          return (
            <CardSong
              key={id}
              id={id}
              title={title}
              artist={artist}
              cover={cover}
              handleSelect={selected ? false : handleSelectSong}
              selected={selected}
            />
          );
        })}
      </div>
      <div className="selected">
        {selectedSongs.map(({ id, title, artist, cover }, index) => {
          return (
            <CardSong
              key={id}
              id={id}
              isFirst={index === 0}
              isLast={index === selectedSongs.length - 1}
              title={title}
              artist={artist}
              cover={cover}
              handleRemove={handleRemoveSong}
              handleMoveUp={handleMoveUp}
              handleMoveDown={handleMoveDown}
            />
          );
        })}
      </div>
    </Wrapper>
  );
}
