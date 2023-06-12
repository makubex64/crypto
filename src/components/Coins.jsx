import {useLoaderData, useNavigate, ScrollRestoration } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import {useGlobalContext} from '../context/GlobalContext'
import {useDarkModeContext} from '../context/ThemeContext'
import {useState, useEffect} from 'react'
import './Style.css'

 
const Coins = ()=>{

const navigate = useNavigate();
const {lalala, trending} = useGlobalContext();
const {theme} =    useDarkModeContext();
const [chatWidth, setChatWidth] = useState(undefined);
const [sidebarTop, setSidebarTop] = useState(undefined);

useEffect(() => {
    const chatEl = document.querySelector('.sidebar').getBoundingClientRect();
    setChatWidth(chatEl.width);
    setSidebarTop(chatEl.top);

    if (!sidebarTop) return;
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };

  }, [sidebarTop]);



  const isSticky = (e) => {
    const chatEl = document.querySelector('.sidebar');
    const scrollTop = window.scrollY;
    if (scrollTop >= sidebarTop - 10) {
      chatEl.classList.add('is-sticky');
    } else {
      chatEl.classList.remove('is-sticky');
    }
  };

	
const titles = [
	 						'#', 
	 						'', 
	 						'Coin', 
	 						'Price', 
	 						'1h', 
	 						'24h', 
	 						'7d', 
	 						'24h Volume', 
	 						'Mkt Cap',
	 						
	 			];

const styles = {

	tableTRBorder :{
		  borderBottom: theme === "Light" ? " 1px solid #313F4A" : null,

	}
}

	return(

		<>

		<div className="mt-5 row">

		<ScrollRestoration />

		<h5 className="fw-bold">Trending Coins</h5>

			{
				trending?.map(({item})=>{
					return(
					<div key={item?.id} className=" col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 col-xxl-4"> {/*col-6 col-md-6 col-lg-3 col-xl-2*/}
						<div  className={`${theme === "Light" ? "background-dark" : null} card my-4`}  style={{width: "22rem", height:"6rem"}}>
						  <div className="card-body " >

						  	<div className="d-flex">
						  	<img className="me-2" style={{width:"2rem", height:"2rem"}} src={item?.small} alt={item?.thumb} />
						  	<p> {item.name} </p>

						  	<p className="position-absolute end-0 me-3 badge bg-info">Rank : {item.market_cap_rank} </p>	
						  	</div>

						  	
						  	<p><img style={{width:20}} src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579" alt="/" />
							 <span className="mx-2">{item.price_btc.toFixed(15)}</span> 
							 </p>	
						  	
						  	
						  	
						    
						  
						  </div>
						</div>
					</div>
						)
				})
			}
			
		</div>
		
		<h4 className="fw-bold">Cryptocurrency Prices by Market Cap</h4>
		

		<table className="table mt-5">
			<thead className={`${theme === "Light" ? "background-dark": "bg-white"} sidebar`}  >
			
				<tr style={styles.tableTRBorder} >

					{
						titles.map((item,id) =>(
							<th key={id} scope="col">
								<span  >{item}</span>  
							</th>
							))
					}
				</tr>
			</thead>

			<tbody className={`${theme === "Light" ? "text-white" : null } `} >

			{
				lalala.map((item,id) => { 


					return(


					<tr style={styles.tableTRBorder} className={`${theme === "Light" ? "list-hover-dark" : "list-hover-light" }`} key={item.id} >
					
						<td> {id + 1} </td>
						<td> <img style={{width:20}} className="" src={item?.image} alt={item?.image}/> </td>					
						
						<td 
						style={{cursor: "pointer"}} 
						onClick={() => navigate(`/coinId/${item.id}`)} >

						{item?.name} {" "}
						 
						<span className=" text-uppercase">{item?.symbol}</span> 
						</td>
						
						<td> {item?.current_price} {" $"} </td>

						<td className={item?.price_change_percentage_1h_in_currency > 0 ? " text-success" : "text-danger"}> 
						{
							item?.price_change_percentage_1h_in_currency === null |
							item?.price_change_percentage_1h_in_currency === undefined ? "--"
							:  item?.price_change_percentage_1h_in_currency?.toFixed(2)
						} % 
						</td>

						<td className={item?.price_change_percentage_24h_in_currency > 0 ? "text-success" : "text-danger"}> 
						{item?.price_change_percentage_24h_in_currency?.toFixed(2)} % 
						</td>

						<td className={item?.price_change_percentage_7d_in_currency > 0 ? "text-success" : "text-danger"}> 
						{item?.price_change_percentage_7d_in_currency?.toFixed(2)} % 
						</td>

						

						<td >{item?.total_volume?.toLocaleString()} </td>
						<td> {item?.market_cap?.toLocaleString()} </td>

					

					</tr>
					)})
			}

				
			</tbody>
		</table> 

	

		</>
	)
}
export default Coins

