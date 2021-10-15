import { css } from '@emotion/react';
import { theme } from '@expo/styleguide';
import React, { PropsWithChildren } from 'react';

import { TextAlign } from '~/ui/components/Table/Table.shared';

type HeaderCellProps = {
  textAlign?: TextAlign;
};

export const HeaderCell = ({ children, textAlign }: PropsWithChildren<HeaderCellProps>) => (
  <th css={[tableHeadersCellStyle, textAlign && { textAlign }]}>{children}</th>
);

const tableHeadersCellStyle = css({
  color: theme.text.secondary,
  fontFamily: 'expo-brand-book',
  verticalAlign: 'middle',
});
