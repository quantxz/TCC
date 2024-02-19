# routes 
 UsersController

 O `UsersController` gerencia operações relacionadas a usuários.

## Rotas
## Usuarios
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


    
# Sokcet.IO
## Como usar
### Selecionar sala

> Para selecionar uma sala, você criará um socket emit com a mensagem igual a "select_room" e no conteúdo você criará um objeto com a chave igual a room e o conteúdo igual ao nome da sala. Exemplo:
```
socket.emit("select_room", {
    room: "room 1"
})
```

### Enviar mensagem
> Para enviar uma mensagem para uma sala, você criará um socket emit com a mensagem igual a "message" e no conteúdo você criará um objeto contendo o nome da sala, o apelido do usuário e a carga útil. Exemplo:

```
    socket.emit("message", {
        room: "room 0",
        user: "JhonnTest",
        payload: "Hello World"
    })
```


### Emits message types
| Sintaxe        | Descrição |
| -----------   | ----------- |
| select_room   | usado para selecionar uma sala |
| message       | usado para enviar uma mensagem para uma sala  |
| private_message | usado para enviar uma mensagem para um usuário especificado |

# formas (modelo para enviar os dados)
### CPF

> O cpf deve ser passado para a api da seguinte forma "xxx.xxx.xxx-xx" no formato de string

### RG
> O rg deve ser passado para a api da seguinte forma "xxxxxxxx-x" no formato de string

# Types (tipos para serem passados na query)

## Update query types 
* ❓ Exemplo de url
``` 
/update?type=email || /update?type=password  || /update?type=nickname ||
```

* ⚠️ informações necessárias
> **Email** - para atualizar o email é necessário enviar o nickname, password e surname para provar que é a propria pessoa. Exemplo:
```json
{
  "nickname": "jhon" ,
  "surname": "doe",
  "password": "securepassword",
}
``` 


> **Password** - para atualizar a senha é necessário enviar o nickname, email e surname para provar que é a propria pessoa. Exemplo:
```json
{
  "nickname": "jhon" ,
  "surname": "doe",
  "email": "jhon.doe@example.com",
}
``` 


> **Nickname** - para atualizar o nickname é necessário enviar o email, password e surname para provar que é a propria pessoa. Exemplo:
```json
{
  "email": "jhon.doe@example.com",
  "password": "securepassword" ,
  "surname": "doe",
}
``` 
