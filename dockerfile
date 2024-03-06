FROM node:14

WORKDIR /usr/src/TCC

# Copia todos os arquivos do diretório onde está o Dockerfile para o diretório dentro do contêiner
COPY . .

# Instalação das dependências do projeto
RUN npm install --quiet --no-optional --no-found --loglevel=error

# Compilação do projeto
RUN npm run build

# Exposição da porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "run", "start:prod"]
