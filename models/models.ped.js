'use strict';
const sql = require('mssql');
const pg = require('pg');
const sqlconfig = require ('../config/database.js');
const pgconfig = require ('../config/database.js')
const pool = new sql.ConnectionPool(sqlconfig);



async function checapedidosql() {
    try {
      // Conexão com o SQL
      await pool.connect();
      console.log('Conexão bem-sucedida com o SQL SERVER');
  
      // Introdução da Consulta
      const query = 'SELECT TOP 1 * FROM CONSULTA_CEP';
      const result = await pool.request().query(query);
      let resultadosql = result.recordset
      console.log(resultadosql);
  
      // Encerrar conexão
      pool.close();
    } catch (err) {
      console.error('Erro ao executar a consulta: ', err);
    };
};


async function checapedidopg() {
    try {
    // Inicio da conexão com o banco
        await pgconfig.connect();
        console.log("Conexão com banco de dados POSTGREE sucedida!");
    
    //Inicio da consulta
        const querypg = 'SELECT * FROM SITE_PEDIDOS_FATURADOS LIMIT 1';
        const result = await pgconfig.query(querypg);
        console.log("Tentativa de consulta:   ",result.rows);
    
    // Finalizando conexão com o Banco
    } catch (error) {
        console.log("Falha na conexão com o banco de dados POSTGREE");
        throw console.log(error);
    } finally {
        await pgconfig.end();
    }
};


module.exports = {checapedidosql, checapedidopg};
