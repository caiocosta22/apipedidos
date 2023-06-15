'use strict';

const pgpool = require ('../config/pgconfig.js');
const sqlpool = require ('../config/sqlconfig.js');

async function checapedidosql() {
    try {
      // Conexão com o SQL
      await sqlpool.connect();
      console.log('Conexão bem-sucedida com o SQL SERVER');
  
      // Introdução da Consulta
      let query = `SELECT TOP 1 * FROM CONSULTA_CEP`;
      const result = await sqlpool.request().query(query);
      const resultadosql = result.recordset
      console.log(resultadosql);
  
      // Encerrar conexão
      sqlpool.close();
    } catch (err) {
      console.error('Erro ao executar a consulta: ', err);
    };
};

async function checapedidopg() {
    try {
    // Inicio da conexão com o banco
        await pgpool.connect();
        console.log("Conexão com banco de dados POSTGREE sucedida!");
    
    //Inicio da consulta
        let querypg = `SELECT * FROM SITE_PEDIDOS_FATURADOS LIMIT 1`;
        const result = await pgpool.query(querypg);
        console.log("Tentativa de consulta:   ",result.rows);
    // Finalizando conexão com o Banco
    } catch (error) {
        console.log("Falha na conexão com o banco de dados POSTGREE");
        throw console.log(error);
    } finally {
        await pgpool.release();
    }
};

async function inserepedidosql(cep) {
    try {
    // Inicio da conexão com o banco
    await sqlpool.connect();
    console.log("Conexão com o banco de dados SQL sucedida!");

    // Verificar se o cep já existe no banco 
    let query = `SELECT CEP FROM dbo.CONSULTA_CEP WHERE cep = '${cep}'`
    const result = await sqlpool.query(query, [cep]);
    
    if (result.recordset.length > 0) {
        console.log("O cep já existe no banco de dados");
        return;
      }
    else {
    // Modelagem da inserção
        let insertsql = `INSERT INTO dbo.CONSULTA_CEP(cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi)`;
        insertsql += `VALUES('${cep}','Praça teste','Complemento teste','Bairro teste','Localidade','CE','230440','','85','1389')`;

    // Tentativa de execução
        await sqlpool.query(insertsql, [cep]);
        console.log("Dados inseridos com suceso")
    // Encerrar conexão
        sqlpool.close();
    };
    } catch (err) {
    console.error('Erro com o processo ', err);
    };
};

async function testefinal(){
    try{
    // Inicio da conexão com SQL
        await sqlpool.connect();
        console.log("Conexão com o banco de dados SQL sucedida!");
    
    //Consulta SQL
        let ssql = `SELECT CONTA FROM dbo.V_SITE_PEDIDOS_FATURADOS`;
        const resultsql = await sqlpool.request().query(ssql);
        console.log(resultsql);

    // Inicio da conexão com POSTGREE
        await pgpool.connect();
        console.log("Conexão com banco de dados POSTGREE sucedida!");
    
    // Consulta Postgree
        const query = `SELECT CONTA FROM SITE_PEDIDOS_FATURADOS WHERE IDG2 = 3632`;
        const resultpg = await pgpool.query(query);
        console.log(resultpg.rows);

    // Tentativa de Comparação
        if (resultsql<resultpg.rows){
            console.log("Postgree é maior")
            try{
                
            } catch{

            };
        } else {
            return console.log("Bancos sicronizados")
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

module.exports = {checapedidosql,checapedidopg,inserepedidosql,testefinal};

