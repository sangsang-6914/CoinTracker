import { useQuery } from "react-query"
import { fetchCoinHistory } from "../api/api"
import { useMemo } from "react"
import styled from "styled-components"
import Table from "../components/Table"

const Loader = styled.div`
    font-size: 24px;
`

const Styles = styled.div`
    border-spacing: 0;
    border: 1px solid black;

    tr {
        :last-child {
            td {
                border-bottom: 0;
            }
        }
    }

    th,
    td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
            border-right: 0;
        }
    }
`

interface PriceProps {
    coinId: string;
}

function Price ({coinId}:PriceProps) {
    const { isLoading, data: priceData } = useQuery('price', () => fetchCoinHistory(coinId, 8))

    const columns = useMemo(
        () => [
            {
                Header: '일자',
                accessor: 'day'
            },
            {
                Header: '종가(KRW)',
                accessor: 'closePrice'
            },
            {
                Header: '전일대비',
                accessor: 'mirrorPrice'
            },
            {
                Header: '거래량',
                accessor: 'volume'
            }
        ],
        []
      )

      const data = useMemo(() => Array(24)
      .fill(0)
      .map(() => ({
          day: '2022-01-27',
          closePrice: '48000',
          mirrorPrice: '4.56(%)',
          volume: '1123333'
      })), []) 


    // const Table = ({ columns, data }:TableProps) => {
    //     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ 
    //         // @ts-ignore 
    //         columns, 
    //         data
    //      })
    // }

    return (
        <div>
            { isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <Styles>
                    <Table columns={columns} data={data}/>
                </Styles>
            )}
        </div>
    )
}

export default Price