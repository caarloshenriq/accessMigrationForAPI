# ENVIANDO DADOS DO ACCESS PARA UMA API

## APRESETAÇÃO 

Projeto desenvolvido em javascript com o objetivo de realizar a transferencia de dados de um arquivo access para uma api

## ARQUIVOS

- index.js: esse arquivo realiza a leitura de uma tabela access e importa esses dados para uma tabela mysql. Atraves de uma verificação de codigo de barras, ele verifica se já existe o produto na tabela mysql, e caso nao exista ele escreve esse dado.

- APIMigration.js: realiza a comunição de dados entre o access e um api. Primeiramente ele realiza a leitura da tabela access desejada e em seguida envia os dados para a api atraves de sua url
