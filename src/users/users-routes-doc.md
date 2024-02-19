# 🗺️ Rotas
**Controllers:** 

O `UsersController` gerencia operações relacionadas a usuários.



## 👨‍💼 Usuarios
### 1. Criar Usuário

- **Rota:** `POST /users/register`
- **Descrição:** Cria um novo usuário com base nos dados fornecidos.
- **Corpo da Solicitação (Exemplo):**
  ```json
  {
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "password": "securepassword",
    "nickname": "johnny"
  }
  ```
- **Resposta de Sucesso (Exemplo):**
  ```json
  {
    "message": "Usuário criado",
    "returnedData": {
      "name": "John",
      "surname": "Doe",
      "email": "john.doe@example.com",
      "nickname": "johnny"
    }
  }
  ```

### 2. Obter Todos os Usuários

- **Rota:** `GET /users`
- **Descrição:** Retorna todos os usuários cadastrados.
- **Resposta de Sucesso (Exemplo):**
  ```json
  {
    "message": "Retornando dados dos usuários",
    "returnedData": [
      {
        "name": "John",
        "surname": "Doe",
        "email": "john.doe@example.com",
        "nickname": "johnny"
      },
      // Outros usuários...
    ]
  }
  ```

### 3. Login do Usuário

- **Rota:** `POST /users/login`
- **Descrição:** Realiza o login do usuário com base nas credenciais.
- **Corpo da Solicitação (Exemplo):**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```
- **Resposta de Sucesso (Exemplo):**
  ```json
  {
    "message": "retornando dados do usuario achado",
    "status": 200,
    "returnedData": {
      "name": "John",
      "surname": "Doe",
      "email": "john.doe@example.com",
      "nickname": "johnny"
    }
  }
  ```

### 4. Obter Usuário por Nickname

- **Rota:** `GET /users/:nickname`
- **Descrição:** Retorna os dados de um usuário com base no apelido (nickname).
- **Parâmetros da URL (Exemplo):**
  ```
  /users/johnny
  ```
- **Resposta de Sucesso (Exemplo):**
  ```json
  {
    "message": "retornando dados do usuario encontrado",
    "returnedData": {
      "name": "John",
      "surname": "Doe",
      "email": "john.doe@example.com",
      "nickname": "johnny"
    }
  }
  ```

### 5. Atualizar Usuário

- **Rota:** `PATCH /users/update`
- **Descrição:** Atualiza os dados do usuário com base no tipo de atualização (email, password, nickname).
- **Parâmetros da Consulta (Exemplo):**
  ```
  ?type=email
  ```
- **Corpo da Solicitação (Exemplo):**
  ```json
  {
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "password": "newsecurepassword",
    "nickname": "newjohnny"
  }
  ```
- **Resposta de Sucesso (Exemplo):**
  ```json
  {
    "message": "usuario atualizado",
    "returnedData": {
      "name": "John",
      "surname": "Doe",
      "email": "newemail@example.com",
      "nickname": "newjohnny"
    }
  }
  ```

### 6. Deletar Usuário

- **Rota:** `DELETE /users/delete`
- **Descrição:** Deleta o usuário com base nos dados fornecidos.
- **Corpo da Solicitação (Exemplo):**
  ```json
  {
    "name": "John",
    "surname": "Doe",
    "email": "newemail@example.com",
    "password": "newsecurepassword",
    "nickname": "newjohnny"
  }
  ```
- **Resposta de Sucesso (Exemplo):**
  ```json
  {
    "message": "usuario deletado",
    "returnedData": {
      "name": "John",
      "surname": "Doe",
      "email": "newemail@example.com",
      "nickname": "newjohnny"
    }
  }
  ```

### 7. Teste Redis

- **Rota:** `GET /users/test`
- **Descrição:** Realiza um teste com dados do Redis.
- **Resposta de Sucesso (Exemplo):**
  ```json
  {
    "message": "retornando dados do usuario encontrado",
    "returnedData": [
      {
        "name": "John",
        "surname": "Doe",
        "email": "newemail@example.com",
        "nickname": "newjohnny"
      },
      // Outros usuários...
    ]
  }
  ```

