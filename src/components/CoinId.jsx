import {useLoaderData, useParams, Link, useNavigate, ScrollRestoration   } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  
);

import {useState, useEffect} from 'react'
import {useDarkModeContext} from '../context/ThemeContext'


const CoinId = ()=>{
const {id}                 = useParams();
const navigate             = useNavigate();

const [lalala, setData]     = useState([]);
const [chart, setChart]     = useState([]);

const {theme} =    useDarkModeContext();








useEffect(()=>{		
		axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
				 .then(res=>{
				 	setData(res.data)
				 	 
				 })
		
}, [id]);

 useEffect(()=>{
 		
 		const chartDay = "market_chart?vs_currency=usd&days=1"
    const urlCoinGecko = `https://api.coingecko.com/api/v3/coins/${id}/${chartDay}`;
  	axios.get(urlCoinGecko)
  		   .then(res=>{
  		   	setChart(res.data)
  		   	
  		   })
  	  
 
 		
 },[id]);



	 
	 
   const coinChartData = chart?.prices?.map((value)=>({
   	 						x: value[0],
   	 						y: value[1]
   	 						
   	})).slice(260)
 
 // const loadindPro = <div class="spinner-grow" role="status">
 // 									  <span class="visually-hidden">Loading...</span>
 // 									</div>
 // 
 // 
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,

 // Modify the axis by adding scales
  scales: {
    // to remove the labels
    x: {
      ticks: {
        display: false,
      },

      // to remove the x-axis grid
      grid: {
        drawBorder: true,
        display: true,
      },
    },
    // to remove the y-axis labels
    y: {
      ticks: {
        display: true,
        beginAtZero: true,
      },
      // to remove the y-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
    
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart / ' + id,
      },
    },
  };
  
  
  const data ={
  	 	labels: coinChartData?.map(value=> moment(value.x ).calendar()) ,
  	 	datasets: [
  	 		{
  	 			fill: true,
  	 			label: id,
  	 			data:  coinChartData?.map(value => value.y),
  	 			backgroundColor: "rgba(75,192,192,0.2)",
        	borderColor: "rgba(75,192,192,1)"
  	 		}
  	 	]
  	 }
 
 	 


	return(

		<>
		
		<div className="coin-id py-5">
		<ScrollRestoration />

		<div 
		style={{cursor: "pointer", color: "rgba(75,192,192,1)"}}
		onClick={() => navigate(`/`)} 
		className="d-inline   fw-bold">
		Cryptocurrencies  {" "}
		</div>

    <div className="d-inline  opacity-50 fw-bold">
    
		{ lalala?.name	} {" Prices "}	
						
    </div>
		

		
		
			<div className="row mt-5">

			
			


			<div className="col-9">
			<p><span className="badge bg-dark">Rank # {lalala?.market_cap_rank}</span> </p>

			<div className="d-flex align-items-center">
				<img className="mb-2 me-3" src={lalala?.image?.thumb} alt=""/> 

				<h5 className="fw-bold"> {lalala?.name} <span className="text-uppercase text-secondary"> {lalala?.symbol} </span> </h5>
			</div>

			<div className="">
				<h4 className="fw-bold"> {lalala?.market_data?.current_price?.usd} 
				{" "}
				Usd$ {" "}
				<span className={lalala?.market_data?.price_change_percentage_24h > 0 ? "green-up" : "text-danger"} >
				{lalala?.market_data?.price_change_percentage_24h.toFixed(2) } 
				%</span> 
				</h4>

			</div>
				
			</div>

			<div className="col-md-3">
				<h5>Info</h5>
				<div className="">

					<span className="opacity-75" style={{paddingRight: "20px" ,}} >Website</span>

					<div className="btn-group ">
						<Link 
					style={{textDecoration: "none", color: "inherit", height: "22px"}} 
					className="badge bg-dark text-white float-sm-start"
					target="_blank"
					type="button" 
					to={lalala?.links?.homepage[0]}>
					{	

						(()=>{

							const result1 = lalala?.links?.homepage[0]
							.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
							
							// console.log(result1) 

							return(
								result1
								)

							
							

						})()
					}
					</Link>
					</div>
					

				</div>

				<div className="">
					<span className="opacity-75" style={{paddingRight: "10px" ,}}> Explorers </span>

					<div className="btn-group ">
					  <Link 
					  style={{height: "25px"}} 
					  target="_blank" 
					  to={lalala?.links?.blockchain_site[0]} 
					  className="btn btn-secondary btn-sm badge bg-dark" 
					  type="button">
					  {lalala?.links?.blockchain_site[0].split('.')[0].replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}
					  </Link>

					  <button style={{height: "25px"}} type="button" className="  bg-dark btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
					    <span style={{height: "25px"}} className="visually-hidden">Toggle Dropdown</span>
					  </button>

					  <ul className="dropdown-menu bg-dark">
					    {
					    	lalala?.links?.blockchain_site.map((item,id, array)=>{
								const res = item.split('.')[0]
																.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");


					    	

					    		return(
					    			<li className="ms-2" key={id}>
					    				<Link
					    				style={{textDecoration: "none", color: "inherit"}}
					    				className="text-white"
					    				target="_blank" 
					    				to={item}> 
					    				<span className="fw-bold" style={{width: "100%"}} >{res} </span>
					    				</Link>
					    			</li>
					    			)
					    	})
					    }
					  </ul>
					</div>				
				</div>

				

			</div>

			


			</div>


		
		<div className="row mt-5"> 
			<div style={{ position: "relative", height: "100%", width: "100%" }}>
				<Line options={options} data={data} />
			</div>
		</div>

		


		 



		</div>

			<div className="mt-5  ">

			<h4>Market Stats</h4>

				<div className="row row-cols-6 me-5 container-fluid">

					<div className={` me-2 col card shadow ${theme === "dark" ? " background-dark" : null } `} style={{width: "12rem"}}>
					  <div className="card-body">
					    <p className="card-title">Price Change (24h)</p>
					    <p className={`card-text ${lalala.market_data?.price_change_percentage_24h > 0 ? "text-success" : "text-danger"} `} >{lalala.market_data?.price_change_percentage_24h?.toFixed(2)} %</p>
					  </div>
					</div>

					<div className={`me-2 col card shadow ${theme === "dark" ? " background-dark" : null } `} style={{width: "12rem"}}>
					  <div className="card-body">
					    <p className="card-title">Price Change (7d)</p>
					    <p className={`card-text ${lalala.market_data?.price_change_percentage_7d > 0 ? "text-success" : "text-danger"} `}>{lalala.market_data?.price_change_percentage_7d?.toFixed(2)} %</p>
					  </div>
					</div>

					<div className={`me-2 col card shadow ${theme === "dark" ? " background-dark" : null } `} style={{width: "12rem"}}>
					  <div className="card-body">
					    <p className="card-title">Price Change (14d)</p>
					    <p className={`card-text ${lalala.market_data?.price_change_percentage_14d > 0 ? "text-success" : "text-danger"} `}>{lalala.market_data?.price_change_percentage_14d.toFixed(2)} %</p>
					  </div>
					</div>

					<div className={`me-2 col card shadow ${theme === "dark" ? " background-dark" : null } `} style={{width: "12rem"}}>
					  <div className="card-body">
					    <p className="card-title">Price Change (30d)</p>
					    <p className={`card-text ${lalala.market_data?.price_change_percentage_30d > 0 ? "text-success" : "text-danger"} `}>{lalala.market_data?.price_change_percentage_30d.toFixed(2)} %</p>
					  </div>
					</div>

					<div className={`me-2 col card shadow ${theme === "dark" ? " background-dark" : null } `} style={{width: "12rem"}}>
					  <div className="card-body">
					    <p className="card-title">Price Change (60d)</p>
					    <p className={`card-text ${lalala.market_data?.price_change_percentage_60d > 0 ? "text-success" : "text-danger"} `}>{lalala.market_data?.price_change_percentage_60d.toFixed(2)} %</p>
					  </div>
					</div>

					<div className={`me-2 col card shadow ${theme === "dark" ? " background-dark" : null } `} style={{width: "12rem"}}>
					  <div className="card-body">
					    <p className="card-title">Price Change (1y)</p>
					    <p className={`card-text ${lalala.market_data?.price_change_percentage_1y > 0 ? "text-success" : "text-danger"} `}>{lalala.market_data?.price_change_percentage_1y.toFixed(2)} %</p>
					  </div>
					</div>

					<div className={`me-2 col card shadow ${theme === "dark" ? " background-dark" : null } `} style={{width: "12rem"}}>
					  <div className="card-body">
					    <p className="card-title">Market Cap</p>
					    <p className="card-text">$ {lalala.market_data?.market_cap?.usd.toLocaleString()}</p>
					  </div>
					</div>

					<div className={`me-2 col card shadow ${theme === "dark" ? " background-dark" : null } `} style={{width: "12rem"}}>
					  <div className="card-body">
					    <p className="card-title">Volume (24h)</p>
					    <p className="card-text">$ {lalala.market_data?.total_volume?.usd.toLocaleString()}</p>
					  </div>
					</div>

					<div className={`me-2 col card shadow ${theme === "dark" ? " background-dark" : null } `} style={{width: "12rem"}}>
					  <div className="card-body">
					    <p className="card-title">24h High</p>
					    <p className="card-text">$ {lalala.market_data?.high_24h?.usd.toLocaleString()}</p>
					  </div>
					</div>

					<div className={`me-2 col card shadow ${theme === "dark" ? " background-dark" : null } `} style={{width: "12rem"}}>
					  <div className="card-body">
					    <p className="card-title">24h Low</p>
					    <p className="card-text">$ {lalala.market_data?.low_24h?.usd.toLocaleString()}</p>
					  </div>
					</div>



				</div>
				
			</div>

			<div style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}} className="mt-5">
				<h4>What is {lalala?.name}?</h4>				
					<p className="mt-4">{lalala?.description?.en}</p>			

			</div>


		

		</>
		 

		)
}



export default CoinId;




