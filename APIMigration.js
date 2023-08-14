const adodb = require("node-adodb");
const axios = require("axios");

async function produtos() {
  const dbFilePath = "C:/APPLoja/APPLoja.accdb";

  try {
    // Ler o arquivo do Access
    const connection = adodb.open(
      `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbFilePath}`
    );
    const rs = await connection.query("SELECT * FROM tblProdutos");

    // Iterar sobre os registros da tabela tblProdutos do Access
    for (const row of rs) {
      const name = row.NomeProduto;
      const price = row.PrecoVenda;
      const barCode = row.CodigoBarras;

      // Enviar os dados do produto para a API
      const productData = { name, price, barCode };

      try {
        await axios.post("http://localhost:8800/product", productData);
        console.log("Produto enviado para a API:", productData);
      } catch (error) {
        console.error("Erro ao enviar produto para a API:", error);
      }
    }

    console.log("Migração tabela Produtos realizada com sucesso");
  } catch (error) {
    console.error(error);
  }
}

produtos();

async function pessoas() {
  const dbFilePath = "C:/APPLoja/APPLoja.accdb";

  try {
    // Ler o arquivo do Access
    const connection = adodb.open(
      `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbFilePath}`
    );
    const rs = await connection.query("SELECT * FROM tblLancamentosCaixa");

    console.log(rs)

    // Iterar sobre os registros da tabela tblProdutos do Access
    for (const row of rs) {
      const type = row.TipoTransacao;
      const value = row.Valor;
      const saldo = row.SaldoCaixa;
      const ref = row.Referencia;

      // Enviar os dados do produto para a API
      const productData = { type, value,saldo, ref};

      try {
        await axios.post("http://localhost:8800/lancamento", productData);
        console.log("Pessoa cadastrada na API:", productData);
      } catch (error) {
        console.error("Erro ao cadastrar pessoa na API:", error);
      }
    }

    console.log("Migração tabela pessoas realizada com sucesso");
  } catch (error) {
    console.error(error);
  }
}

pessoas();


async function caixa() {
  const dbFilePath = "C:/APPLoja/APPLoja.accdb";

  try {
    // Ler o arquivo do Access
    const connection = adodb.open(
      `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbFilePath}`
    );
    const rs = await connection.query("SELECT * FROM tblCaixas");

    console.log(rs)

    // Iterar sobre os registros da tabela tblProdutos do Access
    for (const row of rs) {
      const data = row.Data;
      const valueInitial = row.ValorInicial;
      const valueFinal = row.ValorFechamento;
    

      // Enviar os dados do produto para a API
      const productData = { data, valueInitial, valueFinal};

      try {
        await axios.post("http://localhost:8800/caixa", productData);
        console.log("Pessoa cadastrada na API:", productData);
      } catch (error) {
        console.error("Erro ao cadastrar pessoa na API:", error);
      }
    }

    console.log("Migração tabela caixa realizada com sucesso");
  } catch (error) {
    console.error(error);
  }
}

caixa();
