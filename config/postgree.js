'use strict';

// Conexão com o PG
const { Pool } = require('pg'); 
const pgconfig = new Pool({
  user: 'gprod',
  host: 'CLOUD64.P80.COM.BR',
  database: 'gpinformatica2',
  password: 'g2@9876@g2',
  port: '5432',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
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

module.exports = pgconfig