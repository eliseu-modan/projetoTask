#!/bin/bash

# Iniciar o serviço frontend
npm start

# Parar o serviço após um tempo adequado para execução dos testes
sleep 10

# Executar os testes
npm test
