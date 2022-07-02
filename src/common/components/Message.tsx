import styled from "@emotion/styled";

const StyledMessage = styled.h2`
  display: block;
  padding: 2rem;
`;

type Props = {
  text: string;
};

const Message = ({ text }: Props) => <StyledMessage>{text}</StyledMessage>;

export default Message;
