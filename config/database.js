'use strict';

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



module.exports = sqlconfig