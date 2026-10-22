# Planejamento do meu versionamento

Projeto: **Receitas Fit — DWS**.

| O que decidir | Minha escolha | Trecho de código relacionado |
| --- | --- | --- |
| Nome do repositório | DWS | `git remote add origin https://github.com/bacoluso2/DWS.git` (somente se `origin` ainda não estiver configurado) |
| Mensagem do commit 1 | Inicia documentação do projeto | `git commit -m "Inicia documentação do projeto"` |
| Mensagem do commit 2 | Cria projeto completo Receitas Fit | `git commit -m "Cria projeto completo Receitas Fit"` |
| Mensagem do commit 3 | Prepara versão estática do Receitas Fit para o GitHub Pages | `git add docs/` e `git commit -m "Prepara versão estática do Receitas Fit para o GitHub Pages"` |
| Link do site publicado (GitHub Pages) | https://bacoluso2.github.io/DWS/ (publicado e verificado em 22/10/2026) | Settings → Pages → Deploy from a branch → main → /docs → Save |

## Etapas registradas

1. **Documentação inicial:** primeiro commit do repositório (`28ee021`).
2. **Implementação do projeto:** páginas HTML, estilos, JavaScript e CRUD em PHP/MySQL (`0b285d7`).
3. **Preparação para publicação:** versão estática em `docs/`, navegação e pesquisa preservadas e formulário demonstrativo sem envio para PHP.

Os dois primeiros commits já existiam. As mudanças atuais acrescentam a versão estática, as instruções de publicação e este planejamento, cada uma com mensagem descritiva. Os comandos na tabela mostram como essas etapas podem ser registradas localmente; não precisam ser executados de novo para recriar o histórico.

## Conferência da atividade

- [x] Repositório Git existente com histórico de commits.
- [x] Repositório criado no GitHub: https://github.com/bacoluso2/DWS
- [x] Pelo menos três commits com mensagens descritivas publicados na branch `main`.
- [x] Cópia local clonada com o remoto `origin` conectado ao GitHub no ambiente de trabalho desta atividade.
- [x] Arquivos estáticos prontos para publicação em `main` → `/docs`.
- [x] GitHub Pages ativado em `main` → `/docs`; Home, Receitas, Contato e pesquisa conferidos no site público em 22/10/2026.
- [ ] Compartilhar com o professor os links do repositório e do site após a publicação.

## Links para a entrega

- **Repositório:** https://github.com/bacoluso2/DWS
- **Histórico de commits:** https://github.com/bacoluso2/DWS/commits/main/
- **Site publicado:** https://bacoluso2.github.io/DWS/

O CRUD com PHP/MySQL deve ser apresentado no XAMPP. O GitHub Pages publica a demonstração estática.
