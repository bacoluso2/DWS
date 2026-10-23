# Planejamento da minha funcionalidade — Semana 2

Projeto: **Receitas Fit — DWS**.

## Minha escolha

| O que decidir | Minha escolha | Trecho de código relacionado |
| --- | --- | --- |
| API escolhida | TheMealDB, API pública de receitas | `fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(termo))` |
| Dado que será buscado | Nome, categoria, origem, ingredientes, medidas e modo de preparo das receitas encontradas | `const dados = await resposta.json();` e `dados.meals` |
| Elemento HTML que será atualizado | Cards em `#resultados-api` e mensagem de estado em `#mensagem-api`, na página Receitas | `lista.replaceChildren(cards);` e `mensagem.textContent = ...` |
| Mensagem exibida em caso de erro | “Não foi possível buscar as receitas. Verifique sua conexão e tente novamente.” | Bloco `catch (erro)` da função `async function buscarReceitas(termo)` |

## Como funciona

1. O visitante abre **Receitas** e chega à seção **Explore receitas do mundo**.
2. Digita um nome em inglês e clica em **Buscar novas receitas**.
3. O evento `submit` chama `preventDefault()`, evitando recarregar a página.
4. A função assíncrona `buscarReceitas` faz a consulta usando `await fetch(...)` dentro de `try`.
5. O código verifica `resposta.ok` e converte a resposta com `await resposta.json()`.
6. Os dados recebidos geram cards com `document.createElement` e `textContent`; o DOM recebe os novos cards sem recarregar a página.
7. Um retorno `meals: null` mostra uma mensagem de nenhum resultado. Falhas de rede, HTTP e JSON mostram uma mensagem amigável no `catch`.
8. O `finally` libera os controles para outra busca. Um `AbortController` encerra a consulta depois de 15 segundos sem resposta.

A mensagem de estado possui `role="status"` e `aria-live="polite"`. Durante a consulta, a lista indica `aria-busy="true"` e o botão fica desativado para evitar pedidos duplicados.

## Cenários de teste — 23/10/2026

| Cenário | Como foi conferido | Resultado observado |
| --- | --- | --- |
| Entrada válida: `banana` | Consulta real ao endpoint público e execução do JavaScript com o JSON retornado | HTTP 200, cinco receitas retornadas e cinco cards criados; o primeiro resultado foi “Banana Pancakes” |
| Nome inexistente: `zzzzreceitainexistentezzzz` | Consulta real à API e execução do JavaScript com o retorno | HTTP 200, `meals: null` e mensagem “Nenhuma receita encontrada” |
| Falha na requisição | Simulações controladas de HTTP 503 e conexão interrompida | Mensagem de erro amigável, resultados antigos removidos e botão liberado para tentar novamente |
| Resposta inválida | Simulações de JSON inválido e estrutura sem `meals` | Erro tratado pelo `catch`, sem deixar cards antigos visíveis |
| Resposta demorada | Simulação de cancelamento por `AbortController` | Mensagem informando a demora e formulário liberado |
| Campo vazio ou só com espaços | Execução da validação do formulário | A consulta não é enviada e a interface orienta a digitar pelo menos duas letras |
| Duplo envio durante carregamento | Execução de dois eventos de envio com uma consulta pendente | Apenas uma requisição é iniciada |

Os cenários simulados testam o código sem provocar falhas no serviço externo. Para repetir os dois testes principais no site, pesquise `banana` e depois `zzzzreceitainexistentezzzz` na nova seção. A busca do catálogo inicial continua funcionando separadamente.

**Conferência final no GitHub Pages (23/10/2026):** os dois cenários principais foram repetidos no navegador do site publicado. A busca `banana` exibiu cinco cards e o modo de preparo; `zzzzreceitainexistentezzzz` exibiu o aviso de nenhum resultado. A pesquisa do catálogo original também foi conferida e continuou independente da API.

## Arquivos da funcionalidade

- `receitas.html` e `docs/receitas.html`: formulário, mensagem acessível e área de resultados.
- `js/api-receitas.js` e `docs/js/api-receitas.js`: consulta assíncrona, tratamento de erros e atualização do DOM.
- `css/style.css` e `docs/css/style.css`: estilo dos controles e dos cards, incluindo telas menores.

## Entrega

- **Repositório atualizado:** https://github.com/bacoluso2/DWS
- **Site:** https://bacoluso2.github.io/DWS/
- **Página da funcionalidade:** https://bacoluso2.github.io/DWS/receitas.html#receitas-online
- **Documentação da API:** https://www.themealdb.com/docs_api_guide.php

A chave pública de teste `1` é usada para esta atividade educacional, conforme a documentação da TheMealDB. A busca e os dados estão em inglês. As receitas externas são apresentadas como ideias gerais, sem classificação nutricional automática.

A construção de uma API REST própria em Flask fica para uma etapa posterior, conforme a orientação da entrega.
