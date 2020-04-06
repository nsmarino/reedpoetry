import React from 'react'

const ArchivePoem = ({poem}) => {

    const showLines = () => poem.content.map(
      line => <p className='poemLine' key={line._id}>{line.line} <span className='hover'>{line.author}</span></p>
    )
    
    return (
    <div className="archiveContainer">
      <h3>{poem.title}.</h3>
      <div className='poem'>
      {showLines()}
      </div>
    </div>
    )
  }

export default ArchivePoem