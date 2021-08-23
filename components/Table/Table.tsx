/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';
// import { data } from '../../mockData';
import { useTable, usePagination, useFlexLayout, useBlockLayout, Row } from 'react-table';
import { useSticky } from 'react-table-sticky';
import styles from './Table.module.scss';
import ReactTooltip from 'react-tooltip';
import Image from 'next/image'
import gold from '../../public/goldCup.png';
import silver from '../../public/silverCup.png';
import bronze from '../../public/bronzeCup.png';
import { useMediaQuery } from 'react-responsive'
import firebase from "firebase";
import dynamic from 'next/dynamic'
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton';

const ReactPaginate = dynamic(() => import('react-paginate'))

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "observer-vc.firebaseapp.com",
  databaseURL: "https://observer-vc-default-rtdb.firebaseio.com",
  projectId: "observer-vc",
  storageBucket: "observer-vc.appspot.com",
  messagingSenderId: "847143738715",
  appId: "1:847143738715:web:390e594dd9305e816f4e7e",
  measurementId: "G-6DDSLZG269"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const Table = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 768px)'
  })
  const [data, setData] = React.useState([]);
  const [isTableLoaded, setIsTableLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    ReactTooltip.rebuild();
    const dbRef = firebase.database().ref();
    dbRef.child("sites").orderByChild("overallScore").limitToLast(10).get().then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        console.log(`snapshot.val()`, snapshot.val());
        setIsTableLoaded(true)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  React.useEffect(() => {
    if(isTableLoaded) {
      const dbRef = firebase.database().ref();
      dbRef.child("sites").orderByChild("overallScore").limitToLast(100).get().then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          setIsTableLoaded(false)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [isTableLoaded])

  const tableData = React.useMemo(() => Object.entries(data).map((site) => site[1]).sort((a: {overallScore: number}, b: {overallScore: number})=> b.overallScore - a.overallScore), [data]);

  const InfoIcon = ({tip}: {tip: string}) => (
    <svg data-tip={tip} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0.499979C3.5888 0.499979 0 4.08878 0 8.49998C0 12.9112 3.5888 16.5 8 16.5C12.4112 16.5 16 12.9112 16 8.49998C16 4.08878 12.4112 0.499979 8 0.499979ZM8 14.9C4.4712 14.9 1.6 12.0288 1.6 8.49998C1.6 4.97118 4.4712 2.09998 8 2.09998C11.5288 2.09998 14.4 4.97118 14.4 8.49998C14.4 12.0288 11.5288 14.9 8 14.9Z" fill="#617E8C"/>
      <path d="M7 7.49998H9V13.5H7V7.49998ZM7 3.49998H9V5.49998H7V3.49998Z" fill="#617E8C"/>
    </svg>
  )

  const overallHeader = <div className={styles.headerTip}><p>Overall</p><InfoIcon tip="Overall Score" /></div>;
  const psiHeader = <div className={styles.headerTip}><p>PSI</p><InfoIcon tip="Page Speed Insights" /></div>;
  const utyHeader = <div className={styles.headerTip}><p>Uty</p><InfoIcon tip="Usability" /></div>;
  const cmsHeader = <div className={styles.headerTip}><p>CMS</p><InfoIcon tip="Content Management System" /></div>;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Rank',
        id: 'index',
        sticky: 'left',
        accessor: (_row: any, i : number) => i + 1,
      },
      {
        Header: 'Fund',
        accessor: 'name',
        sticky: 'left',
        Cell: ({row} : any) => (<a className={styles.link} href={row.original.url} target="_blank" rel="noreferrer">{row.original.name}</a>)
      },
      {
        Header: overallHeader,
        accessor: 'overallScore',
        Cell: ({row} : any) => (<p>{row.original.overallScore ? Number(row.original.overallScore).toFixed(2) : ''}</p>)
      },
      {
        Header: psiHeader,
        accessor: 'psiScoreOverall',
        Cell: ({row} : any) => (<p>{row.original.psiScoreOverall ? Number(row.original.psiScoreOverall).toFixed(2) : ''}</p>)
      },
      {
        Header: utyHeader,
        accessor: 'usabilityScore',
        Cell: ({row} : any) => (<p>{row.original.usabilityScore ? Number(row.original.usabilityScore).toFixed(2) : ''}</p>)
      },
      {
        Header: cmsHeader,
        accessor: 'cms',
        width: 300,
        Cell: ({row} : any) => (<p style={{marginRight: '10px', textAlign: 'center'}}>{console.log(row.original)}{row.original.cmsShort}</p>)
      },
    ],
    []
  );

  const onPageChange = (pageNumber: number) => {
    if (pageNumber === pageCount - 1) {
      const dbRef = firebase.database().ref();
      dbRef.child("sites")
        .orderByChild("overallScore")
        //@ts-ignore
        .endBefore(data[Object.keys(data)[Object.keys(data).length - 2].toString()].overallScore, Object.keys(data)[Object.keys(data).length - 2].toString())
        .limitToLast(100)
        .get()
        .then((snapshot) => {
        if (snapshot.exists()) {
          setData({...data, ...snapshot.val()});
          gotoPage(pageNumber)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    } else {
      gotoPage(pageNumber);
    }
  }

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
    <div className={styles.wrapper}>
      <ReactTooltip className="custom-tooltip" arrowColor="#617E8C" />
      <div className={styles.tableWrapper}>
        <table cellSpacing="0" className={styles.table} style={{marginBottom: !(tableData.length > 0) ? '650px' : '0'}} {...getTableProps()}>
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

          {!(tableData?.length > 0) && (
            <div className={styles.tableLoader}>
              <SkeletonTheme color="#13242d" highlightColor="#376882">
                <Skeleton count={10} width={'100%'} />
              </SkeletonTheme>
            </div>
          )}
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
      {tableData.length  > 0 && (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={isDesktopOrLaptop ? 6 : 2}
            onPageChange={(prop) => {
              onPageChange(prop.selected);
            }}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
      )}
      </div>
    </div>
  )
}

export default Table;
