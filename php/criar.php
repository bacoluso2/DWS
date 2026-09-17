<?php
require_once "../config/conexao.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../contato.html");
    exit;
}

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");
$assunto = trim($_POST["assunto"] ?? "");
$mensagem = trim($_POST["mensagem"] ?? "");

if (
    $nome === "" ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $assunto === "" ||
    $mensagem === ""
) {
    exit("Dados inválidos. Volte e preencha todos os campos corretamente.");
}

$sql = "INSERT INTO contatos (nome, email, assunto, mensagem)
        VALUES (:nome, :email, :assunto, :mensagem)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":nome" => $nome,
    ":email" => $email,
    ":assunto" => $assunto,
    ":mensagem" => $mensagem
]);

header("Location: listar.php?status=cadastrado");
exit;
?>
