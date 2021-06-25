import React from 'react';

import { Link, LinkProps } from '~/ui/components/link';

type TocLinkProps = LinkProps;

export const TocLink = ({ ...rest }: TocLinkProps) => (
  <Link {...rest} />
);
