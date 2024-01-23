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
WORKDIR /usr/frontend
COPY ../frontend /frontend

# Configuração e instalação do frontend
WORKDIR /usr/frontend
RUN npm install
<<<<<<< HEAD

# Conceder permissões de execução ao nod
RUN chmod +x /app/backend/node_modules/.bin/nodemon
RUN apk add --no-cache mysql-client mysql
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=app
ENV MYSQL_USER=junior
ENV MYSQL_PASSWORD=1357.modanesi

RUN chmod +x /app/backend/node_modules/.bin/prisma
RUN npx prisma generate

# CMD ["npm", "run", "dev:server"]

# Stage 2: Frontend
FROM node:14-alpine AS frontend
# Instalação do Git e configuração do ambiente de trabalho
RUN apk update && apk add --no-cache git
WORKDIR /app/front

# Clone do repositório Git e configuração do ambiente
RUN git clone https://github.com/eliseu-modan/projetoTask.git .

# Navega até o diretório do frontend
WORKDIR /app/front/frontend

# Instalação das dependências
RUN npm install

# Expor a porta necessária para o frontend (substitua pela porta correta se necessário)
=======
>>>>>>> aae335f9be198f2fc540b25dc7468d072b1ae939
EXPOSE 5173

# Comando de inicialização para o frontend (ajuste conforme necessário)
CMD ["yarn", "dev"]

