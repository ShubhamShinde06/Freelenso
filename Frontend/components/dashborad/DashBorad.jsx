import React from 'react'
import BarChart from './BarChart'
import CardList from './CardList'
import PyChart from './PyChart'
import GrapChart from './GrapChart'

const DashBorad = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2">
          <BarChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg "><CardList title={'latestTransactions'}/></div>
        <div className="bg-primary-foreground p-4 rounded-lg "><PyChart/></div>
        {/* <div className="bg-primary-foreground p-4 rounded-lg ">Test</div> */}
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3">
          <GrapChart/>
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg "><CardList title={'Popular Content'}/></div>
      </div>
  )
}

export default DashBorad