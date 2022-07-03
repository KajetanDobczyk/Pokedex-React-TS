import { Text } from "@chakra-ui/react";

import Message from "common/components/Message";

const NotFound = () => (
  <Message text="Browser is confused..." status="error">
    <Text>It Hurt Itself in Its Confusion!</Text>
    <Text>Page not found!</Text>
  </Message>
);

export default NotFound;
