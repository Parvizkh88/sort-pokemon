import { useState,useMemo} from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import { PokemonCard } from "../common/PokemonCard"

const Container = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
  padding: 25px 300px;
  grid-template-columns: auto;
  grid-gap: 1rem;
`;

const CardsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 340px);
  grid-gap: 1rem;
  justify-content: center;
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto 100px;
  grid-gap: 1rem;
  justify-content: center;
`;

const Filter = styled.input`
  font-size: 23px;
`;
const Sort= styled.select`
    margin-left: 20px;
    width: 100px;
    height: 40px;
    font-size: 16pt;
`;
const Options = styled.option`

`;

export function Overview({ data }) {
  console.log('DATA in overview', data);
  const history = useHistory();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('no sort');

  // const filteredPokemons = useMemo(() => (
  //   data.filter((pokemon) => pokemon.name.includes(filter.toLowerCase()))
  // ), [filter, data])
  const namePokemons = data.map((pokemon) => pokemon.name).sort()
  console.log(namePokemons);
  
  const sortedPokemons = useMemo(() => (
     data.map((pokemon,index) => pokemon.name === namePokemons[index] )
   // namePokemons.map(item => item)
  ), [sort, data])

  const handleCardClick = (id) => {
    history.push(`/${id}`);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const handleSortChange = (e) => {
    setSort(e.target.value);

  }

  return (
    <Container>
    
      <FiltersContainer>
        <Filter
          type="text"
          placeholder="Filter pokemons here"
          value={filter}
          onChange={handleFilterChange}
        />

        
      <Sort value={sort} onChange={handleSortChange}>
          <Options value="no sort">no sort</Options>
          <Options value="ASC">ASC</Options>
          <Options value="DESC">DESC</Options>
      </Sort>
      </FiltersContainer>


      <CardsWrapper>
     
        { sort === "ASC" 
          
          ? sortedPokemons.sort().map(({ name, url, price }) => (
            <PokemonCard
              key={name}
              name={name}
              price={price}
              image={`https://pokeres.bastionbot.org/images/pokemon/${
                url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
              }.png`}
              click={() => handleCardClick(url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''))}
            />
          ))
          : ""
        }
      </CardsWrapper>
    </Container>
  );
}
