import React, {useState, useEffect} from 'react';
import './App.css';
import { 
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

// COMPONENTS
import Header from './components/Header'
import Instructions from './components/Instructions'
import Poem from './components/Poem'
import Archives from './components/Archives'

// SERVICES
import poemService from './services/poemService'

// UTILS
// import romanize from './utils/romanize'

// sample content
// const firstLines = [
//   { line: 'The art of losing isn’t hard to master', author: 'Elizabeth Bishop' },
//   { line: 'When, in disgrace with fortune and men’s eyes', author: 'William Shakespeare' },
//   {line: 'Exultation is the going of an inland soul to sea', author: 'Emily Dickinson'},
//   {line: 'You can get there from here, though there’s no going home.', author: 'Natasha Trethewey'},
//   {line: 'Go and catch a falling star', author: 'John Donne'},
//   {line: 'I wandered lonely as a cloud', author: 'William Wordsworth'},
//   {line: 'Shall I compare thee to a summers day?', author: 'William Shakespeare'},
//   {line: '’Twas brillig, and the slithy toves', author: 'Lewis Carroll'},
//   {line: 'Midway upon the journey of our life', author: 'Dante'},
//   {line: 'Whose woods these are I think I know', author: 'Robert Frost'},
//   {line: 'Much have I travelled in the realms of gold,', author: 'John Keats'},
//   {line: 'Sing, goddess, of Achilles ruinous anger', author: 'Homer'},
//   {line: 'Let us go then, you and I,', author: 'TS Eliot'},
//   {line: 'Stop all the clocks, cut off the telephone,', author: 'WH Auden'},
//   {line: 'So worn with passing through the bars,', author: 'Rainer Maria Rilke'},
//   {line: 'These decibels are a kind of flagellation', author: 'John Ashbery'},
//   {line: 'Had we but world enough, and time,', author: 'Andrew Marvell'},
//   {line: 'I have done it again.', author: 'Sylvia Plath'},
// ]
// const starterPoems = firstLines.map(li => {
//   let poemObj = {
//     title: romanize(firstLines.indexOf(li) + 1),
//     content: [li],
//     archived: false
//   }
//   return poemObj
// })




function App() {
  // const [index, setIndex] = useState(0)
  const [currentPoem, setCurrentPoem] = useState(null)
  const [newLine, setNewLine] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [archivePoems, setArchivePoems] = useState([])

  // console.log(starterPoems)

  // on page load, sets archive to completed poems and sets currentPoem
  useEffect(() => {
    poemService
      .getAll()
      .then(poems => {  
        setArchivePoems(poems.filter(poem => poem.archived === true))

        // set currentPoem to first returned poem with archived: false
        const currentPoem = poems.find(poem => poem.archived !== true)
        currentPoem ?
          setCurrentPoem(currentPoem)
          :
          setCurrentPoem(null)
      })
  }, [])
  
  // fetches new poem object once a completed poem is added to archives
  useEffect(() => {
       poemService
         .getAll()
         .then(poems => {
           setCurrentPoem(poems.find(poem => poem.archived !== true)) 
         })
  }, [archivePoems])

  // three functions for managing Poem Form
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

      // this index state should no longer be necessary
      // const newIndex = index === starterPoems.length - 1 ? 0 : index + 1
      // setIndex(newIndex)

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


  const linkStyle = {
    padding: 5
  }

  return (
    <Router >
      <div className="App">
      <Header />
      
      <div className="links">
        <Link style={linkStyle} to="/">current poem</Link>
        <Link style={linkStyle} to="/instructions">instructions</Link>
        <Link style={linkStyle} to="/archives">archives</Link>
      </div>

      <Switch>

        <Route path="/archives">
          <Archives poems={archivePoems} />
        </Route>

        <Route path="/instructions">
          <Instructions />
        </Route>

        <Route path="/">
          <Poem
            poem={currentPoem}
            handleSubmit={handleSubmit}
            lineValue={newLine}
            authorValue={newAuthor}
            handleChange={handleChange}
            handleAuthorChange={handleAuthorChange}
          />  
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;