import { css } from '@emotion/react';
import React, { useCallback, useEffect, useState } from 'react';

import { TocLink } from './TocLink';

import { RemarkHeading } from '~/types/common';
import { LABEL, BOLD } from '~/ui/components/Text';
import { TocColumn } from '~/ui/containers/Document';

export type TocProps = {
  /** All headings exported from the `remark-export-headings` mdx-plugin */
  headings: RemarkHeading[];
  /** The scroll area that contains all headings */
  scrollRef: React.RefObject<any>;
  /** The maximum depth of headers to display (defaults to 3) */
  maxDepth?: number;
};

export const Toc = ({ headings, scrollRef, maxDepth = 3 }: TocProps) => {
  const [activeId, setActiveId] = useState();

  const observerableRoot = scrollRef.current?.contentRef?.current.scrollRef?.current;

  const onIntersectionObserverEntry = useCallback((entries: any[]) => {
    console.log(entries);
    entries.reverse().forEach(entry => {
      if (entry.intersectionRatio >= 1) {
        setActiveId(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    if (observerableRoot) {
      const links = observerableRoot.querySelectorAll(
        'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'
      );
      const observer = new IntersectionObserver(onIntersectionObserverEntry, {
        root: observerableRoot,
        rootMargin: '0px',
        threshold: 1.0,
      });

      links.forEach((link: any) => observer.observe(link));
    }
  }, [observerableRoot, onIntersectionObserverEntry]);

  return (
    <TocColumn>
      <nav css={containerStyle} aria-labelledby="toc-title">
        <LABEL>
          <BOLD>On this page</BOLD>
        </LABEL>
        <ul css={listStyle}>
          {headings.map(
            link =>
              link.depth <= maxDepth && (
                <li key={link.id}>
                  <TocLink
                    href={`#${link.id}`}
                    depth={link.depth - 1}
                    title={link.title}
                    isActive={link.id === activeId}>
                    {link.title}
                  </TocLink>
                </li>
              )
          )}
        </ul>
      </nav>
    </TocColumn>
  );
};

const containerStyle = css`
  padding: 3rem 2rem;
`;

const listStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;
