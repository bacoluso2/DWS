<?php
require_once "../config/conexao.php";

$id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);
    $nome = trim($_POST["nome"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $assunto = trim($_POST["assunto"] ?? "");
    $mensagem = trim($_POST["mensagem"] ?? "");

    if (!$id || $nome === "" || !filter_var($email, FILTER_VALIDATE_EMAIL) || $assunto === "" || $mensagem === "") {
        exit("Dados inválidos.");
    }

    $sql = "UPDATE contatos
            SET nome = :nome, email = :email, assunto = :assunto, mensagem = :mensagem
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":nome" => $nome,
        ":email" => $email,
        ":assunto" => $assunto,
        ":mensagem" => $mensagem,
        ":id" => $id
    ]);

    header("Location: listar.php?status=editado");
    exit;
}

if (!$id) {
    exit("Identificador inválido.");
}

$stmt = $pdo->prepare("SELECT * FROM contatos WHERE id = :id");
$stmt->execute([":id" => $id]);
$contato = $stmt->fetch();

if (!$contato) {
    exit("Mensagem não encontrada.");
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receitas Fit | Editar mensagem</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <header class="cabecalho">
    <div class="container barra">
      <a class="logo" href="../index.html">Receitas Fit</a>
      <nav><ul class="menu"><li><a href="listar.php">Voltar para a lista</a></li></ul></nav>
    </div>
  </header>

  <main class="secao container">
    <h1>Editar mensagem</h1>
    <form class="formulario" action="editar.php" method="post">
      <input type="hidden" name="id" value="<?= $contato["id"] ?>">

      <label for="nome">Nome</label>
      <input id="nome" name="nome" type="text" maxlength="100" value="<?= htmlspecialchars($contato["nome"]) ?>" required>

      <label for="email">E-mail</label>
      <input id="email" name="email" type="email" maxlength="150" value="<?= htmlspecialchars($contato["email"]) ?>" required>

      <label for="assunto">Assunto</label>
      <input id="assunto" name="assunto" type="text" maxlength="150" value="<?= htmlspecialchars($contato["assunto"]) ?>" required>

      <label for="mensagem">Mensagem</label>
      <textarea id="mensagem" name="mensagem" rows="6" required><?= htmlspecialchars($contato["mensagem"]) ?></textarea>

      <button class="botao" type="submit">Salvar alterações</button>
    </form>
  </main>
</body>
</html>
