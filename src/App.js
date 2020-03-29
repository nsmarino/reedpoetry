import React from 'react';
import './App.css';

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

const Poem = ({firstLine, handleSubmit}) => {

  // const showLines = () => {
  //   const lineArray = []
  //   for (let i=1;i<10;i++) {
  //     const line = <p></p>
  //   }
  // }

  return (
    <div>
      <h2>I.</h2>
      <p><span className="lineNumber">1</span>{firstLine}</p>
      <p><span className="lineNumber">2</span></p>
      <p><span className="lineNumber">3</span></p>
      <p><span className="lineNumber">4</span></p>
      <p><span className="lineNumber">5</span></p>
      <p><span className="lineNumber">6</span></p>
      <p><span className="lineNumber">7</span></p>
      <p><span className="lineNumber">8</span></p>
      <p><span className="lineNumber">9</span></p>
      <p><span className="lineNumber">10</span></p>
      <form onSubmit={handleSubmit}>
        <input type="text"/>
        <button>add line</button>
      </form>
    </div>
  )
}

function App() {
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

  const handleSubmit = e => {
    console.log(e.target)
  }

  return (
    <div className="App">
      <Header />
      <Poem firstLine={firstLines[0]} handleSubmit={handleSubmit}/>
    </div>
  );
}

export default App;
