import React from 'react'

const Poem = ({poem, handleSubmit, value, handleChange}) => (
    <div>
    <h2>I.</h2>
        <div className='poem'>
        <p><span className='lineNumber'>1</span>{poem[0] || ''}</p>
        <p><span className='lineNumber'>2</span>{poem[1] || ''}</p>
        <p><span className='lineNumber'>3</span>{poem[2] || ''}</p>
        <p><span className='lineNumber'>4</span>{poem[3] || ''}</p>
        <p><span className='lineNumber'>5</span>{poem[4] || ''}</p>
        <p><span className='lineNumber'>6</span>{poem[5] || ''}</p>
        <p><span className='lineNumber'>7</span>{poem[6] || ''}</p>
        <p><span className='lineNumber'>8</span>{poem[7] || ''}</p>
        <p><span className='lineNumber'>9</span>{poem[8] || ''}</p>
        <p><span className='lineNumber'>10</span>{poem[9] || ''}</p>
        </div>

    <form onSubmit={handleSubmit}>
        <input 
        value={value}
        onChange={handleChange}
        />
        <button>add line</button>
    </form>
    </div>
)

export default Poem