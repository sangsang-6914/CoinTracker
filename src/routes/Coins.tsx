import { useQuery } from 'react-query'
import styled from 'styled-components'
import { fetchCoinsList } from '../api/api'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`

const CoinsList = styled.ul`
`

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        display: flex;
        padding: 20px;
        align-items: center;
        transition: color 0.2s ease-in;
        &:hover {
            color: ${props => props.theme.accentColor}
        }
    }
`

const Loader = styled.span`
    color: ${props => props.theme.textColor};
    font-size: 20pt;
`

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`

interface ICoinData {
    id: string;
    is_active: boolean;
    is_new: boolean;
    name: string;
    rank: number;
    symbol: string;
    type: string;
}

function Coins () {
    const { isLoading, data } = useQuery<ICoinData[]>('coins', fetchCoinsList)
    console.log(data)
    return (
        <Container>
            <Helmet>
                <title>Coin Bit</title>
            </Helmet>
            <Header>
                <Title>Coin Bit</Title>
            </Header>
            { isLoading ? <Loader>Loading...</Loader> :
                <CoinsList>
                    {data?.slice(0,100).map(coin => (
                        <Coin key={coin.id}>
                            <Link 
                                to={{
                                    pathname: `/${coin.id}`,
                                    state: {name: coin.name}
                                }}
                            >
                                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            }

        </Container>
    )
}

export default Coins