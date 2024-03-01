FROM node:latest

WORKDIR /usr/src/TCC

#copiando todos os arquivos do diretorio onde esta o dockerfile para o diretorio conteineriazado definido acima
COPY .