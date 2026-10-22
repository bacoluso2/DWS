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

});
