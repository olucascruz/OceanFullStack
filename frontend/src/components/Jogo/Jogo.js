import "./Jogo.css";
import clouds from "../../assets/clouds.png"
import player from "../../assets/mario.gif"
import pipe from "../../assets/pipe.png"
import {useState} from "react"

function Jogo(){
    //Estado 'estaPulando'
    const [estaPulando, setEstaPulando] = useState(false);
    
    document.onkeydown = function(){
        console.log("tecla");
    };

    return <div className="jogo"> 
    <img className="nuvens" src={clouds} alt="nuvens"/>

    <img className="player" src={player} alt="player"/>

    <img className="cano" src={pipe} alt="cano"/>

    <div className="chao"></div>
    </div>;
}

export default Jogo;