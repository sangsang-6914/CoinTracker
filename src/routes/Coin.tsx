import { useQuery } from 'react-query'
import { Link, Route, Switch, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { fetchCoinInfo, fetchTikerInfo } from '../api/api'
import { Helmet } from 'react-helmet'
import Chart from './Chart'
import Price from './Price'

const Container = styled.div`
    max-width: 480px;
    margin: 0 auto;
    padding: 0 20px;
`

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    padding: 20px;
`
const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`

const OverView = styled.div`
    background-color: black;
    opacity: 0.5;
    border-radius: 10px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`

const OverViewItem = styled.div`
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.textColor};
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`
const Loader = styled.div`
    color: ${props => props.theme.textColor};
    font-size: 36pt;
`

const Description = styled.div`
    margin: 20px 0;
    color: ${props => props.theme.textColor};
`

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 20px 0px;
    a {
        display: block;
    }
`

const Tab = styled.span`
    background-color: rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: ${props => props.theme.textColor};
    padding: 7px 0px;
`

interface IParam {
    coinId: string;
}

interface RouteState {
    name: string;
}

interface ICoinInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: object;
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    }
}


function Coin() {
    const {coinId} = useParams<IParam>()
    const {state} = useLocation<RouteState>()
    const { isLoading: coinLoading, data: coinData } = useQuery<ICoinInfo>(['coin', coinId], () => fetchCoinInfo(coinId))
    const { isLoading: priceLoading, data: priceData } = useQuery<IPriceInfo>(['price', coinId], () => fetchTikerInfo(coinId))
    console.log(coinData)
    console.log(priceData)

    const isLoading = coinLoading || priceLoading

    return (
        <Container>
            <Helmet>
                <title>{coinData?.name}</title>
            </Helmet>
            <Header>
                <Title>{state?.name ? state.name : isLoading ? "loading..." : coinData?.name}</Title>
            </Header>
            { isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                <OverView>
                    <OverViewItem>
                        <span>Rank:</span>
                        <span>{coinData?.rank}</span>
                    </OverViewItem>
                    <OverViewItem>
                        <span>symbol:</span>
                        <span>{coinData?.symbol}</span>
                    </OverViewItem>
                    <OverViewItem>
                        <span>Price:</span>
                        <span>{priceData?.quotes.USD.price.toFixed(3)}</span>
                    </OverViewItem>
                </OverView>
                <Description>
                    {coinData?.description}
                </Description>
                <OverView>
                    <OverViewItem>
                        <span>total supply:</span>
                        <span>{priceData?.total_supply}</span>
                    </OverViewItem>
                    <OverViewItem>
                        <span>max supply:</span>
                        <span>{priceData?.max_supply}</span>
                    </OverViewItem>
                </OverView>
                <Tabs>
                    <Tab>
                        <Link to={`/${coinId}/chart`}>
                            Chart
                        </Link>
                    </Tab>
                    <Tab>
                        <Link to={`/${coinId}/price`}>
                            Price
                        </Link>
                    </Tab>
                </Tabs>
                <Switch>
                    <Route path={`/${coinId}/chart`}>
                        <Chart coinId={coinId}/>
                    </Route>
                    <Route path={`/${coinId}/price`}>
                        <Price />
                    </Route>
                </Switch>
                </>
            )}
        </Container>
    )
}

export default Coin