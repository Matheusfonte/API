// endereço da API que retorna os posts
// usamos const porque esse valor nunca muda
const API = "https://jsonplaceholder.typicode.com/posts"


// pegando elementos do HTML para manipular com JavaScript

// div onde os cards dos posts serão exibidos
// getElementById pega um elemento da página usando o id definido no HTML
const lista = document.getElementById("lista")

// área onde aparece o detalhe do post clicado
// quando o usuário clicar em um card, o conteúdo aparecerá aqui
const detalhe = document.getElementById("detalhe")

// campo de busca onde o usuário digita
// usamos esse elemento para ler o texto digitado
const busca = document.getElementById("busca")

// mensagem de carregamento
// aparece enquanto os dados da API estão sendo buscados
const loading = document.getElementById("loading")

// mensagem de erro
// usada quando algo dá errado ou quando o campo está vazio
const erro = document.getElementById("erro")

// mensagem quando não existem resultados
// aparece quando a busca não encontra posts
const vazio = document.getElementById("vazio")


// array que guarda todos os posts recebidos da API
// usamos let porque ele será preenchido depois
let posts = []


// quando a página abre mostramos mensagem pedindo busca
// isso evita que a tela fique vazia sem explicação
erro.innerText = "Digite algo para pesquisar"



// função responsável por buscar os dados da API
// async permite usar await dentro da função
async function carregarPosts() {

    try {

        // ativa loading
        // faz aparecer a mensagem "Carregando..."
        loading.style.display = "block"

        // faz requisição HTTP para a API
        // fetch busca dados da internet
        const resposta = await fetch(API)

        // verifica se houve erro na requisição
        // se a API responder com erro entramos no catch
        if (!resposta.ok) {
            throw new Error("Erro na requisição")
        }

        // converte resposta para JSON
        // JSON é o formato que a API retorna
        const dados = await resposta.json()

        // salva posts no array
        // agora temos todos os posts armazenados na variável posts
        posts = dados

    } catch (e) {

        // mostra erro amigável na tela
        erro.innerText = "Erro ao carregar os posts"

        // mostra erro detalhado no console do navegador
        console.log(e)

    }

    // desativa loading
    // esconde a mensagem de carregamento
    loading.style.display = "none"

}



// função que cria os cards na tela
// recebe uma lista de posts para mostrar
function mostrarLista(listaPosts) {

    // limpa a lista antes de mostrar novos cards
    // evita duplicar os resultados
    lista.innerHTML = ""

    // se não houver resultados
    if (listaPosts.length === 0) {

        // mostra mensagem de vazio
        vazio.innerText = "Nenhum resultado encontrado"
        return

    }

    // limpa mensagem de vazio
    vazio.innerText = ""

    // percorre todos os posts
    // usamos um loop for para passar por cada post
    for (let i = 0; i < listaPosts.length; i++) {

        // pega um post da lista
        const post = listaPosts[i]

        // cria card
        // cria uma nova div no HTML
        const card = document.createElement("div")

        // adiciona a classe card para aplicar o CSS
        card.className = "card"

        // conteúdo do card
        // mostra o título do post dentro do card
        card.innerHTML = "<h3>" + post.title + "</h3>"

        // quando clicar mostra o detalhe
        // arrow function executa a função mostrarDetalhe
        card.onclick = () => {
            mostrarDetalhe(post)
        }

        // adiciona card na lista
        // coloca o card dentro da div "lista"
        lista.appendChild(card)

    }

}



// função que mostra o detalhe do post
// recebe o post que foi clicado
function mostrarDetalhe(post) {

    // cria o conteúdo do detalhe usando os dados do post
    detalhe.innerHTML =
        "<h2>" + post.title + "</h2>" +
        "<p>" + post.body + "</p>" +
        "<p>ID: " + post.id + "</p>"

}



// evento executado quando o usuário digita no campo de busca
// input dispara sempre que algo é digitado
busca.addEventListener("input", async function () {

    // pega texto digitado
    // toLowerCase deixa tudo minúsculo para facilitar comparação
    // trim remove espaços vazios
    const texto = busca.value.toLowerCase().trim()

    // limpa detalhe ao pesquisar
    // evita que o detalhe antigo continue aparecendo
    detalhe.innerHTML = ""

    // se campo estiver vazio
    if (texto === "") {

        // mostra mensagem pedindo busca
        erro.innerText = "Digite algo para pesquisar"

        // limpa lista de cards
        lista.innerHTML = ""

        // limpa mensagem de vazio
        vazio.innerText = ""

        // limpa detalhe
        detalhe.innerHTML = ""

        // impede que o código continue executando
        return

    }

    // limpa mensagem de erro
    erro.innerText = ""
    vazio.innerText = ""

    // mostra loading
    loading.style.display = "block"

    // simula demora de carregamento (1 segundo)
    // setTimeout executa o código depois de um tempo
    setTimeout(async function () {

        // VERIFICA NOVAMENTE SE O CAMPO AINDA TEM TEXTO
        // isso evita mostrar resultados quando o usuário apagou a busca
        if (busca.value.trim() === "") {

            lista.innerHTML = ""
            loading.style.display = "none"
            return

        }

        // se os posts ainda não foram carregados
        // evita fazer várias requisições para a API
        if (posts.length === 0) {
            await carregarPosts()
        }

        // filtra os posts pelo título
        // filter percorre todos os posts e retorna apenas os que contêm o texto digitado
        const filtrados = posts.filter(function (p) {

            return p.title.toLowerCase().includes(texto)

        })

        // mostra resultados
        mostrarLista(filtrados)

        // esconde loading
        loading.style.display = "none"

    }, 1000)

})



// exemplo de consumo de API com chave (pedido no trabalho)

// URL da API da NASA
const NASA_API = "https://api.nasa.gov/planetary/apod"

// chave de acesso da API
const API_KEY = "DEMO_KEY"

// função que mostra como consumir uma API com chave
async function exemploNasa() {

    // cria a URL completa com a chave da API
    const url = NASA_API + "?api_key=" + API_KEY

    // faz requisição
    const resposta = await fetch(url)

    // converte resposta para JSON
    const dados = await resposta.json()

    // mostra resultado no console
    console.log(dados)

}