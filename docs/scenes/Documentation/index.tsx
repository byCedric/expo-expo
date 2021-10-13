import React, { PropsWithChildren } from 'react';

import { Header } from './components/Header';

import { PageMetadata, RemarkHeading } from '~/types/common';
import { Document } from '~/ui/components/Document';
import { Navigation } from '~/ui/containers/Navigation';

type Props = PropsWithChildren<{
  metadata: PageMetadata;
  headings: RemarkHeading[];
}>;

export const DocumentationScene = ({ metadata, headings }: Props) => (
  <Document>
    <Navigation />
    <Header title={metadata.title || ''} description={metadata.description} />
  </Document>
);
