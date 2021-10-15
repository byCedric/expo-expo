import { css } from '@emotion/react';
import { borderRadius, theme, darkTheme } from '@expo/styleguide';
import React, { PropsWithChildren } from 'react';

type SnippetContentProps = PropsWithChildren<{
  alwaysDark?: boolean;
  hideOverflow?: boolean;
}>;

export const SnippetContent = ({
  children,
  alwaysDark = false,
  hideOverflow = false,
}: SnippetContentProps) => (
  <div css={[contentStyle, alwaysDark && contentDarkStyle, hideOverflow && contentHideOverflow]}>
    {children}
  </div>
);

const contentStyle = css`
  background-color: ${theme.background.secondary};
  border: 1px solid ${theme.border.default};
  border-bottom-left-radius: ${borderRadius.medium}px;
  border-bottom-right-radius: ${borderRadius.medium}px;
  padding: 1rem;
  overflow-x: auto;

  code {
    padding-left: 0;
    padding-right: 0;
  }
`;

const contentDarkStyle = css`
  background-color: ${darkTheme.background.secondary};
  border-color: transparent;
  white-space: nowrap;
`;

const contentHideOverflow = css`
  overflow: hidden;

  code {
    white-space: nowrap;
  }
`;
