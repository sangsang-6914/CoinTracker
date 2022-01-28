import { useQuery } from 'react-query'
import styled from 'styled-components'
import { fetchCoinsList } from '../api/api'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isDarkMode } from '../state/atoms'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'

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
    text-align: center;
`

const Title = styled.h1`
    flex: 3;
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`

const CoinsList = styled.ul`
`

const Coin = styled.li`
    background-color: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.textColor};
    color: ${props => props.theme.textColor};
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
    font-size: 24px;
`

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`

const Text = styled.div`
    margin-top: 4px;
`

const PreIcon = styled.div`
    flex: 1;
`

const ModeIcon = styled.div`
    flex: 1;
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
    const darkMode = useRecoilValue(isDarkMode)
    const setMode = useSetRecoilState(isDarkMode)
    const changeMode = () => {
        setMode(current => !current)
    }
    const { isLoading, data } = useQuery<ICoinData[]>('coins', fetchCoinsList)
    return (
        <Container>
            <Helmet>
                <title>Coin Bit</title>
            </Helmet>
            <Header>
                <PreIcon />
                <Title>Coin Bit</Title>
                <ModeIcon>
                {
                    darkMode ? (
                        <MdOutlineLightMode 
                            onClick={changeMode} 
                            size={35}
                        />
                    ) : (
                        <MdOutlineDarkMode 
                            onClick={changeMode}
                            size={35}
                        />
                    )
                }
                </ModeIcon>
            </Header>
            { isLoading ? <Loader>Loading...</Loader> :
                <CoinsList>
                    {data?.slice(0,100).map(coin => (
                        <Coin key={coin.id}>
                            <Link 
                                to={{
                                    pathname: `/${coin.id}/chart`,
                                    state: {name: coin.name}
                                }}
                            >
                                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                <Text>
                                    {coin.name} &rarr;
                                </Text>
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            }

        </Container>
    )
}

export default Coins