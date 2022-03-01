import './App.css';
import Header from './components/Header';
import Figure from './components/Figure'
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification'
import PopUp from './components/PopUp'
import { useState, useEffect } from 'react';
import { showNotification as show } from './helpers/helpers';

const words = ['guitar', 'dependencies', 'notebook', 'turntable'];
let selectedWord = words[Math.floor(Math.random() * words.length)];


function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)


  useEffect(() => {
    const handleKeyDown = e => {
      const { key, keyCode } = e
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification)
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter]);
          } else {
            show(setShowNotification)
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [correctLetters, wrongLetters, playable])

  function playAgain() {
    setPlayable(true)
    setCorrectLetters([])
    setWrongLetters([])
    selectedWord = words[Math.floor(Math.random() * words.length)]
  }


  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Notification showNotification={showNotification} />
      <PopUp correctLetters={correctLetters} wrongLetters={wrongLetters} 
        selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
    </>
  );
}

export default App;
