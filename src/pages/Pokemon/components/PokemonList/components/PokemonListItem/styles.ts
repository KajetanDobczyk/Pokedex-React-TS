import styled from "@emotion/styled";

export const PokemonListItemWrapper = styled.li`
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  transition: backgound-color 0.2s;

  &:hover {
    background-color: #eee;
  }

  a {
    padding: 1rem;
    text-decoration: none;
    text-transform: capitalize;
    color: #000;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

export const Sprite = styled.img`
  max-width: 200px;
  height: auto;
`;

export const Name = styled.span`
  margin-left: 1rem;
`;
