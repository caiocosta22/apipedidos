'use strict';

// Conexão com o PG
const { Pool } = require('pg'); 
const pgpool = new Pool({
  user: 'user',
  host: 'host pg',
  database: 'database',
  password: 'password',
  port: '5432 default',
  max: 100000,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
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

module.exports = pgpool