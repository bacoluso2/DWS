# Roteiro para apresentação

## 1. O que é o projeto

O Receitas Fit é um site para pessoas que procuram receitas saudáveis e fáceis. Ele possui três páginas navegáveis: Home, Receitas e Contato.

## 2. Como explicar o HTML

O HTML organiza o conteúdo:

- `header`: cabeçalho e menu de navegação;
- `main`: conteúdo principal de cada página;
- `section`: separa as áreas do conteúdo;
- `article`: representa cada card de categoria ou receita;
- `form`: recebe dados do visitante;
- `footer`: rodapé.

Os links do menu conectam as três páginas. A tag `meta viewport` ajuda o layout a funcionar em celulares.

## 3. Como explicar o CSS

O arquivo `css/style.css` concentra toda a aparência do site. As classes podem ser reutilizadas nas páginas.

- `:root` guarda as cores em variáveis;
- Flexbox organiza o cabeçalho e alguns formulários;
- Grid organiza categorias, receitas e a página de contato;
- `@media` altera o número de colunas em telas menores;
- não há estilos inline nos arquivos HTML.

## 4. Como explicar o JavaScript

O arquivo `js/script.js` espera o HTML carregar por meio do evento `DOMContentLoaded`.

Na página Receitas, a função `filtrarReceitas`:

1. lê o texto digitado e a categoria selecionada;
2. percorre todos os cards com `forEach`;
3. compara o nome e a categoria usando `includes`;
4. adiciona ou remove a classe `oculto`;
5. mostra um aviso quando não existem resultados.

O mesmo arquivo também controla a newsletter e pede confirmação antes de excluir uma mensagem.

## 5. Como explicar o PHP e o banco

O arquivo `banco.sql` cria o banco `receitas_fit` e a tabela `contatos`.

O arquivo `config/conexao.php` cria uma conexão PDO com o MySQL. O PDO permite usar comandos SQL preparados.

O CRUD é formado por:

- **Create:** `php/criar.php` recebe o formulário e usa `INSERT`;
- **Read:** `php/listar.php` usa `SELECT` e mostra uma tabela;
- **Update:** `php/editar.php` busca o registro e usa `UPDATE`;
- **Delete:** `php/excluir.php` usa `DELETE`.

Os comandos preparados usam parâmetros como `:nome` e `:id`, evitando colocar os dados diretamente no SQL. `htmlspecialchars` impede que códigos enviados pelo formulário sejam interpretados como HTML.

## 6. Ordem sugerida para demonstrar

1. Abra a Home e use o menu.
2. Redimensione a janela para mostrar o CSS responsivo.
3. Na página Receitas, pesquise “banana” e mude a categoria.
4. Envie o formulário de Contato.
5. Abra “Administrar mensagens”.
6. Edite a mensagem.
7. Exclua a mensagem e confirme a exclusão.
8. Mostre o arquivo `banco.sql` no phpMyAdmin.

## 7. Respostas curtas para perguntas possíveis

**Por que o CSS é externo?** Para reutilizar os mesmos estilos e manter o HTML organizado.

**Por que o JavaScript é externo?** Para separar comportamento e conteúdo.

**Por que usar PDO?** Para conectar o PHP ao MySQL e executar comandos preparados com mais segurança.

**O que torna o site responsivo?** As grades flexíveis, larguras relativas e regras `@media`.

**Onde estão as quatro operações do CRUD?** Nos arquivos criar, listar, editar e excluir dentro da pasta `php`.
