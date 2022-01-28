import { useQuery } from "react-query"
import { fetchCoinHistory } from "../api/api"
import { useMemo } from "react"
import styled from "styled-components"
import Table from "../components/Table"
import { inputNumberFormat } from "../utils/CommonUtil"

const Loader = styled.div`
    font-size: 24px;
`

const Styles = styled.div`
    table {
        width: 100%;
        border: 1px solid rgba(0,0,0,0.9);
        display: block;
        border-radius: 15px;
    }

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
        border-bottom: 1px solid rgba(0,0,0,0.9);

        :first-child {
            text-align: center;
        }

        :last-child {
            border-right: 1;
        }
    }
    td {
        :nth-child(2) {
            color: #FA5858;
        }
        :nth-child(3) {
            color: #2E64FE;
        }
        :nth-child(n+2) {
            text-align: center;
        }
        font-size: 14px;
    }
    th {
        font-size: 14px;
        font-weight: bold;
        color: #A9D0F5;
        padding: 10px;
    }
    th:nth-of-type(1), td:nth-of-type(1) {
        width: 100px;
    }
    th:nth-of-type(2), td:nth-of-type(2) {
        width: 100px;
    }
    th:nth-of-type(3), td:nth-of-type(3) {
        width: 100px;
    }
    th:nth-of-type(4), td:nth-of-type(4) {
        width: 140px;
    }

    tbody {
        display: block;
        height: 45vh;
        overflow-y: auto;
    }
`

interface PriceProps {
    coinId: string;
}

interface IPriceData {
    close: number;
    high: number;
    low: number;
    market_cap: number;
    open: number;
    time_close: string;
    time_open: string;
    volume: number;
}

function Price ({coinId}:PriceProps) {
    const { isLoading, data: priceData } = useQuery<IPriceData[]>('price', () => fetchCoinHistory(coinId, 8))
    const EXCHANGE_WON = 1207

    const priceArray = priceData?.map(p => (p.close * EXCHANGE_WON).toFixed(0))
    const dayToDayArray = priceArray?.map((p, i, array) => {
        if (i === 0) {
            return '1.45'
        }
        const curPrice = Number(p)
        const beforePrice = Number(array[i-1])

        const gap = curPrice - beforePrice

        return (gap / beforePrice * 100).toFixed(2)
    })

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

    const data = useMemo(() => priceData?.map((p, i) => ({
        day: new Date(Date.parse(p.time_open)).toLocaleDateString().replaceAll('.', '-').replace(/ /g, "").slice(0, -1),
        closePrice: inputNumberFormat((p.close * EXCHANGE_WON).toFixed(0)),
        mirrorPrice: dayToDayArray !== undefined ? `${dayToDayArray[i]} %` : null,
        volume: inputNumberFormat(String(p.volume))
    })).reverse(), [dayToDayArray, priceData]) 

    return (
        <div>
            { isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <Styles>
                    <Table 
                        columns={columns} 
                        // @ts-ignore
                        data={data}/>
                </Styles>
            )}
        </div>
    )
}

export default Price