import React, { useEffect, useState } from 'react';


const TestComponent = ({ content, setContent }) => {
  useEffect(() => {
    setContent('lelalaldladfjsdlfjaslkfalskdfjhaslkdfjh')
  })

  return (
    <div className='this is the innermost div'>
      { content }
    </div>
  )
}


const TestWrapper = ({Component}) => {
  const [content, setContent] = useState('testing stuff')
  return (
    <div className='wrapper1'>
      <div className='wrapper2'>
        <div className='wrapper3'>
          {Component({content, setContent})}
        </div>
      </div>
    </div>
  )
}

const ComponentWithWrapper = () => {
  return <TestWrapper Component={TestComponent}/>
}

export default ComponentWithWrapper;