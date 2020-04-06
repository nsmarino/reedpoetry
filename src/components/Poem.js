import React from 'react'
import generateId from '../utils/generateId'

const Poem = ({poem, handleSubmit, lineValue, authorValue, handleChange, handleAuthorChange}) => {
  if (!poem) return (<div>Please visit the archives to see all completed poems.</div>)
  
  const lines = () => {
      const array = []
      for (let i=0;i<10;i++) {
        if (poem.content[i]) {
            const obj = {number: i+ 1, line: poem.content[i].line, author: poem.content[i].author, id: poem.content[i]._id}
            array.push(obj)
        } else {
            array.push({number: i+1, id: generateId()})
        }
      }
    //   return array
    return array.map(line => 
        <p className='poemLine' key={line.id}><span className='lineNumber'>{line.number}</span>{line.line || ''} <span className='hover'>{line.author || ''}</span></p>
      )
  }
    return (
    <div>
    <h2>{`${poem.title}.`}</h2>
        <div className='poem'>
        {lines()}
        </div>

    <form onSubmit={handleSubmit} className='form'>
        <label>What should the next line be?</label>
        <input 
        value={lineValue}
        onChange={handleChange}
        />
        <label>Name</label>
        <input 
        value={authorValue}
        onChange={handleAuthorChange}
        />
        <button id="submitBtn">add line!</button>
    </form>
    </div>
)}

export default Poem