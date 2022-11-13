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

            setEstaMorto(true);
            props.onDie()

        }, 100);

        return () =>clearInterval(interval)
    }, 
    [estaMorto, props]);
    

    useEffect(()=>{
       const interval = setInterval(()=>{
            if(estaMorto){
                return;
            }
            setPontos(pontos + 1);
            props.onPontos(pontos + 1);
        }, 500);

        return ()=> clearInterval(interval);
    }, [estaMorto, pontos, props])
    
    document.onkeydown = function(){
        if(!estaPulando && !estaMorto){
            setEstaPulando(true);
        }
       
    };
    
    if(estaPulando){
        playerClassName = "player player-pulo";
        setTimeout(()=>{
            setEstaPulando(false);
        }, 700);
     }

     const playerImage = estaMorto ? gameOverimg : playerimg;
     const pararAnimacao = estaMorto? "parar-animacao" : "";

    return <div className="jogo"> 

    <span>{"Pontos: "+pontos}</span>

    <img className={"nuvens "+pararAnimacao} src={cloudsimg} alt="nuvens"/>

    <img ref={canoRef} className={"cano "+pararAnimacao} src={pipeimg} alt="cano"/>
    <img ref={playerRef} className={playerClassName} src={playerImage} alt="player"/>

    <div className="chao"></div>
    </div>;
}

export default Jogo;