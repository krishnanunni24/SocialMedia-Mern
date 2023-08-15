import React from 'react'

function ResultEmpty({word}) {
  return (
    <div className='flex flex-col bg-green-200 w-full justify-center items-center h-full'>
     <span>
     {`${word} Empty`}
        </span> 
        <div>
            <img src="../../public/images/emptyResults.jpg" alt="" />
        </div>
    </div>
  )
}

export default ResultEmpty
