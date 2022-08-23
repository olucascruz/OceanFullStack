import "./Jogo.css";
import clouds from "../../assets/clouds.png"
import player from "../../assets/mario.gif"
import pipe from "../../assets/pipe.png"
import React, {useState} from "react"

function Jogo(){
    console.log('telarenderizada');
    //Estado 'estaPulando'
    const [estaPulando, setEstaPulando] = useState(false);
    let playerClassName = "player";

    document.onkeydown = function(){
        if(!estaPulando){
            setEstaPulando(true);
        }    
    };
    
    if(estaPulando){
        playerClassName = "player player-pulo";
        setTimeout(()=>{
            setEstaPulando(false);
        }, 700);
     };

    return <div className="jogo"> 
    <img className="nuvens" src={clouds} alt="nuvens"/>

    <img className={playerClassName} src={player} alt="player"/>

    <img className="cano" src={pipe} alt="cano"/>

    <div className="chao"></div>
    </div>;
}

export default Jogo;