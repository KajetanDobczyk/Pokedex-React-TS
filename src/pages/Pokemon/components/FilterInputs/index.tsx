import { useContext } from "react";
import { Input, Select } from "@chakra-ui/react";

import { FilterParam, PokedexContext } from "context/PokedexContext";

import * as S from "./styles";

const FilterInputs = () => {
  const { filters, pokemonTypes } = useContext(PokedexContext);

  const handleInputChange =
    (filterParam: FilterParam) =>
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
      filters.updateFilterParam(filterParam, event.target.value);

  return (
    <S.FilterInputsWrapper direction={["column", "row"]} spacing={8}>
      <Input
        type="text"
        aria-label="name"
        value={filters.params.name}
        onChange={handleInputChange("name")}
        placeholder="Filter by name..."
      />
      <Select onChange={handleInputChange("type")} placeholder="Select type" aria-label="type">
        {pokemonTypes.data?.map((pokemonType) => (
          <option key={pokemonType}>{pokemonType}</option>
        ))}
      </Select>
    </S.FilterInputsWrapper>
  );
};

export default FilterInputs;
