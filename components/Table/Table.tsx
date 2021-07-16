/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';
// import { data } from '../../mockData';
import { useTable, usePagination, useFlexLayout, useBlockLayout, Row } from 'react-table';
import { useSticky } from 'react-table-sticky';
import styles from './Table.module.scss';
import ReactPaginate from 'react-paginate';
import ReactTooltip from 'react-tooltip';
import Image from 'next/image'
import gold from '../../public/goldCup.png';
import silver from '../../public/silverCup.png';
import bronze from '../../public/bronzeCup.png';
import { useMediaQuery } from 'react-responsive'
import firebase from "firebase";

const Table = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 768px)'
  })
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    ReactTooltip.rebuild();
    const dbRef = firebase.database().ref();
    dbRef.child("sites").orderByChild('overallScore').get().then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  const unMemoizedData = Object.entries(data).map((site) => site[1]);
  const tableData = React.useMemo(() => unMemoizedData, [data]);

  console.log(`tableData`, tableData)

  const InfoIcon = ({tip}: {tip: string}) => (
    <svg data-tip={tip} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0.499979C3.5888 0.499979 0 4.08878 0 8.49998C0 12.9112 3.5888 16.5 8 16.5C12.4112 16.5 16 12.9112 16 8.49998C16 4.08878 12.4112 0.499979 8 0.499979ZM8 14.9C4.4712 14.9 1.6 12.0288 1.6 8.49998C1.6 4.97118 4.4712 2.09998 8 2.09998C11.5288 2.09998 14.4 4.97118 14.4 8.49998C14.4 12.0288 11.5288 14.9 8 14.9Z" fill="#617E8C"/>
      <path d="M7 7.49998H9V13.5H7V7.49998ZM7 3.49998H9V5.49998H7V3.49998Z" fill="#617E8C"/>
    </svg>
  )

  const overallHeader = <div className={styles.headerTip}><p>Overall</p><InfoIcon tip="Overall score" /></div>;
  const psiHeader = <div className={styles.headerTip}><p>PSI</p><InfoIcon tip="Pagespeed insights" /></div>;
  const utyHeader = <div className={styles.headerTip}><p>Uty</p><InfoIcon tip="Usability" /></div>;
  const cmsHeader = <div className={styles.headerTip}><p>CMS</p><InfoIcon tip="Content management system" /></div>;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Rank',
        id: 'index',
        sticky: 'left',
        accessor: (_row: any, i : number) => i + 1
      },
      {
        Header: 'Fund',
        accessor: 'name',
        sticky: 'left',
        Cell: ({row}) => (<a className={styles.link} href={row.original.url} target="_blank" rel="noreferrer">{console.log('row' ,row)}{row.original.name}</a>)
      },
      {
        Header: overallHeader,
        accessor: 'overallScore',
      },
      {
        Header: psiHeader,
        accessor: 'psiScoreOverall',
      },
      {
        Header: utyHeader,
        accessor: 'usabilityScore',
      },
      {
        Header: cmsHeader,
        accessor: 'cms',
      },
    ],
    []
  )

  const tableInstance = useTable({ columns, data: tableData }, usePagination, useSticky);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    state: { pageIndex},
  } = tableInstance

  return (
    <div>
      <ReactTooltip className="custom-tooltip" arrowColor="#617E8C" />
      <div className={styles.tableWrapper}>
        <table cellSpacing="0" className={styles.table} {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: Row<object>, index: number) => {
              if (index === 0 && pageIndex === 0 ) {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: { getCellProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableDataCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>; render: (arg0: string) => {} | null | undefined; }, index: number) => {
                      if(index === 0) {
                        return (
                          <td {...cell.getCellProps()} className={styles.tableImage}>
                              <Image src={gold} alt="gold" />
                            <span className={styles.textWrapper}>
                            {cell.render('Cell')}
                            </span>
                          </td>
                        )
                      }
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              }
              if (index === 1  && pageIndex === 0 ) {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: { getCellProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableDataCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>; render: (arg0: string) => {} | null | undefined; }, index: number) => {
                      if(index === 0) {
                        return (
                          <td {...cell.getCellProps()} className={styles.tableImage}>
                            <Image src={silver} alt="silver" />
                            <span className={styles.textWrapper}>
                            {cell.render('Cell')}
                            </span>
                          </td>
                        )
                      }
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              }
              if (index === 2  && pageIndex === 0 ) {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: { getCellProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableDataCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>; render: (arg0: string) => {} | null | undefined; }, index: number) => {
                      if(index === 0) {
                        return (
                          <td {...cell.getCellProps()} className={styles.tableImage}>
                            <Image src={bronze} alt="bronze" />
                            <span className={styles.textWrapper}>
                            {cell.render('Cell')}
                            </span>
                          </td>
                        )
                      }
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              }
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: { getCellProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableDataCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>; render: (arg0: string) => boolean | React.ReactFragment | React.ReactChild | React.ReactPortal | null | undefined; }) => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div>
      <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={isDesktopOrLaptop ? 6 : 2}
          onPageChange={(prop) => {
            console.log(`prop`, prop)
            gotoPage(prop.selected);
          }}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  )
}

export default Table;
