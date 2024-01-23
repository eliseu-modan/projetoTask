# Stage 1: Backend
FROM node:16-alpine AS backend
WORKDIR /app
RUN apk update && apk add --no-cache git
RUN git clone https://github.com/eliseu-modan/projetoTask.git /app
EXPOSE 3333
WORKDIR /app/backend
RUN npm install

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
EXPOSE 5173

# Comando de inicialização para o frontend (ajuste conforme necessário)
CMD ["yarn", "dev", "--host"]

