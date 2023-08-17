const adodb = require("node-adodb");
const axios = require("axios");

const dbFilePath = "C:/APPLoja/APPLoja.accdb";

async function fetchData(query) {
  try {
    const connection = adodb.open(`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbFilePath}`); //acessa o banco de dados access
    return await connection.query(query); // aguarda a query ser passada quando for chamada dentro de outra função
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

async function sendData(url, data, successMessage) { //função de importação para a api, aguarda a url da api, os dados a serem enviados e a mensagem de sucesso
  try {
    await axios.post(url, data); 
    console.log(successMessage, data);
  } catch (error) {
    console.error("API Error:", error);
  }
}

//função que realiza a migração dos produtos
async function migrateProducts() {
  const query = "SELECT * FROM tblProdutos";

  try {
    const rs = await fetchData(query);

    for (const row of rs) {
      const { NomeProduto: name, PrecoVenda: price, CodigoBarras: barCode } = row;
      const productData = { name, price, barCode };
      
      await sendData("http://localhost:8800/product", productData, "Produto enviado para a API:");
    }

    console.log("Migração tabela Produtos realizada com sucesso");
  } catch (error) {
    console.error(error);
  }
}

//função onde realiza a migração dos lançamentos do caixa 
async function migrateCashToday() {
  const query = "SELECT * FROM tblLancamentosCaixa";

  try {
    const rs = await fetchData(query);

    for (const row of rs) {
      const { TipoTransacao: type, Valor: value, SaldoCaixa: saldo, Referencia: ref } = row;
      const personData = { type, value, saldo, ref };
      
      await sendData("http://localhost:8800/lancamento", personData, "Pessoa cadastrada na API:");
    }

    console.log("Migração tabela pessoas realizada com sucesso");
  } catch (error) {
    console.error(error);
  }
}

//função que realiza a migração dos caixas
async function migrateCash() {
  const query = "SELECT * FROM tblCaixas";

  try {
    const rs = await fetchData(query);

    for (const row of rs) {
      const { Data: date, ValorInicial: valueInitial, ValorFechamento: valueFinal } = row;
      const cashData = { date, valueInitial, valueFinal };
      
      await sendData("http://localhost:8800/caixa", cashData, "Caixa cadastrado na API:");
    }

    console.log("Migração tabela caixa realizada com sucesso");
  } catch (error) {
    console.error(error);
  }
}

// Call the migration functions as needed
migrateProducts();
migratePeople();
migrateCash();
