# Dockerfile.backend-frontend
#FROM node:16-alpine

# Configuração do diretório de trabalho
#WORKDIR /app

# Copiar código-fonte do diretório local para o contêiner (backend)
#COPY ../backend /app/backend

# Configuração e instalação do backend
#EXPOSE 3333
##WORKDIR /app/backend
#RUN apk update && apk add --no-cache git
#RUN npm install
#RUN chmod +x /app/backend/node_modules/.bin/nodemon
#RUN apk add --no-cache mysql-client mysql
#ENV MYSQL_ROOT_PASSWORD=root
#ENV MYSQL_DATABASE=app
#ENV MYSQL_USER=junior
#ENV MYSQL_PASSWORD=1357.modanesi
##RUN chmod +x /app/backend/node_modules/.bin/prisma
#RUN npx prisma generate

# Copiar código-fonte do diretório local para o contêiner (frontend)
WORKDIR /app
COPY ../frontend /app/frontend

# Configuração e instalação do frontend
WORKDIR /app/frontend
RUN npm install
EXPOSE 5173

# Comando de inicialização para o frontend (ajuste conforme necessário)
CMD ["yarn", "dev"]

