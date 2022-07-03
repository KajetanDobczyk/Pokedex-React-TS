import { StatLabel, StatNumber } from "@chakra-ui/react";

import * as S from "./styles";

type Props = {
  label: string;
  text: string;
};

const PokemonInfoPiece = ({ label, text }: Props) => (
  <S.PokemonInfoPieceWrapper>
    <StatLabel>{label}</StatLabel>
    <StatNumber>{text}</StatNumber>
  </S.PokemonInfoPieceWrapper>
);

export default PokemonInfoPiece;
