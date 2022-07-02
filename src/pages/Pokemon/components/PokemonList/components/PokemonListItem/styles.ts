import styled from "@emotion/styled";

export const PokemonListItemWrapper = styled.li`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  transition: backgound-color 0.2s;

  &:hover {
    background-color: #eee;
  }

  a {
    text-decoration: none;
    text-transform: capitalize;
    color: #000;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

export const PokemonName = styled.span`
  margin-left: 1rem;
`;
