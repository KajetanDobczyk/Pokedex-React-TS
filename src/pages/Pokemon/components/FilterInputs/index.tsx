import { useContext } from "react";

import { FilterParam, PokedexContext } from "context/PokedexContext";

import * as S from "./styles";

const FilterInputs = () => {
  const { filters, pokemonTypes } = useContext(PokedexContext);

  const handleInputChange =
    (filterParam: FilterParam) =>
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
      filters.updateFilterParam(filterParam, event.target.value);

  return (
    <S.FilterInputsWrapper>
      <S.Input
        type="text"
        aria-label="name"
        value={filters.params.name}
        onChange={handleInputChange("name")}
        placeholder="Filter by name..."
      />
      Filter by type:
      <S.Select onChange={handleInputChange("type")} defaultValue="" aria-label="type">
        <option value="">All</option>
        {pokemonTypes.data?.map((pokemonType) => (
          <option key={pokemonType}>{pokemonType}</option>
        ))}
      </S.Select>
    </S.FilterInputsWrapper>
  );
};

export default FilterInputs;
