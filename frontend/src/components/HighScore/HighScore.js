import "./HighScore.css"



function HighScore(props){



    fetch("http://localhost:3333/pontuacoes").then(console.log)
    return <div className="HighScore">
        <div>
                Voce recebeu <b>{props.pontos}</b> pontos!
        </div>
        <h1>HighScore</h1>
            <div>

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