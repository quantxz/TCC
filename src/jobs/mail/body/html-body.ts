export const emailBodyRender = (userName: string): string => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo ao Nosso Sistema</title>
        <style>
            @font-face {
                font-family: 'Font Abibas';
                src: url('./fonts/Abibas.otf') format('opentype'),
                    url('./fonts/Abibas.ttf') format('truetype');
                /* Adicione outros formatos de fonte, se necessário */
            }
    
            body {
                font-family: 'Font Abibas', Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                font-size: 21px;
            }
    
            .container {
                width: 100vw;
                margin: 0 auto;
                overflow: hidden;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            header {
                background: #34db34;
                padding: 1em 0;
                color: #fff;
                text-align: center;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
    
            header h1 {
                margin: 0;
                padding: 0;
            }
    
            main {
                padding: 2em 1em;
                color: #fff;
                height: 70vh;
                background-image: url("./IMG-20240306-WA0002.jpg");
                background-size: cover;
                background-repeat: no-repeat;
            }
    
            main p strong {
                color: #34db34;
            }
    
            main a {
                color: #34db34;
            }
    
            main ul li {
                list-style: none;
                padding: 0;
            }
    
            main li::before {
                content: "•";
                color: #34db34;
                display: inline-block;
                width: 1em;
                margin-left: -1em;
            }
    
            footer {
                background: #ffffff;
                padding: 1em 0;
                text-align: center;
                color: #333;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <header>
                <h1>Bem-vindo ao CodeSavvy</h1>
            </header>
            <main>
                <p>Olá <strong>${userName}</strong>,</p>
                <p>Seja bem-vindo a CodeSavvy! Estamos animados por ter você como parte da nossa comunidade.</p>
                <p>Aqui estão alguns recursos emocionantes que você pode explorar:</p>
                <ul>
                    <li>Personalizar seu perfil</li>
                    <li>Conectar-se e conversar com outros membros</li>
                    <li>Achar grupos ou pessoas para te ajudar em seus projetos</li>
                    <li>Compartilhar atividades e/ou novidades da sua vida pessoal ou profissional</li>
                </ul>
                <p>Agradecemos por se juntar a nós. <br> Se você tiver alguma dúvida ou precisar de ajuda, não hesite em nos
                    contatar pelo email ou instagram: <br>
                    <a href="mailto:suporteCodeSavvy@gmail.com?subject=Pedido%20de%20ajuda%20ao%suporte" target="_blank">suporteCodeSavvy@gmail.com</a>.
                    <br>
                    <a href="https://www.instagram.com/CodeSavvyOficial" target="_blank"
                        rel="noopener noreferrer">@CodeSavvyOficial</a>.
                </p>
    
                <p>Divirta-se explorando!</p>
            </main>
            <footer>
                <p>Atenciosamente,<br />Equipe do CodeSavvy</p>
            </footer>
        </div>
    </body>
    
    </html>`}