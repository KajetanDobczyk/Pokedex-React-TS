import { AlertIcon, AlertStatus } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import * as S from "./styles";

type Props = {
  text: string;
  status?: AlertStatus;
};

const Message = ({ children, text, status }: PropsWithChildren & Props) => (
  <S.MessageWrapper>
    <S.StyledAlert status={status}>
      <AlertIcon />
      {text}
    </S.StyledAlert>
    {children}
  </S.MessageWrapper>
);

export default Message;
