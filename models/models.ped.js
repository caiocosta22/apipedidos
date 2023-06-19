'use strict';

const pgpool = require ('../config/pgconfig.js');
const sqlpool = require ('../config/sqlconfig.js');

async function pedsinc(){
    try{
    // Inicio da conexão com SQL
        await sqlpool.connect();
        console.log("Conexão com o banco de dados SQL sucedida!");
    
    //Consulta de pedidos no SQL
        let ssql = `SELECT * FROM dbo.v_siteMovimento_Dia`;
        const resultsql = await sqlpool.request().query(ssql);
        const contasSql = resultsql.recordset;
        console.log("Passamos da consulta SQL");
  
    // Inicio da conexão com POSTGRE
        await pgpool.connect();
        console.log("Conexão com banco de dados POSTGRE sucedida!");
    
    // Consulta de pedidos no Postgree
        const query = `SELECT conta, entidadeid_loja, ALMOXID, NUMDOCUMENTO, STATUS, TIPO, to_char(DATAEMISSAO, 'MM/DD/YYYY') AS DATAEMISSAO , ENTIDADEID_CLIENTE, ENTIDADEID_FUNC, DESCONTO, VALORTOTALPROD, VALORTOTALNOTA, VALDESCONTO, TIPOSERVID, PEDCLIENTE, CONDICAOID, FORMAPAGID, to_char(DATAFECHAMENTO, 'MM/DD/YYYY') AS DATAFECHAMENTO, STATUS_CONF, ENTIDADEID_PARCEIRO, ENTIDADEID_FUNC2 FROM SITE_MOVIMENTO_DIA WHERE IDG2 = 3353 AND CONTA IN(2207,2206,2205)`;
        const resultpg = await pgpool.query(query);
        const contaspg = resultpg.rows;
        console.log("Passamos da consulta PG");

    // Filtro de pedidos
        const contasFaltantes = contaspg.filter(contapg => !contasSql.some(contasql => contasql.conta === contapg.conta));
        console.log("Contas inseridas: ",contasFaltantes.map(row => row.conta));
     
    // Inserção de pedidos no SQL 
        if (contasFaltantes.length > 0) {
            
            const valores = contasFaltantes.map(row => `('${row.conta}','${row.entidadeid_loja}','${row.almoxid}','${row.numdocumento}','${row.status}','${row.tipo}',${row.dataemissao},'${row.entidadeid_cliente}','${row.entidadeid_func}','${row.desconto}','${row.valortotalprod}','${row.valortotalnota}','${row.valdesconto}','${row.tiposervid}','${row.pedcliente}','${row.condicaoid}','${row.formapagid}','${row.datafechamento}','${row.status_conf}','${row.entidadeid_parceiro}','${row.entidadeid_func2}')`).join(',');
            const inserirdados = `INSERT INTO MOVIMENTO_DIA_TESTE (conta, entidadeid_loja, ALMOXID, NUMDOCUMENTO, STATUS, TIPO, DATAEMISSAO, ENTIDADEID_CLIENTE, ENTIDADEID_FUNC, DESCONTO, VALORTOTALPROD, VALORTOTALNOTA, VALDESCONTO, TIPOSERVID, PEDCLIENTE, CONDICAOID, FORMAPAGID, DATAFECHAMENTO, STATUS_CONF, ENTIDADEID_PARCEIRO, ENTIDADEID_FUNC2) VALUES ${valores}`;

            await sqlpool.request().query(inserirdados);
            console.log("Pedidos sincronizados");
    
    // -------------------------------------------------Sincronização Itens---------------------------------------------------------------------------

    // Consulta de itens no SQL
            let ssqlitens = `SELECT * FROM dbo.ITENS_DIA_TESTE`;
            const resultitens = await sqlpool.request().query(ssqlitens);
            const itensSql = resultitens.recordset;
            console.log("Passamos da consulta SQL");

    // Consulta de itens no PG 
            const queryitens = `SELECT entidadeid_loja, almoxid, conta, item, operador,to_char(DATA, 'MM/DD/YYYY') AS DATA, preco, quantidade, desconto, precocompra, preco_tabela, faixaid, ambienteid, idg2, produtoid FROM SITE_ITENS_DIA WHERE IDG2 = 3353 AND CONTA IN(2207,2206,2205)`;
            const resultadoitens = await pgpool.query(queryitens);
            const pgitens = resultadoitens.rows;

    // Filtro de itens
            const itensFaltantes = pgitens.filter(itempg => !itensSql.some(itemsql => itemsql.conta === itempg.conta));
            console.log("Contas inseridas: ",itensFaltantes.map(row => row.item));
      
    // Inserção de itens no SQL    
            if (itensFaltantes.length > 0){
                console.log("Itens inseridos: ",pgitens.map(row => row.item));
            
                const valoresitens = pgitens.map(row => `('${row.entidadeid_loja}','${row.almoxid}','${row.conta}','${row.item}','${row.operador}','${row.data}','${row.preco}','${row.quantidade}','${row.desconto}','${row.precocompra}','${row.preco_tabela}','${row.faixaid}','${row.ambienteid}','${row.produtoid}')`).join(',');
                const inseriritens = `INSERT INTO ITENS_DIA_TESTE (entidadeid_loja, almoxid, conta, item, operador, data, preco, quantidade, desconto, precocompra, preco_tabela, faixaid, ambienteid, produtoid) VALUES ${valoresitens}`;
            
                await sqlpool.request().query(inseriritens);
                console.log("Itens sincronizados");
            } else {
                console.log("Não há itens para ser inseridos");
            };

        } else {
            console.log("Dados já estão atualizados");
        };
  
    // Capturando
    } catch (err){
        console.error('Erro com a sincronização ', err);
  
    // Finalizando conexões
    } finally {
        await pgpool.release();
        sqlpool.close();
    };
  };
  
module.exports = {pedsinc};

