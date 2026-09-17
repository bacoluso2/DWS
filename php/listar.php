<?php
require_once "../config/conexao.php";

$stmt = $pdo->query("SELECT * FROM contatos ORDER BY criado_em DESC");
$contatos = $stmt->fetchAll();
$status = $_GET["status"] ?? "";
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receitas Fit | Administração</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <header class="cabecalho">
    <div class="container barra">
      <a class="logo" href="../index.html">Receitas Fit</a>
      <nav aria-label="Navegação principal">
        <ul class="menu">
          <li><a href="../index.html">Home</a></li>
          <li><a href="../receitas.html">Receitas</a></li>
          <li><a href="../contato.html">Contato</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="secao container">
    <h1>Mensagens recebidas</h1>

    <?php if ($status !== ""): ?>
      <p class="aviso sucesso">Operação realizada com sucesso.</p>
    <?php endif; ?>

    <?php if (count($contatos) === 0): ?>
      <p class="aviso">Nenhuma mensagem cadastrada.</p>
    <?php else: ?>
      <div class="tabela-container">
        <table class="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Assunto</th>
              <th>Mensagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($contatos as $contato): ?>
              <tr>
                <td><?= htmlspecialchars($contato["nome"]) ?></td>
                <td><?= htmlspecialchars($contato["email"]) ?></td>
                <td><?= htmlspecialchars($contato["assunto"]) ?></td>
                <td><?= nl2br(htmlspecialchars($contato["mensagem"])) ?></td>
                <td>
                  <div class="acoes">
                    <a class="botao-secundario" href="editar.php?id=<?= $contato["id"] ?>">Editar</a>
                    <form class="form-excluir" action="excluir.php" method="post">
                      <input type="hidden" name="id" value="<?= $contato["id"] ?>">
                      <button class="botao-perigo" type="submit">Excluir</button>
                    </form>
                  </div>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <?php endif; ?>
  </main>

  <script src="../js/script.js"></script>
</body>
</html>
