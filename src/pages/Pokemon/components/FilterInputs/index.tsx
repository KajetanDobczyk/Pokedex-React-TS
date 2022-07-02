import { useContext } from "react";

import { FilterParam, PokedexContext } from "context/PokedexContext";

import * as S from "./styles";

const FilterInputs = () => {
  const { filterParams, pokemonTypes, updateFilterParam } = useContext(PokedexContext);

  const handleInputChange =
    (filterParam: FilterParam) =>
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
      updateFilterParam(filterParam, event.target.value);

  return (
    <S.FilterInputsWrapper>
      <S.Input
        value={filterParams.name}
        onChange={handleInputChange("name")}
        placeholder="Filter by name..."
      />
      Filter by type:
      <S.Select onChange={handleInputChange("type")} defaultValue="">
        <option value="">All</option>
        {pokemonTypes?.map((type) => (
          <option key={type.name}>
            <span>{type.name}</span>
          </option>
        ))}
      </S.Select>
    </S.FilterInputsWrapper>
  );
};

export default FilterInputs;
