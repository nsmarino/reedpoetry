import React, {useState} from 'react';
import './App.css';

// const generateId = () => Math.floor(Math.random() * 1000)

const firstLines = [
  'The art of losing isn’t hard to master',
  'When, in disgrace with fortune and men’s eyes',
  'Coming by evening through the wintry city',
  'Exultation is the going of an inland soul to sea',
  'You can get there from here, though there’s no going home.',
  'Go and catch a falling star',
  'I wandered lonely as a cloud',
  'Shall I compare thee to a summer’s day?',
  '’Twas brillig, and the slithy toves',
  'Midway upon the journey of our life',
  'Whose woods these are I think I know.',
  'Much have I travelled in the realms of gold,',
  "Sing, goddess, of Achilles' ruinous anger",
  "Let us go then, you and I,",
  'Stop all the clocks, cut off the telephone,',
  'So worn with passing through the bars,',
  'These decibels are a kind of flagellation',
  'Had we but world enough, and time,',
]

const sampleArchivePoem = {
  title: 'II.',
  content: ['how are you today', 'i saw your friends band play']
}

const Header = () => {
  return (
    <header>
      <h1>Reed Library Collaborative Poetry</h1>
      <nav>
        <ul>
          <li>instructions</li>
          <li>see all poems</li>
        </ul>
      </nav>
    </header>
  )
}

const Footer = () => (
  <footer>
  <p>sample footer - use flexbox to position</p>
  </footer>
)

const Poem = ({poem, handleSubmit, value, handleChange}) => {
  
  return (
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
}

const Instructions = () => (
  <div className="Instructions">
    <h2>Instructions</h2>
    <p>This site was created to commemorate National Poetry Month. Each poem begins with the opening line of a classic poem. Patrons may then contribute lines until the poem is ten lines long, at which point it will be added to the archives and a new poem will be started with a new opening line.</p>
    <p>Each patron may contribute one line per poem. Hover your mouse over the line to see the name of the author.</p>
    <p>At the end of the month a pdf zine will be created from the collected poems. The zine will be available at the Reed Memorial Library <a href="http://carmellibrary.org/">website</a>.</p>
    <p>← back</p>
  </div>
)

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

const Archives = ({poems}) => {

  const showArchives = () => poems.map(poem => <ArchivePoem poem={poem}/>)
  return (
    <div>
      <h2>Archives</h2>
      <p>← back</p>
      {showArchives()}
    </div>
  )
}

function App() {
  const [currentPoem, setCurrentPoem] = useState([firstLines[0]])
  const [newLine, setNewLine] = useState('')
  const [archivePoems, setArchivePoems] = useState([sampleArchivePoem])

  const handleSubmit = e => {
    e.preventDefault()
    if (currentPoem.length === 10) {
      console.log('not today sicko')
      return
    }
    setCurrentPoem(currentPoem.concat(newLine))
    setNewLine('')
    console.log(currentPoem)
  }

  const handleChange= e => {
    setNewLine(e.target.value)
    console.log(newLine)
  }

  return (
    <div className="App">
      <Header />
      <Poem
        poem={currentPoem}
        handleSubmit={handleSubmit}
        value={newLine}
        handleChange={handleChange}
      />
      <Instructions />
      <Archives poems={archivePoems} />
      <Footer />
    </div>
  );
}

export default App;
