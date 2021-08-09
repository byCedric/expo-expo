import { css, SerializedStyles } from '@emotion/react';
import { borderRadius, theme } from '@expo/styleguide';
import React from 'react';
import { Col } from 'react-grid-system';

type GridCellProps = {
  children: any;
  style: SerializedStyles;
  [props: string]: any;
};

export const GridCell = ({ children, style, md }: GridCellProps) => (
  <Col css={gridCellWrapperStyle} md={md}>
    <div css={[gridCellStyle, style, !style && gridCellDefaultStyle]}>{children}</div>
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
