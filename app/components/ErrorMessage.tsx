import { Text } from '@radix-ui/themes';
import { PropsWithChildren, ReactNode } from 'react';

// interface Props {
//   children: ReactNode;
// }

function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) {
    return null;
  }

  return (
    <Text as='p' color='red'>
      {children}
    </Text>
  );
}
export default ErrorMessage;
