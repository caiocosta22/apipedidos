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
    
    //* Logica para buscar apenas os ceps
    const pgceps = jsonPostgree.map(e => e.cep)
    const bdlocal = jsonBDlocal.map(e => e.cep)
    
    
    // Variavel que vai guardar apenas os ceps que nao estao inclusos em ambos os jsons
    const jsonArray = []
    
    // Pegar tudo que tem no postgree e nao tem no bdlocal
    pgceps.forEach((element, index) => {
      if(!bdlocal.includes(element)) jsonArray.push(element)
    })
    
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
    
    executeQuery();
*/













