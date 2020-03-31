import React from 'react'

const generateId = () => Math.floor(Math.random() * 1000)

const ArchivePoem = ({poem}) => {
    const showLines = () => poem.content.map(
      line => <p className='poemLine' key={`${poem.id}.${generateId()}`}>{line.line} <span className='hover'>{line.author}</span></p>
    )
    return (
    <div>
      <h3>{poem.title}.</h3>
      {showLines()}
    </div>
    )
  }

export default ArchivePoem