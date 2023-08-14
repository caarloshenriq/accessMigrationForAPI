const mysql = require('mysql2/promise');
const adodb = require('node-adodb');

async function main() {
  const dbFilePath = 'C:/APPLoja/APPLoja.accdb';

  try {
    // Estabelecer a conexão com o banco de dados MySQL (local)
    const mysqlConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'applojaa',
    });

    const checkIfExistsSql = 'SELECT COUNT(*) AS count FROM produtos WHERE codigoBarras = ?';
    const insertSql = 'INSERT INTO produtos (nomeproduto, valor, codigoBarras) VALUES (?, ?, ?)';

    // Ler o arquivo do Access
    const connection = adodb.open(`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbFilePath}`);
    const rs = await connection.query('SELECT * FROM tblProdutos');

    // Iterar sobre os registros do Access
    for (const row of rs) {
      const campo1 = row.NomeProduto;
      const campo2 = row.PrecoVenda;
      const campo3 = row.CodigoBarras;

      // Verificar se o produto já está cadastrado no MySQL
      const [checkResult] = await mysqlConnection.execute(checkIfExistsSql, [campo3]);
      const count = checkResult[0].count;

      // Se o produto não estiver cadastrado, inserir no MySQL
      if (count === 0) {
        await mysqlConnection.execute(insertSql, [campo1, campo2, campo3]);
      }
    }

    console.log('Migração realizada com sucesso');
    // Fechar a conexão com o MySQL
    mysqlConnection.end();

  } catch (error) {
    console.error(error);
  }
}

main();


//codigo onde insere os dados diretamento no manco de dados realizando a verificação caso ja tenha o codigo de barras ele nao insere, a inserção via api esta no APIMigration.js