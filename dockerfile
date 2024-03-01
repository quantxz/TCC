FROM node:latest

WORKDIR /usr/src/TCC

#copiando todos os arquivos do diretorio onde esta o dockerfile para o diretorio conteineriazado definido acima
COPY . .

RUN npm install --quiet --no-optional --no-found --loglevel=error

RUN npm build

CMD ["npm", "run", "start:prod"]