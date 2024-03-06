export const emailBodyRender = (userName: string): string => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Nosso Sistema</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            width: 50%;
            margin: 0 auto;
            overflow: hidden;
        }

        header {
            background: #fff;
            padding: 1em 0;
            color: #333;
        }

        header h1 {
            margin: 0;
            padding: 0;
            text-align: center;
        }

        main {
            padding: 2em 0;
            /* background-color: rgb(31, 109, 255); */
        }

        footer {
            background: #fff;
            padding: 1em 0;
            text-align: center;
            color: #333;
        }
    </style>
</head>

<body>
    <div class="container">
        <header>
            <h1>Bem-vindo ao CodeSavvy</h1>
        </header>
        <main>
            <p>Olá ${userName},</p>
            <p>Seja bem-vindo a CodeSavvy! Estamos animados por ter você como parte da nossa comunidade.</p>
            <p>Aqui estão alguns recursos emocionantes que você pode explorar:</p>
            <ul>
                <li>Personalizar seu perfil</li>
                <li>Conectar-se e conversar com outros membros</li>
                <li>Achar grupos ou pessoas para te ajudar em seus projetos</li>
                <li>Compartilhar atividades e/ou novidades da sua vida pessoal ou profissional</li>
            </ul>
            <p>Agradecemos por se juntar a nós. Se você tiver alguma dúvida ou precisar de ajuda, não hesite em nos contatar pelo email: <br>email@email.com.</p>
            
            <p>Divirta-se explorando!</p>
        </main>
        <footer>
            <p>Atenciosamente,<br/>Equipe do CodeSavvy</p>
        </footer>
    </div>
</body>

</html>
`}