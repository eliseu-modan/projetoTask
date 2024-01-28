#!/usr/bin/env sh

# Certifique-se de estar no diretório do seu projeto
cd ./frontend

# Instale o nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | sh

# Atualize o ambiente para incluir o nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Isso carrega o nvm

# Instale a versão do Node.js desejada (no seu caso, 14)
nvm install 14

# Use a versão do Node.js recém-instalada
nvm use 14

# Instale as dependências (se necessário)
npm install

# Execute os testes
npm test
