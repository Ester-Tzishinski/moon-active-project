import React, { useState, useEffect } from 'react';	
import axios from 'axios';
import './ImageAPI.css'

function ImageAPI(){
	const [data, setData] = useState([]);
	const [pageNo,setPageNo] = useState(1);
	useEffect(()=>{
		getData();
	},[]);
	function getData(){
        // const index = this.state.index;
        // console.log("index", index);
        // fetch(`api/promotions/${index}`)
        //   .then(response => {
        //     // debugger;
        //     return response.json()
        //   })
        //   .then(data => {
        //     console.log('======data', data);
        //     return this.setState({ promotions: data, isLoading: false })
        //   }
        //   )
        //   .catch(err => console.log('============e', err));
        // const { promotions } = this.state;    
		// axios.get(`https://jsonplaceholder.typicode.com/albums/${pageNo}/photos`)
		// 	.then(response => {
		// 		if(pageNo > 1){
		// 			let arr = [...data, ...response.data];
		// 			setData(arr);
		// 		}
		// 		else{
		// 			setData(response.data);
		// 		}
		// 	})
		// 	.catch(error => {
		// 		alert('Axios GET request failed');
		// 	})
	}
	const firstEvent = (e) => {
		//console.log(e);
		var bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
		if(bottom){
			let pg = pageNo + 1;
			setPageNo(pg);
			getData();
		}
	}
	return(
		<div onScroll={firstEvent} className='ImageAPI'>
			<table class='table'>
				<thead>
					<tr>
						<th scope='col'>Title</th>
						<th scope='col'>Photo</th>
					</tr>
				</thead>
				<tbody>
					{data.map(item => {
						return(
							<tr key={item.id}>
								<td>{item.title}</td>
								<td><img src={item.thumbnailUrl} alt='' /></td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	);
}
export default ImageAPI;