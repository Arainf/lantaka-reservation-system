import React from 'react'
import NavigationSide from '@/components/common/navigatin-side-top/NavigationSide';
import NavigationTop from '@/components/common/navigatin-side-top/NavigationTop';

const Dashboard = () => {
  return (
    <div className='flex flex-row overflow-hidden relative w-screen'>
      <NavigationSide />
      <NavigationTop />
    </div>
  )
}

export default Dashboard;
