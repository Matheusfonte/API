// link da API da Jikan que traz personagens
const API_BASE = "https://api.jikan.moe/v4/characters"

// link usado quando vamos pesquisar pelo nome
// o texto digitado é colocado no final da URL
const API_BUSCA = "https://api.jikan.moe/v4/characters?q="


// pegando elementos do HTML para usar no JavaScript

// lugar onde os cards dos personagens aparecem
const lista = document.getElementById("lista")

// área onde mostra o detalhe do personagem clicado
const detalhe = document.getElementById("detalhe")

// campo onde o usuário digita para pesquisar
const busca = document.getElementById("busca")

// mensagem de carregando
const loading = document.getElementById("loading")

// mensagem de erro
const erro = document.getElementById("erro")

// mensagem quando não encontra nada
const vazio = document.getElementById("vazio")


// array que guarda os personagens que aparecem quando abre o site
let personagensInicio = []

// usado para controlar o tempo da busca
// evita ficar fazendo muitas requisições enquanto a pessoa digita
let tempoBusca = null



// função que cria os cards dos personagens na tela
function mostrarLista(personagens) {

    // limpa a lista antes de colocar novos personagens
    lista.innerHTML = ""

    // se não tiver nenhum personagem
    if (!personagens || personagens.length === 0) {

        erro.innerText = "Nenhum personagem encontrado"
        return

    }

    // limpa mensagens se tiver resultado
    erro.innerText = ""
    vazio.innerText = ""


    // percorre todos os personagens
    personagens.forEach(personagem => {

        // cria uma div para o card
        const card = document.createElement("div")

        // adiciona a classe CSS do card
        card.className = "card"


        // imagem padrão caso o personagem não tenha imagem
        let imagem = "https://via.placeholder.com/300x400?text=No+Image"

        // verifica se a API trouxe imagem
        if (personagem.images && personagem.images.jpg) {
            imagem = personagem.images.jpg.image_url
        }


        // conteúdo do card (imagem + nome)
        card.innerHTML =
            "<img src='" + imagem + "'>" +
            "<h3>" + personagem.name + "</h3>"


        // quando clicar no card mostra o detalhe
        card.onclick = () => mostrarDetalhe(personagem)


        // adiciona o card na lista
        lista.appendChild(card)

    })

}



// função que mostra mais informações do personagem
function mostrarDetalhe(personagem) {

    // imagem padrão
    let imagem = "https://via.placeholder.com/300x400?text=No+Image"

    // verifica se tem imagem
    if (personagem.images && personagem.images.jpg) {
        imagem = personagem.images.jpg.image_url
    }


    // monta o detalhe na tela
    detalhe.innerHTML =
        "<img src='" + imagem + "'>" +
        "<h2>" + personagem.name + "</h2>" +
        "<p>" + (personagem.about || "Sem descrição disponível") + "</p>"

}



// função que carrega personagens quando a página abre
async function carregarInicio() {

    // mostra mensagem de carregando
    loading.style.display = "block"

    try {

        // array que vai juntar personagens de várias páginas
        let todos = []


        // pega personagens de várias páginas da API
        for (let page = 1; page <= 3; page++) {

            // faz a requisição
            const resposta = await fetch(API_BASE + "?page=" + page)

            // transforma em JSON
            const dados = await resposta.json()

            // junta com os anteriores
            todos = todos.concat(dados.data)

        }


        // salva os personagens
        personagensInicio = todos

        // mostra na tela
        mostrarLista(personagensInicio)

    } catch (e) {

        // erro aparece só no console
        console.log("Erro ao carregar personagens", e)

        // não mostra erro na tela inicial
        erro.innerText = ""

    }

    // tira o loading
    loading.style.display = "none"

}



// função que busca personagem pelo nome
async function buscarPersonagem(texto) {

    // mostra loading
    loading.style.display = "block"

    try {

        // faz requisição com o nome digitado
        const resposta = await fetch(API_BUSCA + texto)

        // transforma resposta em JSON
        const dados = await resposta.json()

        // mostra resultado
        mostrarLista(dados.data)

    } catch (e) {

        console.log("Erro na busca", e)

        // mensagem para o usuário
        erro.innerText = "Erro na busca"

    }

    // esconde loading
    loading.style.display = "none"

}



// roda quando a pessoa digita no campo de busca
busca.addEventListener("input", function () {

    // pega o texto digitado
    const texto = busca.value.trim()

    // limpa o detalhe quando começa nova busca
    detalhe.innerHTML = ""


    // cancela busca anterior
    clearTimeout(tempoBusca)


    // se apagar o texto volta para lista inicial
    if (texto === "") {

        mostrarLista(personagensInicio)
        erro.innerText = ""

        return

    }


    // espera um pouco antes de buscar
    tempoBusca = setTimeout(function () {

        buscarPersonagem(texto)

    }, 600)

})



// quando o site abre roda essa função
window.onload = function () {

    carregarInicio()

}



// exemplo de uso de API com chave (pedido do professor)

const NASA_API = "https://api.nasa.gov/planetary/apod"
const API_KEY = "DEMO_KEY"

// função só de exemplo
async function exemploNasa() {

    const url = NASA_API + "?api_key=" + API_KEY

    const resposta = await fetch(url)

    const dados = await resposta.json()

    console.log(dados)

}