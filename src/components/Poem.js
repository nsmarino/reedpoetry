import React from 'react'

const Poem = ({poem, handleSubmit, value, handleChange}) => {
    return (
    <div>
    <h2>{`${poem.title}.`}</h2>
        <div className='poem'>
        <p><span className='lineNumber'>1</span>{poem.content[0] || ''}</p>
        <p><span className='lineNumber'>2</span>{poem.content[1] || ''}</p>
        <p><span className='lineNumber'>3</span>{poem.content[2] || ''}</p>
        <p><span className='lineNumber'>4</span>{poem.content[3] || ''}</p>
        <p><span className='lineNumber'>5</span>{poem.content[4] || ''}</p>
        <p><span className='lineNumber'>6</span>{poem.content[5] || ''}</p>
        <p><span className='lineNumber'>7</span>{poem.content[6] || ''}</p>
        <p><span className='lineNumber'>8</span>{poem.content[7] || ''}</p>
        <p><span className='lineNumber'>9</span>{poem.content[8] || ''}</p>
        <p><span className='lineNumber'>10</span>{poem.content[9] || ''}</p>
        </div>

    <form onSubmit={handleSubmit}>
        <input 
        value={value}
        onChange={handleChange}
        />
        <button>add line</button>
    </form>
    </div>
)}

export default Poem