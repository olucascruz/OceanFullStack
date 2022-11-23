import { useEffect, useState } from "react";
import "./HighScore.css"



function HighScore(props){

    const [itens, setItens] = useState(undefined);
    const [error, setError] = useState('');
    useEffect(()=>{
    async function carregarPontuacoes(){
    //   Faz requisição e recebe a resposta
        const response = await fetch("https://api-ranking.onrender.com/pontuacoes")
    
    //  Extraí o JSON do corpo da resposta   
        const body = await response.json();
    
        setItens(body)
    }
  
    carregarPontuacoes()
        
    },[]);


    const itensEstaoCarregando = itens === undefined;

    async function salvarPontuacao(event){
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;

        if(!name){
            setError("campo necessário");
            return;
        }  


        const response = await fetch("https://api-ranking.onrender.com/pontuacoes", {
            method: "POST",
            body: JSON.stringify({"nome": name, "pontos":props.pontos}),
            headers:{
                "Content-type": "application/json",
            }, 
         });

        const body = await response.json();

        
        document.location.reload(true);
    }

    return <div className="HighScore">
        <div>
                Voce recebeu <b>{props.pontos}</b> pontos!
        </div>
        <h1>HighScore</h1>
            <div>
            {itensEstaoCarregando && <div>Carregando...</div>}
            {!itensEstaoCarregando && itens.map((item, index) => 
            <div key={`score_${index}`}> {item.nome} - {item.pontos} </div>)}
            </div>
        <div>
            <h2>Registre sua pontuação!</h2>
            <form onSubmit={salvarPontuacao}>
                 <input type="text" name="name" placeholder="Digite o seu nome..." />
                 <input type="submit" value="Enviar" />
                 <br/>
                 <span className="warning">{error}</span>
            </form>
        </div>
    </div>
}


export default HighScore