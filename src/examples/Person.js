import React from 'react'
import constKeys from '../constant/constant'

function Person({person}) {
  return (
    <div> 
      {/* <h1>{constKeys.ERROR_BOUNDARY_EXAMPLE}</h1> */}
      <h2>{person.first_name.toUpperCase()} {person.last_name.toUpperCase()}</h2>  
    </div>
  )
}

export default Person