# Consumo de API com JavaScript (Fetch)

## Sobre o projeto
Este projeto foi desenvolvido como atividade prática para aprender a consumir uma API pública usando **JavaScript com fetch()**.

A aplicação busca personagens de anime utilizando a **Jikan API (MyAnimeList)** e mostra os resultados em cards com imagem e nome.  
O usuário pode pesquisar pelo nome do personagem e clicar em um card para ver mais detalhes.

## Tecnologias utilizadas
- HTML
- CSS
- JavaScript
- Fetch API

## API utilizada
Jikan API – https://api.jikan.moe

## Funcionalidades
- Buscar personagens de anime pela API
- Exibir resultados em formato de cards com imagem
- Campo de busca para filtrar personagens
- Exibir detalhes ao clicar em um card
- Estados da interface:



  - Loading (carregando dados)
  - Erro (mensagem amigável)
  - Vazio (nenhum resultado encontrado)

## Organização do projeto
- index.html → estrutura da página (elementos, input de busca, lista de personagens e área de detalhe)  
- styles.css → estilos visuais da interface (cores, layout, cards e efeitos)  
- script.js → lógica da aplicação (requisições fetch, busca de personagens, criação dos cards e exibição dos detalhes)  
- favicon.svg → ícone do site exibido na aba do navegador

## Como executar
1. Baixar ou clonar o projeto  
2. Abrir o arquivo **index.html** no navegador  

Também é possível executar utilizando **Live Server no VSCode**.

---

Autor: Matheus  
Curso: Análise e Desenvolvimento de Sistemas