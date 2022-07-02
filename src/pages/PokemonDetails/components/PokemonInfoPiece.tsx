import styled from "@emotion/styled";

const PokemonInfoPieceWrapper = styled.div`
  margin: 1rem 0;
`;

type Props = {
  header: string;
  text: string;
};

const PokemonInfoPiece = ({ header, text }: Props) => (
  <PokemonInfoPieceWrapper>
    <h3>{header}:</h3>
    <p>{text}</p>
  </PokemonInfoPieceWrapper>
);

export default PokemonInfoPiece;
