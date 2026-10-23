document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("#form-api-receitas");
  const campo = document.querySelector("#busca-api");
  const botao = document.querySelector("#botao-api");
  const mensagem = document.querySelector("#mensagem-api");
  const lista = document.querySelector("#resultados-api");

  if (!formulario || !campo || !botao || !mensagem || !lista) {
    return;
  }

  function criarCard(receita) {
    const card = document.createElement("article");
    card.className = "card card-conteudo receita-api";

    const nome = document.createElement("h3");
    nome.textContent = receita.strMeal;
    nome.lang = "en";

    const categoria = document.createElement("p");
    categoria.textContent = [receita.strCategory, receita.strArea]
      .filter(Boolean)
      .join(" · ");
    categoria.lang = "en";

    const tituloIngredientes = document.createElement("h4");
    tituloIngredientes.textContent = "Ingredientes";
    const ingredientes = document.createElement("ul");
    ingredientes.lang = "en";

    for (let numero = 1; numero <= 20; numero++) {
      const ingrediente = receita["strIngredient" + numero];
      const medida = receita["strMeasure" + numero];

      if (typeof ingrediente === "string" && ingrediente.trim()) {
        const item = document.createElement("li");
        item.textContent = [medida, ingrediente]
          .filter(function (valor) {
            return typeof valor === "string" && valor.trim();
          })
          .map(function (valor) {
            return valor.trim();
          })
          .join(" ");
        ingredientes.append(item);
      }
    }

    const detalhes = document.createElement("details");
    const resumo = document.createElement("summary");
    resumo.textContent = "Modo de preparo";
    const preparo = document.createElement("p");
    preparo.textContent = receita.strInstructions || "Preparo não informado.";
    preparo.lang = "en";
    detalhes.append(resumo, preparo);

    card.append(nome, categoria, tituloIngredientes, ingredientes, detalhes);
    return card;
  }

  async function buscarReceitas(termo) {
    const controle = new AbortController();
    const limite = setTimeout(function () {
      controle.abort();
    }, 15000);

    botao.disabled = true;
    campo.disabled = true;
    botao.textContent = "Buscando...";
    lista.setAttribute("aria-busy", "true");
    lista.replaceChildren();
    mensagem.textContent = "Buscando receitas...";

    try {
      const url = "https://www.themealdb.com/api/json/v1/1/search.php?s="
        + encodeURIComponent(termo);
      const resposta = await fetch(url, { signal: controle.signal });

      if (!resposta.ok) {
        throw new Error("Falha na requisição: " + resposta.status);
      }

      const dados = await resposta.json();

      if (!dados || (dados.meals !== null && !Array.isArray(dados.meals))) {
        throw new Error("Resposta inválida da API.");
      }

      if (!dados.meals || dados.meals.length === 0) {
        mensagem.textContent = "Nenhuma receita encontrada. Tente outro nome em inglês, como banana ou chicken.";
        return;
      }

      const cards = document.createDocumentFragment();
      dados.meals.forEach(function (receita) {
        if (!receita || typeof receita.strMeal !== "string" || !receita.strMeal.trim()) {
          throw new Error("Receita inválida na resposta.");
        }
        cards.append(criarCard(receita));
      });

      lista.replaceChildren(cards);
      mensagem.textContent = dados.meals.length === 1
        ? "1 receita encontrada."
        : dados.meals.length + " receitas encontradas.";
    } catch (erro) {
      lista.replaceChildren();
      mensagem.textContent = erro.name === "AbortError"
        ? "A busca demorou mais que o esperado. Tente novamente."
        : "Não foi possível buscar as receitas. Verifique sua conexão e tente novamente.";
    } finally {
      clearTimeout(limite);
      botao.disabled = false;
      campo.disabled = false;
      botao.textContent = "Buscar novas receitas";
      lista.setAttribute("aria-busy", "false");
    }
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (botao.disabled) {
      return;
    }

    const termo = campo.value.trim();

    if (termo.length < 2) {
      lista.replaceChildren();
      mensagem.textContent = "Digite pelo menos 2 letras para buscar uma receita.";
      campo.focus();
      return;
    }

    return buscarReceitas(termo);
  });
});
