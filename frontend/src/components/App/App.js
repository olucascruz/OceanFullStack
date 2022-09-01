import './App.css';
import Jogo from '../Jogo/Jogo.js'
import HighScore from '../HighScore/HighScore';
import { useState } from 'react';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [pontos, setPontos] = useState(0);

  function onDie(){
    setGameOver(true);
  }

  function onPontos(_novosPontos){
    setPontos(_novosPontos)
  }

  return (
    <div className="App">
      <Jogo onDie={onDie} onPontos={onPontos}/>
      {gameOver && <HighScore pontos={pontos}/>}

    </div>
  );
}

export default App;
