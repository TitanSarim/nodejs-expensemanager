import React from 'react'
import data from '../../expense.json'
import Table from './Table'


const AllExpenses = () => {

  
  return (

    <div>

      <div></div>

      <div>
        <Table mydata={data}/>
      </div>

    </div>

  )
}

export default AllExpenses