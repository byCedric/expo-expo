import { css } from '@emotion/react';
import { theme, borderRadius } from '@expo/styleguide';
import React from 'react';

type TableProps = {
  headers: string[];
  children: React.ReactNode;
};

export const Table = ({ children, headers = [] }: TableProps) => (
  <div css={tableWrapperStyle}>
    <table css={tableStyle}>
      {headers.length ? (
        <thead>
          <Row>
            {headers.map(header => (
              <th key={header} css={tableHeadersCellStyle}>
                {header}
              </th>
            ))}
          </Row>
        </thead>
      ) : null}
      <tbody>{children}</tbody>
    </table>
  </div>
);

type RowProps = {
  children: React.ReactNode;
};

export const Row = ({ children }: RowProps) => <tr css={tableRowStyle}>{children}</tr>;

type CellProps = {
  children: React.ReactNode;
};

export const Cell = ({ children }: CellProps) => <td css={css({ borderBottom: 0 })}>{children}</td>;

const tableWrapperStyle = css({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.border.default,
  borderRadius: borderRadius.large,
  overflow: 'hidden',
  marginBottom: '1rem',
});

const tableStyle = css({ border: 0, borderRadius: 0, marginBottom: 0, fontSize: 14 });

const tableRowStyle = css({
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: theme.border.default,
  '&:last-child': {
    borderWidth: 0,
  },
  '&:nth-child(2n)': {
    backgroundColor: theme.background.secondary,
  },
});

const tableHeadersCellStyle = css({
  color: theme.text.secondary,
  fontFamily: 'expo-brand-book',
  verticalAlign: 'middle',
});
