#!/bin/bash

# Iniciar o serviço frontend
npm test

# Parar o serviço após um tempo adequado para execução dos testes
sleep 10

npm start
# Executar os testes
