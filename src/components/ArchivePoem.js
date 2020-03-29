import React from 'react'

const ArchivePoem = ({poem}) => {
    const showLines = () => poem.content.map(
      line => <p>{line}</p>
    )
    return (
    <div>
      <h3>{poem.title}</h3>
      {showLines()}
    </div>
    )
  }

export default ArchivePoem