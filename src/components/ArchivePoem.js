import React from 'react'

const ArchivePoem = ({poem}) => {

    const showLines = () => poem.content.map(
      line => <p className='poemLine' key={line._id}>{line.line} <span className='hover'>{line.author}</span></p>
    )
    
    return (
    <div>
      <h3>{poem.title}.</h3>
      {showLines()}
    </div>
    )
  }

export default ArchivePoem