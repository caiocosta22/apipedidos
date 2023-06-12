'use strict'
const pg = require('pg')
const sql = require('mssql');
// Conexão com o SQL
const sqlconfig = {
  user: 'gpvendas',
  password: 'gpinfo',
  database: 'CEP_API',
  server: 'g2server',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false // para microsoft azure
  }
};
// Teste de conexão com o banco de dados
/*async function Connectionsql() {
  try {
    await sql.connect(sqlconfig);
    console.log("Conexão com banco de dados SQL sucedida!");
  } catch (err) {
    console.log("Falha na conexão com o banco de dados SQL");
    throw err;
  }
  sql.close();
};
Connectionsql();
*/
// Conexão com o PG

const { Client } = require('pg');
const pgconfig = new Client({
  user: 'gprod',
  host: 'CLOUD64.P80.COM.BR',
  database: 'gpinformatica2',
  password: 'g2@9876@g2',
  port: '5432',
});

// Teste de conexão com o banco de dados
/*async function Connectionpg() {
  try {
    await pgconfig.connect();
    console.log("Conexão com banco de dados POSTGREE sucedida!");
      
      const query = 'SELECT * FROM SITE_PEDIDOS_FATURADOS LIMIT 1';
      const result = await pgconfig.query(query);
      console.log("Tentativa de consulta:   ",result.rows);

  } catch (err) {
    console.log("Falha na conexão com o banco de dados POSTGREE");
    throw err;
  } finally {
  await pgconfig.end();
  }
};
Connectionpg();*/


module.exports = sqlconfig, pgconfig