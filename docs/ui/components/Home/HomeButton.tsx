import React from 'react';

import { Button, ButtonProps } from '~/ui/components/Button';

export const HomeButton = ({ children, style, ...rest }: ButtonProps) => (
  <Button
    {...rest}
    style={{
      ...style,
      fontSize: 15,
      height: 36,
      position: 'absolute',
      bottom: 20,
    }}>
    {children}
  </Button>
);
