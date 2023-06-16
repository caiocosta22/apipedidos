/*const jsonPostgree = [
    {
      "cep": "12345-678",
      "logradouro": "Rua das Flores",
      "complemento": "",
      "bairro": "Centro",
      "localidade": "São Paulo",
      "uf": "SP",
      "ibge": "3550308",
      "gia": "1004",
      "ddd": "11"
    },
    {
      "cep": "98765-432",
      "logradouro": "Avenida Principal",
      "complemento": "Andar 10, Sala 1001",
      "bairro": "Centro",
      "localidade": "Porto Alegre",
      "uf": "RS",
      "ibge": "4314902",
      "gia": "1234",
      "ddd": "51"
    },
    {
      "cep": "45678-901",
      "logradouro": "Rua do Comércio",
      "complemento": "Loja 5",
      "bairro": "Centro",
      "localidade": "Salvador",
      "uf": "BA",
      "ibge": "2927408",
      "gia": "5678",
      "ddd": "71"
    },
    {
      "cep": "11111-222",
      "logradouro": "Rua das Palmeiras",
      "complemento": "",
      "bairro": "Jardim Botânico",
      "localidade": "Brasília",
      "uf": "DF",
      "ibge": "5300108",
      "gia": "4321",
      "ddd": "61"
    },
    {
      "cep": "88888-888",
      "logradouro": "Travessa da Praia",
      "complemento": "",
      "bairro": "Praia de Iracema",
      "localidade": "Fortaleza",
      "uf": "CE",
      "ibge": "2304400",
      "gia": "9999",
      "ddd": "85"
    }]
    const jsonBDlocal = [{
      "cep": "12345-678",
      "logradouro": "Rua das Flores",
      "complemento": "",
      "bairro": "Centro",
      "localidade": "São Paulo",
      "uf": "SP",
      "ibge": "3550308",
      "gia": "1004",
      "ddd": "11"
    },
    {
      "cep": "98765-432",
      "logradouro": "Avenida Principal",
      "complemento": "Andar 10, Sala 1001",
      "bairro": "Centro",
      "localidade": "Porto Alegre",
      "uf": "RS",
      "ibge": "4314902",
      "gia": "1234",
      "ddd": "51"
    },
    {
      "cep": "45678-901",
      "logradouro": "Rua do Comércio",
      "complemento": "Loja 5",
      "bairro": "Centro",
      "localidade": "Salvador",
      "uf": "BA",
      "ibge": "2927408",
      "gia": "5678",
      "ddd": "71"
    }]
    
    // Logica para buscar apenas os ceps
    const pgceps = jsonPostgree.map(e => e.cep)
    const bdlocal = jsonBDlocal.map(e => e.cep)
    
    
    // Variavel que vai guardar apenas os ceps que nao estao inclusos em ambos os jsons
    const jsonArray = []
    [1, 2, 3, 4] PG
    [1, 2] SQL
    // Pegar tudo que tem no postgree e nao tem no bdlocal
    pgceps.forEach((element, index) => {
      if(!bdlocal.includes(element)) jsonArray.push(element)
    })
    [3, 4] jsonArray
    // Variavel que vai guardar as informacoes gerais de cada cep
    const newJsonArray = [];
    
    // Pegar todas as variaveis do postegress que salvamos no jsonArray e guardar no newJsonArray, pois antes tinhamos apenas a informacao do cep
    jsonPostgree.forEach(elementoPost => {
      jsonArray.forEach(cep => {
        if(cep === elementoPost.cep) {
          newJsonArray.push(elementoPost)
        }
      })
    })
    
    console.log("CEPS LOCAL: ",  bdlocal, "CEPS NUVEM: ",pgceps, "CEPS QUE UM OU OUTRO BD NAO POSSUI: ", jsonArray, "JSON FINAL DE CADA CEP: ", newJsonArray)
    
    




    async function executeQuery() {
      try {
        // Conexão com o SQL
        await pool.connect();
        console.log('Conexão bem-sucedida');
    
        // Introdução da Consulta
        const query = 'SELECT * FROM CONSULTA_CEP';
        const result = await pool.request().query(query);
        console.log(result.recordset);
    
        // Encerrar conexão
        pool.close();
      } catch (err) {
        console.error('Erro ao executar a consulta:', err);
      }
    }
    


    ,



async function sincronizarDados() {
    try {
        // Início da conexão com o SQL Server
        await sqlpool.connect();
        console.log("Conexão com o banco de dados SQL Server estabelecida!");

        // Consulta SQL Server
        const ssql = `SELECT * FROM dbo.v_siteMovimento_Dia`;
        const resultsql = await sqlpool.request().query(ssql);
        const contasSql = resultsql.recordset.map(row => row.CONTA);
        console.log(resultsql);

        // Início da conexão com o PostgreSQL
        await pgpool.connect();
        console.log("Conexão com o banco de dados PostgreSQL estabelecida!");

        // Consulta PostgreSQL
        const query = `SELECT CONTA, IDG2, ENTIDADEID_LOJA, ALMOXID, NUMDOCUMENTO, STATUS, TIPO, DATAEMISSAO, ENTIDADEID_CLIENTE, ENTIDADEID_FUNC, DESCONTO, VALORTOTALPROD, VALORTOTALNOTA, VALDESCONTO, TIPOSERVID, PEDCLIENTE, CONDICAOID, FORMAPAGID, DATAFECHAMENTO, STATUS_CONF, ENTIDADEID_PARCEIRO, ENTIDADEID_FUNC2 FROM SITE_MOVIMENTO_DIA WHERE IDG2 = 3353`;
        const resultpg = await pgpool.query(query);
        const registrosPg = resultpg.rows;
        console.log(registrosPg);

        // Filtrando as contas faltantes
        const contasFaltantes = [];
        registrosPg.forEach(registroPg => {
            if (!contasSql.includes(registroPg.CONTA)) {
                contasFaltantes.push(registroPg);
            }
        });
        console.log("Contas faltantes: ", contasFaltantes);

        // Inserindo no SQL Server
        if (contasFaltantes.length > 0) {
            const valores = contasFaltantes.map(registroPg => {
                return `('${registroPg.IDG2}','${registroPg.CONTA}', '${registroPg.ENTIDADEID_LOJA}', '${registroPg.ALMOXID}', '${registroPg.NUMDOCUMENTO}', '${registroPg.STATUS}', '${registroPg.TIPO}', '${registroPg.DATAEMISSAO}', '${registroPg.ENTIDADEID_CLIENTE}', '${registroPg.ENTIDADEID_FUNC}', '${registroPg.DESCONTO}', '${registroPg.VALORTOTALPROD}', '${registroPg.VALORTOTALNOTA}', '${registroPg.VALDESCONTO}', '${registroPg.TIPOSERVID}', '${registroPg.PEDCLIENTE}', '${registroPg.CONDICAOID}', '${registroPg.FORMAPAGID}', '${registroPg.DATAFECHAMENTO}', '${registroPg.STATUS_CONF}', '${registroPg.ENTIDADEID_PARCEIRO}', '${registroPg.ENTIDADEID_FUNC2}')`;
            });
            const inserirdados = `INSERT INTO dbo.v_siteMovimento_Dia (IDG2, CONTA, entidadeid_loja, ALMOXID, NUMDOCUMENTO, STATUS, TIPO, DATAEMISSAO, ENTIDADEID_CLIENTE, ENTIDADEID_FUNC, DESCONTO, VALORTOTALPROD, VALORTOTALNOTA, VALDESCONTO, TIPOSERVID, PEDCLIENTE, CONDICAOID, FORMAPAGID, DATAFECHAMENTO, STATUS_CONF, ENTIDADEID_PARCEIRO, ENTIDADEID_FUNC2) VALUES ${valores.join(',')}`;

            await sqlpool.request().query(inserirdados);
            console.log("Bancos sincronizados");
        } else {
            console.log("Os dados já estão atualizados");
        }
    } catch (err) {
        console.error('Erro durante o processo:', err);
    } finally {
        // Finalizando conexões
        await pgpool.end();
        await sqlpool.close();
    }
}







    executeQuery();
*/



async function testefinal(){
  try{
  // Inicio da conexão com SQL
      await sqlpool.connect();
      console.log("Conexão com o banco de dados SQL sucedida!");
  
  //Consulta SQL
      let ssql = `SELECT * FROM dbo.v_siteMovimento_Dia`;
      const resultsql = await sqlpool.request().query(ssql);
      const contasSql = resultsql.recordset.map(row => row.CONTA);
      console.log(resultsql);

  // Inicio da conexão com POSTGRE
      await pgpool.connect();
      console.log("Conexão com banco de dados POSTGRE sucedida!");
  
  // Consulta Postgree
      const query = `SELECT CONTA FROM SITE_MOVIMENTO_DIA WHERE IDG2 = 3353`;
      const resultpg = await pgpool.query(query);
      const registropg = resultpg.rows;
      console.log(registropg);

  // Filtrando o banco
      const contasFaltantes = registropg.filter(row => !contasSql.includes(row.CONTA));
      console.log("Contas faltantes ", contasFaltantes);

  // Pegar todas as variaveis do postegress que salvamos no jsonArray e guardar no newJsonArray, pois antes tinhamos apenas a informacao do cep
      registropg.forEach(row => {
          contasSql.forEach(conta => {
          if(conta === registropg) {
              contasFaltantes.push(registropg)
          }});
      });

  // Inserção no SQL 
      if (contasFaltantes.length > 0) {
          
          const valores = contasFaltantes.map(row => `('${row.IDG2}','${row.CONTA}', '${row.ENTIDADEID_LOJA}', '${row.ALMOXID}', '${row.NUMDOCUMENTO}'${row.STATUS}', '${row.TIPO}', '${row.DATAEMISSAO}', '${row.ENTIDADEID_CLIENTE}', '${row.ENTIDADEID_FUNC}', '${row.DESCONTO}', '${row.VALORTOTALPROD}', '${row.VALORTOTALNOTA}', '${row.VALDESCONTO}', '${row.TIPOSERVID}','${row.PEDCLIENTE}','${row.CONDICAOID}','${row.FORMAPAGID}','${row.DATAFECHAMENTO}','${row.STATUS_CONF}','${row.ENTIDADEID_PARCEIRO}','${row.ENTIDADEID_FUNC2}',)`).join(',');
          const inserirdados = `INSERT INTO dbo.v_siteMovimento_Dia (IDG2, CONTA, entidadeid_loja, ALMOXID, NUMDOCUMENTO, STATUS, TIPO, DATAEMISSAO, ENTIDADEID_CLIENTE, ENTIDADEID_FUNC, DESCONTO, VALORTOTALPROD, VALORTOTALNOTA, VALDESCONTO, TIPOSERVID, PEDCLIENTE, CONDICAOID, FORMAPAGID, DATAFECHAMENTO, STATUS_CONF, ENTIDADEID_PARCEIRO, ENTIDADEID_FUNC2) VALUES ${valores}`;
          
          await sqlpool.request().query(inserirdados);
          console.log("Bancos sincronizados");
      } else {
          console.log("Dados já estão atualizados");
      };

  // Capturando erro
  } catch (err){
      console.error('Erro com o processo ', err);

  // Finalizando conexões
  } finally {
      await pgpool.release();
      sqlpool.close();
  };
};










