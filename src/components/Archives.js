import React from 'react'
import ArchivePoem from './ArchivePoem'

const Archives = ({poems}) => {

    const showArchives = () => poems.map(poem => <ArchivePoem poem={poem} key={poem.id}/>)
    return (
      <div>
        <h2>Archives</h2>
        <p>← back</p>
        {showArchives()}
      </div>
    )
  }

export default Archives