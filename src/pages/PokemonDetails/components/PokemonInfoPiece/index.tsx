import * as S from "./styles";

type Props = {
  header: string;
  text: string;
};

const PokemonInfoPiece = ({ header, text }: Props) => (
  <S.PokemonInfoPieceWrapper>
    <h3>{header}:</h3>
    <p>{text}</p>
  </S.PokemonInfoPieceWrapper>
);

export default PokemonInfoPiece;
