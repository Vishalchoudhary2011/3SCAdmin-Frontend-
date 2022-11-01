/*
    Demo file for Api Calling Error Handling using Error Boundaries
*/
import React, { useState, useEffect } from 'react'
import constKeys from '../constant/constant';
import { getRequestWithoutHeader } from '../utils/ApiHandler';

function ApiCallDemo(props) {

    const [data,setData] = useState([])
    const [hasError, setHasError] = useState(false)

    useEffect(() => {  

        // get API to fecth data 
        let fetchData = async() => {
            await getRequestWithoutHeader(props.url)
                    .then(rest => {
                        setData(rest.data.data);
                        console.log(rest.data.data);
                    }) 
                    .catch(err => {
                        console.log(err);
                        setHasError(true);
                    })
        }

        fetchData()
    }, [])   
    
    return ( 
        <div>
            <h2> Api Calling </h2>
            {
                !hasError ? 
                <ul>
                {
                    data.map(item => (
                        <li key={item.Year}> Population: {item.Population}, {item.Nation}  - Year: {item.Year}</li>
                    ))
                }
            </ul>
            :
            <h3>{constKeys.API_RESPONSE_ERROR}</h3>
            }
            
        </div>
    )
}

export default ApiCallDemo