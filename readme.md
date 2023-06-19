# Projeto api- pedidos
Api construída em NODEJS com o intuito de ser um sincronizador de pedidos, sincronizando o banco de dados local (SQL SERVER) com o banco de dados da nuvem (POSTGREESQL).
# Dia 19/06/2023 - Projeto funcionando
Ao enviar uma requisição para o caminho http://localhost:3000/ped/sincronizar, a API já está totalmente funcional, sincronizando pedidos e itens com o banco de dados. Se os pedidos já estiverem sido sincronizados, ele emitirá uma mensagem, a mesma coisa com os itens, assim não enviando nada duplicado para o banco de dados.