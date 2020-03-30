import React, {useState, useEffect} from 'react';
import './App.css';

// COMPONENTS
import Header from './components/Header'
import Footer from './components/Footer'
import Instructions from './components/Instructions'
import Poem from './components/Poem'
import Archives from './components/Archives'

const generateId = () => Math.floor(Math.random() * 10000)

//copypasted from stackoverflow
function romanize (num) {
  if (isNaN(num))
      return NaN;
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

const firstLines = [
  { line: 'The art of losing isn’t hard to master', author: 'Elizabeth Bishop' },
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
    setCurrentPoem(poems[index])
  }, [index])

  const handleSubmit = e => {
    e.preventDefault()
    if (newLine === '') return

    // work on this next
    if (currentPoem.content.length === 9) {
      const completedPoem = {...currentPoem, content: currentPoem.content.concat(newLine)} 
      setArchivePoems(archivePoems.concat(completedPoem))
      const newIndex = index === poems.length - 1 ? 0 : index + 1
      setIndex(newIndex)
      setNewLine('')
    }
    const testLine = {line: newLine, author: newAuthor}
    setCurrentPoem({...currentPoem, content: currentPoem.content.concat(testLine)})
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

// TO DO (frontend):
// eventually change submitted lines to object that include name of author
// react router for poem, instructions and archive
// css throughout
// footer content
