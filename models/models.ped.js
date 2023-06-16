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
    };
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
        } else {

    // Modelagem da inserção
            let insertsql = `INSERT INTO dbo.CONSULTA_CEP(cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi)`;
            insertsql += `VALUES('${cep}','Praça teste','Complemento teste','Bairro teste','Localidade','CE','230440','','85','1389')`;

    // Tentativa de execução
            await sqlpool.query(insertsql, [cep]);
            console.log("Dados inseridos com suceso");

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
        let ssql = `SELECT * FROM dbo.v_siteMovimento_Dia`;
        const resultsql = await sqlpool.request().query(ssql);
        const contasSql = resultsql.recordset.map(row => row.conta);
        console.log(resultsql);
  
    // Inicio da conexão com POSTGRE
        await pgpool.connect();
        console.log("Conexão com banco de dados POSTGRE sucedida!");
    
    // Consulta Postgree
        const query = `SELECT CONTA FROM SITE_MOVIMENTO_DIA WHERE IDG2 = 3353 AND CONTA IN(2207,2206,2205)`;
        const resultpg = await pgpool.query(query);
        const contasPg = resultpg.rows.map(row => row.conta);
        console.log(contasPg);
  

    // Filtro
        /*const jsonArray = [];

        contasPg.forEach((row, index) => {
            if(!contasSql.includes(row)) jsonArray.push(row);
        });*/

        const contasFaltantes = contasPg.filter(contaPg => !contasSql.includes(contaPg));
 
    // Inserção no SQL 
        if (contasFaltantes.length > 0) {
            
            const valores = contasFaltantes.map(row => `('${row}','${entidadeid_loja}','${almoxid}','${numdocumento}','${status}','${tipo}','${dataemissao}','${entidadeid_cliente}','${entidadeid_func}','${desconto}','${valortotalprod}','${valortotalnota}','${valdesconto}','${tiposervid}','${pedcliente}','${condicaoid}','${formapagid}','${datafechamento}','${status_conf}','${entidadeid_parceiro}','${entidadeid_func2}')`).join(',');

            const inserirdados = `INSERT INTO Movimento_Dia (conta, entidadeid_loja, ALMOXID, NUMDOCUMENTO, STATUS, TIPO, DATAEMISSAO, ENTIDADEID_CLIENTE, ENTIDADEID_FUNC, DESCONTO, VALORTOTALPROD, VALORTOTALNOTA, VALDESCONTO, TIPOSERVID, PEDCLIENTE, CONDICAOID, FORMAPAGID, DATAFECHAMENTO, STATUS_CONF, ENTIDADEID_PARCEIRO, ENTIDADEID_FUNC2) VALUES ${valores}`;
            
            await sqlpool.request().query(inserirdados);
            console.log("Bancos sincronizados");
        } else {
            console.log("Dados já estão atualizados");
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

