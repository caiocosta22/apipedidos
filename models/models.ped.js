'use strict';
const pgpool = require ('../config/pgconfig.js');
const sqlpool = require ('../config/sqlconfig.js');

async function checapedidosql() {
    try {
      // Conexão com o SQL
      await sqlpool.connect();
      console.log('Conexão bem-sucedida com o SQL SERVER');
  
      // Introdução da Consulta
      const query = 'SELECT TOP 1 * FROM CONSULTA_CEP';
      const result = await sqlpool.request().query(query);
      let resultadosql = result.recordset
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
        const querypg = 'SELECT * FROM SITE_PEDIDOS_FATURADOS LIMIT 1';
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


module.exports = {checapedidosql,checapedidopg};
