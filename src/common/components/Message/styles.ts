import styled from "@emotion/styled";
import { Alert } from "@chakra-ui/react";

export const MessageWrapper = styled.div`
  padding: 2rem;
`;

export const StyledAlert = styled(Alert)`
  & + * {
    margin-top: 2rem;
  }
`;
