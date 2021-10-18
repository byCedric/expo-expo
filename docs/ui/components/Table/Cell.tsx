import { css } from '@emotion/react';
import React, { PropsWithChildren } from 'react';

import { TextAlign } from './Table.shared';

type CellProps = {
  textAlign?: TextAlign;
};

export const Cell = ({ children, textAlign }: PropsWithChildren<CellProps>) => (
  <td css={css({ borderBottom: 0, verticalAlign: 'middle', wordBreak: 'break-word', textAlign })}>
    {children}
  </td>
);
