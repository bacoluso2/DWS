document.addEventListener("DOMContentLoaded", function () {
  const campoBusca = document.querySelector("#busca");
  const campoCategoria = document.querySelector("#categoria");
  const receitas = document.querySelectorAll(".receita");
  const avisoSemResultados = document.querySelector("#sem-resultados");

  function filtrarReceitas() {
    if (!campoBusca || !campoCategoria) {
      return;
    }

    const textoBuscado = campoBusca.value.toLowerCase().trim();
    const categoriaEscolhida = campoCategoria.value;
    let quantidadeVisivel = 0;

    receitas.forEach(function (receita) {
      const nome = receita.dataset.nome.toLowerCase();
      const categoria = receita.dataset.categoria;
      const combinaNome = nome.includes(textoBuscado);
      const combinaCategoria =
        categoriaEscolhida === "todas" || categoria === categoriaEscolhida;
      const deveAparecer = combinaNome && combinaCategoria;

      receita.classList.toggle("oculto", !deveAparecer);

      if (deveAparecer) {
        quantidadeVisivel++;
      }
    });

    avisoSemResultados.classList.toggle("oculto", quantidadeVisivel > 0);
  }

  if (campoBusca && campoCategoria) {
    campoBusca.addEventListener("input", filtrarReceitas);
    campoCategoria.addEventListener("change", filtrarReceitas);
  }

  const formularioNewsletter = document.querySelector("#form-newsletter");

  if (formularioNewsletter) {
    formularioNewsletter.addEventListener("submit", function (evento) {
      evento.preventDefault();
      alert("E-mail cadastrado com sucesso!");
      formularioNewsletter.reset();
    });
  }

  const formulariosExcluir = document.querySelectorAll(".form-excluir");

  formulariosExcluir.forEach(function (formulario) {
    formulario.addEventListener("submit", function (evento) {
      const confirmou = confirm("Deseja realmente excluir esta mensagem?");

      if (!confirmou) {
        evento.preventDefault();
      }
    });
  });
});
