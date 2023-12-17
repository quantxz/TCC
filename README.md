# routes 

  * Get
  ```
  /users
  /users/:nickname
  /users/login?type=(email or nickname)
  ```

  * Post
  ```
  /users/register
  ```

  * Patch
  ```
  /users/update?type=(email or password or nickname or )
  ```

  * Delete
  ```
  /users/delete
  ```
    



# TO-DO
  * Errors:
    ```
    tipar os erros(email ja existe, nickname ja existe, etc)
    ```
    ```
    refatorar os controlers e os services para tratar os erros usando try/catch
    ```
      
  * Functionalities   
    ``` 
    arrumar o websocket e testar a api no frontend
    ```
    ```
    dividir o register em verified e standart 
    ```
    ```
    terminar e testar o sistema de login usando o redis
    ```

