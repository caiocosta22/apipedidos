'use strict';

const sql = require('mssql');
// Conexão com o SQL
const connect = {
  user: 'user',
  password: 'password',
  database: 'database',
  server: 'server',
  pool: {
    max: 100000,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false // para microsoft azure
  }
};
const sqlpool = new sql.ConnectionPool(connect);

// Teste de conexão com o banco de dados
/*
async function Connectionsql() {
  try {
    await sqlpool.connect;
    console.log("Conexão com banco de dados SQL sucedida!");
    const query = `SELECT * FROM dbo.v_siteitens_dia`
    console.log("passei da query")
    const result = await sqlpool.request().query(query);
    console.log("passei daqui")
    console.log(result.recordset);
  } catch (err) {
    console.log("Falha na conexão com o banco de dados SQL");
  } finally{
  await sqlpool.close();}
};
Connectionsql();
*/

module.exports = sqlpool