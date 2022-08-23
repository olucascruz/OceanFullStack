import "./Jogo.css";
import cloudsimg from "../../assets/clouds.png"
import playerimg from "../../assets/mario.gif"
import pipeimg from "../../assets/pipe.png"
import React, {useRef, useState} from "react"

function Jogo(){
    const playerRef = useRef();
    const canoRef = useRef();

    function colisao(){
        const player = playerRef.current;
        const cano = canoRef.current;

        if(!player || !cano){
            return;
        }  

        return(
            cano.offsetLeft > player.offsetLeft &&
            cano.offsetLeft < player.offsetLeft + player.offsetWidth &&
            player.offsetTop + player.offsetHeight > cano.offsetTop
            );

    }

    setInterval(()=>{
        const valor = colisao();

        console.log("colidiu?", valor)
    }, 100);

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
     }

    return <div className="jogo"> 
    <img className="nuvens" src={cloudsimg} alt="nuvens"/>

    <img ref={playerRef} className={playerClassName} src={playerimg} alt="player"/>

    <img ref={canoRef} className="cano" src={pipeimg} alt="cano"/>

    <div className="chao"></div>
    </div>;
}

export default Jogo;