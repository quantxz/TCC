# routes 

  > Get
  ```
  /users
  /users/:nickname
  /users/login?type=(email or nickname)
  ```

  > Post
  ```
  /users/register
  ```

  > Patch
  ```
  /users/update?type=(email or password or nickname or )
  ```

  > Delete
  ```
  /users/delete
  ```
    
# Sokcet.IO
## How to use
### Select room

> To select a room, you will create a socket emit with the message equal to "select_room", and in the content you will create an object with the key equal room and the content equal the room name. example:

```
socket.emit("select_room", {
    room: "room 1"
})
```

### Send message
> To send a message to a room, you will create a socket emit with the message equal to "message", and in the content you will create an object containing the room name, the user nickname and the payload. example:

```
    socket.emit("message", {
        room: "room 0",
        user: "JhonnTest",
        payload: "Hello World"
    })
```


### Emits message types
| Syntax        | Description |
| -----------   | ----------- |
| select_room   | used to select a room |
| message       | used to send a message to a room  |
| private_message | used to send a message to speccified a user |