FROM node:alpine

WORKDIR /usr/src/TCC

# Copia todos os arquivos do diretório onde está o Dockerfile para o diretório dentro do contêiner
COPY . .

# Instalação das dependências do projeto
RUN npm install --quiet --no-optional --no-found --loglevel=error
RUN npm uninstall bcrypt
RUN npm cache clean --force

# Compilação do projeto
RUN npm run build

# Exposição da porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD ["node", "dist/main.js"]
