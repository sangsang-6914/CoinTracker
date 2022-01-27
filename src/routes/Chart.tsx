import ApexChart from 'react-apexcharts'
import { useQuery } from 'react-query'
import { fetchCoinHistory } from '../api/api'

interface IProps {
    coinId: string;
}

interface IPriceProps {
    close: number;
    high: number;
    low: number;
    market_cap: number;
    open: number;
    time_close: string;
    time_open: string;
    volume: number;
}

function Chart ({coinId}:IProps) {
    const { data, isLoading } = useQuery<IPriceProps[]>('history', () => fetchCoinHistory(coinId))
    console.log(data)
    console.log(data?.map(p => ({
        x: new Date(p.time_open),
        y: [p.open.toFixed(1), p.high.toFixed(1), p.low.toFixed(1), p.close.toFixed(1)]
    })))
    return (
        <div>
            <ApexChart 
                type="candlestick"
                series={[
                    {
                        name: "Price",
                        data: data?.map(p => ({
                            x: new Date(p.time_open),
                            y: [p.open.toFixed(2), p.high.toFixed(2), p.low.toFixed(2), p.close.toFixed(2)]
                        }))
                    },
                ]}
                options={{
                    stroke: {
                        width: 1
                    },
                    chart: {
                        type: 'candlestick',
                        height: 350,
                        toolbar: {
                            show: false,
                        }
                    },
                    xaxis: {
                        type: 'datetime',
                        labels: {
                            style: {
                                colors: 'white'
                            }
                        },
                    },
                    yaxis: {
                        tooltip: {
                            enabled: true
                        },
                        labels: {
                            style: {
                                colors: 'white'
                            },
                            formatter: (val) => `${val} ($)`
                        }
                    },
                    tooltip: {
                        enabled: false
                    },
                }}
            />
        </div>
    )
}

export default Chart