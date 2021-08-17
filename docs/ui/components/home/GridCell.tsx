import { css, SerializedStyles, Theme } from '@emotion/react';
import { Interpolation } from '@emotion/serialize';
import { borderRadius, theme } from '@expo/styleguide';
import React, { PropsWithChildren } from 'react';
import { Col, ColProps } from 'react-grid-system';

type GridCellProps = ColProps & {
  style?: SerializedStyles | Interpolation<Theme>;
};

export const GridCell = ({
  children,
  md,
  style = gridCellDefaultStyle,
}: PropsWithChildren<GridCellProps>) => (
  <Col css={gridCellWrapperStyle} md={md}>
    <div css={[gridCellStyle, style]}>{children}</div>
  </Col>
);

const gridCellWrapperStyle = css`
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

const gridCellStyle = {
  borderRadius: borderRadius.large,
  margin: 16,
  padding: 16,
  minHeight: 200,
};

const gridCellDefaultStyle = {
  backgroundColor: theme.background.secondary,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.border.default,
};
