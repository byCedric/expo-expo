import { css } from '@emotion/react';
import React from 'react';

import { TextAlign } from './Table.shared';

type CellProps = {
  children?: React.ReactNode;
  textAlign?: TextAlign;
};

export const Cell = ({ children, textAlign }: CellProps) => (
  <td css={css({ borderBottom: 0, verticalAlign: 'middle', textAlign })}>{children}</td>
);
