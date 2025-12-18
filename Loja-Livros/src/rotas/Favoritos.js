
import Pesquisa from '../componentes/Pesquisa'
import styled from 'styled-components'
import UltimosLancamentos from '../componentes/UltimosLancamentos';
import { useState, useEffect } from 'react'
import { getFavoritos } from '../servicos/favoritos'
import { Titulo } from '../componentes/Titulo'
import livrosImg from '../imagens/livro.png'
import { deleteFavorito } from '../servicos/favoritos'


const AppContainer = styled.div`
      width: 100vw;
      height: 100vh;
      background-image: linear-gradient(90deg, #002f52 35%, #326589 165%);
`
const ResultadoContainer = styled.div`
display: flex;
flex-wrap:wrap;
justify-content:center;
`
const Resultado = styled.div`
    display: flex;
justify-content:center;
align-items:center;
margin:20px 0;
cursor: pointer;
text-align:center;
padding: 0 100px;
p {
    width: 200px;
 color: #FFF;
  }
  img {
      width: 100px;
}
&:hover {


 border: 1px solid white;


    }
`

function Favoritos() {
    const [favoritos, setFavoritos] = useState([])

    useEffect(() => {
        fetchFavoritos()
    }, [])


    async function fetchFavoritos() {
        const favoritosDaApi = await getFavoritos()
        setFavoritos(favoritosDaApi)
    }

    async function deletarFavorito(id) {
        await deleteFavorito(id)
        await fetchFavoritos()
        alert(`Livro de id:${id} deletado!`)
    }

    return (
        <AppContainer>
            <div>
                <Titulo>Aqui estão seus livros</Titulo>
                <ResultadoContainer>
                    {favoritos.length !== 0 ? favoritos.map(favorito => (
                        <Resultado
                            key={favorito.id} // Sempre adicione uma key única no map
                            onClick={() => deletarFavorito(favorito.id)} // <--- ISSO É O QUE FALTA
                        >
                            <p>{favorito.nome}</p>
                            <img src={livrosImg} alt="Capa do livro" />
                        </Resultado>
                    )) : null}
                </ResultadoContainer>

            </div>

        </AppContainer>
    );
}

export default Favoritos;
