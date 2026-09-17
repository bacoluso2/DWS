<?php
require_once "../config/conexao.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: listar.php");
    exit;
}

$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

if (!$id) {
    exit("Identificador inválido.");
}

$stmt = $pdo->prepare("DELETE FROM contatos WHERE id = :id");
$stmt->execute([":id" => $id]);

header("Location: listar.php?status=excluido");
exit;
?>
