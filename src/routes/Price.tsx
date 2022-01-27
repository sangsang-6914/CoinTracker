import { useQuery } from "react-query"
import { fetchCoinHistory } from "../api/api"
import { useTable } from 'react-table'
import { useMemo } from "react"
import styled from "styled-components"

const Loader = styled.div`
    font-size: 24px;
`

interface PriceProps {
    coinId: string;
}

interface TableProps {
    columns: Array<object>;
    data: Array<object>;
}

function Price ({coinId}:PriceProps) {
    const { isLoading, data: priceData } = useQuery('price', () => fetchCoinHistory(coinId, 8))
    console.log(priceData)

    const columns = [
        {
            accessor: 'email',
            Header: 'Email',
        },
        {
            accessor: 'walletID',
            Header: 'Wallet ID',
        },
        {
            accessor: 'coin_list',
            Header: 'Wallet Balance',
        },
        {
            accessor: 'created_at',
            Header: 'Created At',
        },
        {
            accessor: 'edited_at',
            Header: 'Edited At',
        }
    ]
    const data = useMemo(() => [{
        "email": "이메일이에용",
        "walletID": "아이디에용",
        "created_at": "2021-08-03 01:14:47",
        "edited_at": "2021-08-03 01:15:49",
        "coin_list": ["TRV", "BTC", "BCH", "ETH"]
    }], [])

    const Table = ({ columns, data }:TableProps) => {
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ 
            // @ts-ignore 
            columns, 
            data
         })
    }

    return (
        <div>
            { isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <h1>Price</h1>
            )}
        </div>
    )
}

export default Price