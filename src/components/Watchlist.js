// src/components/Watchlist.js
// TODO:
// To make this component fully functional and integrated with the rest of the application, you would need to:

// Implement real data fetching from your backend API.
// Add pagination or infinite scrolling for handling large datasets.
// Implement filtering and search functionality.
// Add click handlers to show more detailed information about each event.
// Implement real-time updates for the watchlist data.

import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import styled from 'styled-components';

const TableWrapper = styled.div`
  margin-bottom: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const RiskLevel = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  color: white;
  background-color: ${props => {
    switch (props.level.toLowerCase()) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#757575';
    }
  }};
`;

const Watchlist = ({ onCompanySelect }) => {
  const data = useMemo(
    () => [
      {
        company: 'TechCorp',
        news: 'Factory shutdown due to power outage',
        affectedItem: 'Microchips',
        predictedEffect: '2-week delay in production',
        riskLevel: 'High',
      },
      {
        company: 'GlobalShip Inc.',
        news: 'New shipping route opened',
        affectedItem: 'Ocean Freight',
        predictedEffect: '10% reduction in shipping time',
        riskLevel: 'Low',
      },
      {
        company: 'RawMaterials Co.',
        news: 'Price increase in rare earth metals',
        affectedItem: 'Electronic Components',
        predictedEffect: '5% increase in component cost',
        riskLevel: 'Medium',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'Company', accessor: 'company' },
      { Header: 'News', accessor: 'news' },
      { Header: 'Affected Item/Component', accessor: 'affectedItem' },
      { Header: 'Predicted Effect', accessor: 'predictedEffect' },
      {
        Header: 'Risk Level',
        accessor: 'riskLevel',
        Cell: ({ value }) => <RiskLevel level={value}>{value}</RiskLevel>,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <TableWrapper>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => onCompanySelect(row.original.company)}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default Watchlist;