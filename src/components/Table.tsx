import { useTable } from 'react-table'

interface TableProps {
    columns: Array<object>;
    data: Array<object>;
}

function Table({ columns, data }:TableProps) {
    console.log(columns)
    console.log(data)
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            // @ts-ignore
            columns,
            data
        }
    )
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>

        </table>
    )
}

export default Table