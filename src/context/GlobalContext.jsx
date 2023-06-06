import axios from 'axios'
import { useMemo, useState, useEffect, createContext, useContext} from 'react'

const GlobalContext = createContext();

const GlobalContextProvider = ({children})=>{

const [lalala, setCoins]       = useState([]);
const [trending, setTrending]  = useState([]);

const getData = ()=>{
    console.log("render lalala")

	let endpoints = [
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d`,
                'https://api.coingecko.com/api/v3/search/trending'
                ]
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
    .then(([{data: coins}, {data: trending}])=> {
      setCoins(coins)
      setTrending(trending.coins)
    });


}

useEffect(()=>{

  
  const timer = setTimeout(()=>{
    console.time()
    getData();
    console.timeEnd()
  }, 3000);

  return ()=> clearTimeout(timer);

  
    
  }, [])







	return(
		<GlobalContext.Provider value={{ lalala, setCoins, trending}}>
	        {children}
	    </GlobalContext.Provider>
		)
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}

export default GlobalContextProvider