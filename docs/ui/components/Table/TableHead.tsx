import React from 'react';

import { HeaderCell } from './HeaderCell';
import { Row } from './Row';
import { TextAlign } from './Table.shared';

type TableHeadProps = {
  headers: string[];
  headersAlign?: TextAlign[];
};

export const TableHead = ({ headers, headersAlign }: TableHeadProps) => (
  <thead>
    <Row>
      {headers.map((header, i) => (
        <HeaderCell key={i} textAlign={(headersAlign && headersAlign[i]) || TextAlign.Left}>
          {header}
        </HeaderCell>
      ))}
    </Row>
  </thead>
);
