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
        const contasSql = resultsql.recordset;
        console.log("Passamos da consulta SQL");
  
    // Inicio da conexão com POSTGRE
        await pgpool.connect();
        console.log("Conexão com banco de dados POSTGRE sucedida!");
    
    // Consulta Postgree
        const query = `SELECT conta, entidadeid_loja, ALMOXID, NUMDOCUMENTO, STATUS, TIPO, to_char(DATAEMISSAO, 'MM/DD/YYYY') AS DATAEMISSAO , ENTIDADEID_CLIENTE, ENTIDADEID_FUNC, DESCONTO, VALORTOTALPROD, VALORTOTALNOTA, VALDESCONTO, TIPOSERVID, PEDCLIENTE, CONDICAOID, FORMAPAGID, to_char(DATAFECHAMENTO, 'MM/DD/YYYY') AS DATAFECHAMENTO, STATUS_CONF, ENTIDADEID_PARCEIRO, ENTIDADEID_FUNC2 FROM SITE_MOVIMENTO_DIA WHERE IDG2 = 3353 AND CONTA IN(2207,2206,2205)`;
        const resultpg = await pgpool.query(query);
        const contaspg = resultpg.rows;
        console.log("Passamos da consulta PG");

    // Filtro
        const contasFaltantes = contaspg.filter(contapg => !contasSql.some(contasql => contasql.conta === contapg.conta));
        console.log("Contas inseridas: ",contasFaltantes.map(row => row.conta));
     
    // Inserção no SQL 
        if (contasFaltantes.length > 0) {
            
            const valores = contasFaltantes.map(row => `('${row.conta}','${row.entidadeid_loja}','${row.almoxid}','${row.numdocumento}','${row.status}','${row.tipo}',${row.dataemissao},'${row.entidadeid_cliente}','${row.entidadeid_func}','${row.desconto}','${row.valortotalprod}','${row.valortotalnota}','${row.valdesconto}','${row.tiposervid}','${row.pedcliente}','${row.condicaoid}','${row.formapagid}','${row.datafechamento}','${row.status_conf}','${row.entidadeid_parceiro}','${row.entidadeid_func2}')`).join(',');
            const inserirdados = `INSERT INTO MOVIMENTO_DIA_TESTE (conta, entidadeid_loja, ALMOXID, NUMDOCUMENTO, STATUS, TIPO, DATAEMISSAO, ENTIDADEID_CLIENTE, ENTIDADEID_FUNC, DESCONTO, VALORTOTALPROD, VALORTOTALNOTA, VALDESCONTO, TIPOSERVID, PEDCLIENTE, CONDICAOID, FORMAPAGID, DATAFECHAMENTO, STATUS_CONF, ENTIDADEID_PARCEIRO, ENTIDADEID_FUNC2) VALUES ${valores}`;

            await sqlpool.request().query(inserirdados);
            console.log("Pedidos sincronizados");

    // Consulta de itens no PG 
            const queryitens = `SELECT entidadeid_loja, almoxid, conta, item, operador, DATA , preco, quantidade, desconto, precocompra, preco_tabela, faixaid, ambienteid, idg2, produtoid FROM SITE_ITENS_DIA WHERE IDG2 = 3353 AND CONTA IN(2207,2206,2205)`;
            const resultadoitens = await pgpool.query(queryitens);
            const pgitens = resultadoitens.rows;

    // Inserção de itens no SQL    
            console.log("Itens inseridos: ",pgitens.map(row => row.item));
            
            const valoresitens = pgitens.map(row => `('${row.entidadeid_loja}', '${row.almoxid}', '${row.conta}', '${row.item}', '${row.operador}', '${row.data}', '${row.preco}', '${row.quantidade}', '${row.desconto}', '${row.precocompra}', '${row.preco_tabela}', '${row.faixaid}', '${row.ambienteid}', '${row.produtoid}')`);
            const inseriritens = `INSERT INTO ITENS_DIA_TESTE (entidadeid_loja, almoxid, conta, item, operador, data, preco, quantidade, desconto, precocompra, preco_tabela, faixaid, ambienteid, produtoid) VALUES (${valoresitens})`;
            await sqlpool.request().query(inseriritens); //Morre aqui
            console.log("Itens sincronizados");

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

