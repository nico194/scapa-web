import { Table as TableUI, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

export const Table = ({ thead, tbody }) => {
  const tableHead = thead.map((head, index) => (
    <TableCell key={index}>
      {head}
    </TableCell>
  ));
  return (
    <TableUI className='table'>
      <TableHead>
        <TableRow>{tableHead}</TableRow>
      </TableHead>
      <TableBody>{tbody}</TableBody>
    </TableUI>
  );
};
