# POST /users/register
* Método: create
Descrição: Cria um novo usuário.
Resposta: 200 OK com os dados do usuário criado.

# GET /users
* Método: findAll
Descrição: Recupera todos os usuários.
Resposta: 200 OK com todos os dados do usuário.

# GET /users/login?type={type}
* Método: findUnique
Descrição: Recupera um usuário com base nas credenciais de login e no tipo de usuário.
Parâmetros da Solicitação:
type (Parâmetro de Consulta): Tipo de usuário.
Resposta: 200 OK com os dados do usuário.

# GET /users/{nickname}
* Método: findOne
Descrição: Recupera um usuário específico com base no apelido.
Parâmetros da Solicitação:
nickname (Parâmetro de Caminho): Apelido do usuário.
Resposta: 200 OK com os dados do usuário.

# PATCH /users/update?type={type}
* Método: update
Descrição: Atualiza as informações do usuário com base no tipo.
Parâmetros da Solicitação:
type (Parâmetro de Consulta): Tipo de usuário.
Resposta: 200 OK com os dados do usuário atualizado.

# DELETE /users/delete
* Método: remove
Descrição: Exclui um usuário com base nos dados fornecidos do usuário.
Resposta: 200 OK com os dados do usuário excluído.

# GET /users/test
* Método: redisTest
Descrição: Realiza um teste relacionado ao cache do Redis.
Resposta: 200 OK com os dados do usuário em cache.