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

const starterPoems = firstLines.map(li => {
  let poemObj = {
    title: romanize(firstLines.indexOf(li) + 1),
    content: [li],
    id: generateId(),
  }
  return poemObj
})

function App() {
  const [index, setIndex] = useState(0)
  const [currentPoem, setCurrentPoem] = useState(starterPoems[index])
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
    poemService
      .getAll()
      .then(poems => {  
        // set archive to all completed poems 
        setArchivePoems(poems.filter(poem => poem.archived === true))
        // set currentPoem to first returned poem with archived: false
        const currentPoem = poems.find(poem => poem.archived !== true)
        currentPoem ?
          setCurrentPoem(currentPoem)
          :
          setCurrentPoem(starterPoems[0])
      })
  }, [])
  
  useEffect(() => {
       poemService
         .getAll()
         .then(poems => {
           setCurrentPoem(poems.find(poem => poem.archived !== true)) 
         })
  }, [archivePoems])

  // useEffect(() => {
  //   // will need to expand to make api call
  //   setCurrentPoem(poems[index])
  // }, [index])

  const handleSubmit = e => {
    e.preventDefault()
    if (newLine === '' || newAuthor === '') return

    // if poem completed:
    if (currentPoem.content.length === 9) {
      const contribution = {line: newLine, author: newAuthor}
      console.log('current poem', currentPoem)
      const completedPoem = {
        ...currentPoem, 
        content: currentPoem.content.concat(contribution),
        archived: true
      }
      poemService
        .update(currentPoem.id, completedPoem)
        .then(returnedPoem => {
          setArchivePoems(archivePoems.concat(returnedPoem))
        })
      const newIndex = index === starterPoems.length - 1 ? 0 : index + 1
      setIndex(newIndex)
      setNewLine('')
      setNewAuthor('')
    }
    // if poem not yet completed:
    const contribution = {line: newLine, author: newAuthor}
    const updatedPoem = {...currentPoem, content: currentPoem.content.concat(contribution)}
    poemService
      .update(currentPoem.id, updatedPoem)
      .then(returnedPoem => setCurrentPoem(returnedPoem))
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
// integrate frontend and backend
// react router
// styled components

// tomorrow: testing, deploy via netlify and mongoDB Atlas