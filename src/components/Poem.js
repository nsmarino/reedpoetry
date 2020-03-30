import React from 'react'

const Poem = ({poem, handleSubmit, lineValue, authorValue, handleChange, handleAuthorChange}) => {

  const lines = () => {
      const array = []
      for (let i=0;i<10;i++) {
        if (poem.content[i]) {
            const obj = {number: i+ 1, line: poem.content[i].line, author: poem.content[i].author}
            array.push(obj)
        } else {
            array.push({number: i+1})
        }
      }
    //   return array
    return array.map(line => 
        <p className='poemLine'><span className='lineNumber'>{line.number}</span>{line.line || ''} <span className='hover'>{line.author || ''}</span></p>
      )
  }
    return (
    <div>
    <h2>{`${poem.title}.`}</h2>
        <div className='poem'>
        {lines()}
        {/* <p className='poemLine'><span className='lineNumber'>1</span>{poem.content[0].line || ''} <span className='hover'>{poem.content[0].author || ''}</span></p>
        <p className='poemLine'><span className='lineNumber'>1</span>{poem.content[1] || ''} <span className='hover'>hoverState</span></p>
        <p className='poemLine'><span className='lineNumber'>1</span>{poem.content[2] || ''} <span className='hover'>hoverState</span></p>
        <p className='poemLine'><span className='lineNumber'>1</span>{poem.content[3] || ''} <span className='hover'>hoverState</span></p>
        <p className='poemLine'><span className='lineNumber'>1</span>{poem.content[4] || ''} <span className='hover'>hoverState</span></p>
        <p className='poemLine'><span className='lineNumber'>1</span>{poem.content[5] || ''} <span className='hover'>hoverState</span></p>
        <p className='poemLine'><span className='lineNumber'>1</span>{poem.content[6] || ''} <span className='hover'>hoverState</span></p>
        <p className='poemLine'><span className='lineNumber'>1</span>{poem.content[7] || ''} <span className='hover'>hoverState</span></p>
        <p className='poemLine'><span className='lineNumber'>1</span>{poem.content[8] || ''} <span className='hover'>hoverState</span></p>
        <p className='poemLine'><span className='lineNumber'>1</span>{poem.content[9] || ''} <span className='hover'>hoverState</span></p> */}
        </div>

    <form onSubmit={handleSubmit}>
        What should the next line be?
        <input 
        value={lineValue}
        onChange={handleChange}
        />
        <br/>
        your name:
        <input 
        value={authorValue}
        onChange={handleAuthorChange}
        />
        <button>add line</button>
    </form>
    </div>
)}

export default Poem