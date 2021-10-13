import { css } from '@emotion/react';
import { colors } from '@expo/styleguide';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  // meta: {
  // name: keyof typeof Metatags.Copy;
  // pageName?: string;
  // user?: ProfileUser;
  // project?: App;
  // };
  // disableGraphQL?: boolean;
  // preloadInterBlack?: boolean;
}>;

export function Document({ children }: Props) {
  return <div css={containerStyle}>{children}</div>;
}

const containerStyle = css({
  background: colors.white,
  minHeight: '100vh',
});
