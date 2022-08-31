import './App.css';
import Jogo from '../Jogo/Jogo.js'
import HighScore from '../HighScore/HighScore';
import { useState } from 'react';

function App() {
  const [gameOver, setGameOver] = useState(false)

  function onDie(){
    setGameOver(true);
  }

  return (
    <div className="App">
      <Jogo onDie={onDie}/>
      {gameOver && <HighScore/>}

    </div>
  );
}

export default App;
