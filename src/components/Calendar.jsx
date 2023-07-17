import React from 'react'
import {useQuery} from 'react-query';

// Create a client
// const queryClient = new QueryClient()

function Calendar() {

  console.log('RENDER');

  // fetch('http://127.0.0.1:3000').then(res => {
  //   console.log(res);
  //   // console.log(response);
  // }).catch(err => {
  //   console.error(err);
  // });

  useQuery('http://127.0.0.1:3000/WAZA');

  return (
      <div className="calendar">
        Calendar
      </div>
  )
}

export default Calendar
