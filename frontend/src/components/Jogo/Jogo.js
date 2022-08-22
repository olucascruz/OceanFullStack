import "./Jogo.css";
import clouds from "../../assets/clouds.png"

function Jogo(){
    return <div className="jogo"> 
    <img className="nuvens" src={clouds}/>

    </div>;
}

export default Jogo;