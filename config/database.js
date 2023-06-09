// Postgree
// npm install pg
const { Pool } = require('pg');

// Configurações da conexão com o banco de dados
const pgconfig = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco_de_dados',
  password: 'sua_senha',
  port: 5432, // porta padrão do PostgreSQL
});

// Exemplo de consulta ao banco de dados
pgconfig.query('SELECT * FROM sua_tabela', (err, res) => {
  if (err) {
    console.error('Erro ao executar a consulta', err);
  } else {
    console.log('Resultado:', res.rows);
  }
});
// Encerrar a conexão com o banco de dados (opcional)
pgconfig.end();

// SQL SERVER
// npm install mssql
const sql = require('mssql');

// Configurações da conexão com o banco de dados
const sqlconfig = {
  user: 'seu_usuario',
  password: 'sua_senha',
  server: 'localhost', // endereço do servidor SQL Server
  database: 'seu_banco_de_dados',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};
// Conectar ao banco de dados
await sql.connect(sqlconfig,(err)=>{
  if (err){
      console.log("Falha na conexão com o banco de dados")
  }
  else{
      console.log("Conexão com banco de dados sucedida!")
  }
});
sql.connect(sqlconfig)
  .then(() => {
  // Exemplo de consulta ao banco de dados
    return sql.query`SELECT * FROM sua_tabela`;
  })
  .then((result) => {
    console.log('Resultado:', result.recordset);
  })
  .catch((err) => {
    console.error('Erro ao executar a consulta', err);
  })
  .finally(() => {
    // Fechar a conexão com o banco de dados (opcional)
    sql.close();
  });