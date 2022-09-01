import { useEffect, useState } from "react";
import "./HighScore.css"



function HighScore(props){

    const [itens, setItens] = useState(undefined)
    useEffect(()=>{
    async function carregarPontuacoes(){
    //   Faz requisição e recebe a resposta
        const response = await fetch("http://localhost:3333/pontuacoes")
    
    //  Extraí o JSON do corpo da resposta   
        const body = await response.json();
    
        setItens(body)
        console.log(body)

    }
  
    carregarPontuacoes()
        
    },[]);
    console.log(itens);

    const itensEstaoCarregando = itens === undefined;
    return <div className="HighScore">
        <div>
                Voce recebeu <b>{props.pontos}</b> pontos!
        </div>
        <h1>HighScore</h1>
            <div>
            {itensEstaoCarregando && <div>Carregando...</div>}
            {!itensEstaoCarregando && itens.map((item, index) => <div key={`score_${index}`}> {item.nome} - {item.pontos} </div>)}
            </div>
        <div>
            <h2>Registre sua pontuação!</h2>
            <form>
                 <input type="text" placeholder="Digite o seu nome..." />
                 <input type="submit" value="Enviar" />
            </form>
        </div>
    </div>
}


export default HighScore