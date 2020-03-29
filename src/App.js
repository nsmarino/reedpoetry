import React, {useState} from 'react';
import './App.css';

// COMPONENTS
import Header from './components/Header'
import Footer from './components/Footer'
import Instructions from './components/Instructions'
import Poem from './components/Poem'
import Archives from './components/Archives'

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

// TO DO (frontend):
// push current poem to archives once array.length = 10;
// set new current poem using next first line from array;
// loop through array if completed;
// eventually change submitted lines to object that include name of author
// react router for poem, instructions and archive
// css throughout
// footer content
