import "./Jogo.css";
import cloudsimg from "../../assets/clouds.png"
import playerimg from "../../assets/mario.gif"
import gameOverimg from "../../assets/game-over.png"
import pipeimg from "../../assets/pipe.png"
import React, {useEffect, useRef, useState} from "react"


function Jogo(props){
    const playerRef = useRef();
    const canoRef = useRef();

    //Estado 'estaPulando'
    const [estaPulando, setEstaPulando] = useState(false);
    const [pontos, setPontos] = useState(0);
    const [estaMorto, setEstaMorto] = useState(false);

    const [start, setStart] = useState(false);
    let playerClassName = "player";


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
    useEffect(()=>{
        
        const interval = setInterval(()=>{
            const colisaoCano = colisao();
    
            if(!colisaoCano || estaMorto){
                return;
            }
            setStart(false);
            setEstaMorto(true);
            props.onDie();

        }, 100);

        return () =>clearInterval(interval)
    }, 
    [estaMorto, props]);
    

    useEffect(()=>{
       const interval = setInterval(()=>{
            if(estaMorto || !start){
                return;
            }
            setPontos(pontos + 1);
            props.onPontos(pontos + 1);
        }, 500);

        return ()=> clearInterval(interval);
    }, [estaMorto, pontos, props, start])
    
    document.onkeydown = function(e){
        if(e.code === 'Space' && !start && !estaMorto){
            setStart(true);
        }
        if(e.code === 'Space' && !estaPulando && start){
            setEstaPulando(true);
        }
       
    };
    document.onmousedown = function(e){
        if(!start && !estaMorto){
            setStart(true);
        }
        if(!estaPulando && start){
            setEstaPulando(true);
        }
    }
    
    if(estaPulando){
        playerClassName = "player player-pulo";
        setTimeout(()=>{
            setEstaPulando(false);
    
        }, 750);

     }

     const playerImage = estaMorto ? gameOverimg : playerimg;
     const pararAnimacao = start? "" : "parar-animacao";

    return <div className="jogo"> 

    <span>{"Pontos: "+pontos}</span>

    <img className={"nuvens "+pararAnimacao} src={cloudsimg} alt="nuvens"/>
    {!start && !estaMorto && <h2> Aperte 'pause' ou click na tela para começar</h2>}
    <img ref={canoRef} className={"cano "+pararAnimacao} src={pipeimg} alt="cano"/>
    {start && 
    <img ref={playerRef} className={playerClassName} src={playerImage} alt="player"/>}
    {estaMorto &&
    <img ref={playerRef} className={playerClassName} src={playerImage} alt="player"/>}

    <div className="chao"></div>
    </div>;
}

export default Jogo;