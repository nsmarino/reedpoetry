import React, {useState, useEffect} from 'react';
import './App.css';

// COMPONENTS
import Header from './components/Header'
import Footer from './components/Footer'
import Instructions from './components/Instructions'
import Poem from './components/Poem'
import Archives from './components/Archives'

// SERVICES
import poemService from './services/poemService'

// UTILS
import romanize from './utils/romanize'
import generateId from './utils/generateId'

const firstLines = [
  { line: 'The art of losing isn’t hard to master', author: 'Elizabeth Bishop' },
  { line: 'When, in disgrace with fortune and men’s eyes', author: 'William Shakespeare' },
  {line: 'Exultation is the going of an inland soul to sea', author: 'Emily Dickinson'},
  {line: 'You can get there from here, though there’s no going home.', author: 'Natasha Trethewey'},
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

const poems = firstLines.map(line => {
  let poemObj = {
    title: romanize(firstLines.indexOf(line) + 1),
    content: [line],
    id: generateId(),
  }
  return poemObj
})

function App() {
  const [index, setIndex] = useState(0)
  const [currentPoem, setCurrentPoem] = useState(poems[index])
  const [newLine, setNewLine] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [archivePoems, setArchivePoems] = useState([])

  // user will populate contributions with ids of poems
  // kept in local storage
  // can only submit if has not already submitted, tracked here
  // const [contributions, setContributions] = useState([])
  // useEffect(() => {
  //   setContributions()
  // }, [])

  useEffect(() => {
    // populate archivePoems with all poems whose archived value is true
    // populate currentPoem with any poem whose archived value is false || line from index
    poemService
      .getAll()
      .then(poems => {
        console.log(poems.filter(poem => poem.archived === true))
        console.log(poems.filter(poem => poem.archived !== true))
        const currentPoem = poems.filter(poem => poem.archived !== true)
        currentPoem ? setCurrentPoem(currentPoem[0]) : setCurrentPoem(poems[index])

      })
  }, [])

  useEffect(() => {
    setCurrentPoem(poems[index])
  }, [index])

  const handleSubmit = e => {
    e.preventDefault()
    if (newLine === '' || newAuthor === '') return

    // work on this next
    if (currentPoem.content.length === 9) {
      const contribution = {line: newLine, author: newAuthor}
      const completedPoem = {...currentPoem, content: currentPoem.content.concat(contribution)} 
      console.log(completedPoem)
      setArchivePoems(archivePoems.concat(completedPoem))
      const newIndex = index === poems.length - 1 ? 0 : index + 1
      setIndex(newIndex)
      setNewLine('')
    }
    const contribution = {line: newLine, author: newAuthor}
    setCurrentPoem({...currentPoem, content: currentPoem.content.concat(contribution)})
    setNewLine('')
    setNewAuthor('')
  }

  const handleChange= e => {
    setNewLine(e.target.value)
  }

  const handleAuthorChange = e => {
    setNewAuthor(e.target.value)
  }

  return (
    <div className="App">
      <Header />
      <Poem
        poem={currentPoem}
        handleSubmit={handleSubmit}
        lineValue={newLine}
        authorValue={newAuthor}
        handleChange={handleChange}
        handleAuthorChange={handleAuthorChange}
      />
      <Instructions />
      <Archives poems={archivePoems} />
      <Footer />
    </div>
  );
}

export default App;

// today:
// change submitted lines to object that include name of author

// tomorrow: backend
// day after: css, react router, fine tune and publish
