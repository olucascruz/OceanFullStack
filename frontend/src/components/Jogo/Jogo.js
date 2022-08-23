import "./Jogo.css";
import clouds from "../../assets/clouds.png"
import pipe from "../../assets/pipe.png"

function Jogo(){
    return <div className="jogo"> 
    <img className="nuvens" src={clouds} alt="nuvens"/>
    <img className="cano" src={pipe} alt="cano"/>

    </div>;
}

export default Jogo;