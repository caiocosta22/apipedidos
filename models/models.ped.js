'use strict';

const { rows } = require('mssql');
const pgpool = require ('../config/pgconfig.js');
const sqlpool = require ('../config/sqlconfig.js');

async function pedsinc(){
    try{
    // Inicio da conexão com SQL
        await sqlpool.connect();
        console.log("Conexão com o banco de dados SQL sucedida!");
    
    //Consulta de pedidos no SQL
        let ssql = `SELECT * FROM -- INSIRA A TABELA`;
        const resultsql = await sqlpool.request().query(ssql);
        const contasSql = resultsql.recordset;
  
    // Inicio da conexão com POSTGRE
        await pgpool.connect();
        console.log("Conexão com banco de dados POSTGRE sucedida!");
    
    // Consulta de pedidos no Postgree
        const query = `SELECT * FROM -- INSIRA A TABELA`;
        const resultpg = await pgpool.query(query);
        const contaspg = resultpg.rows;
    
    // Inserção na tabela de Log
        const logsql = `INSERT INTO TABELA_INTEGRACAO(DATASINCRONIZACAO_INICIO, tipo, descricao, status) values(getdate(), 1, 'integracao fv', '1')`
        await sqlpool.request().query(logsql)
        console.log("Log iniciado!")

    // Filtro de pedidos
        const contasFaltantes = contasSql.filter(contasql => !contaspg.some(contaspg => contaspg.conta === contasql.conta));
        console.log("Contas Faltantes: ",contasFaltantes.map(row => row.conta));
     
    // Inserção de pedidos no SQL 
        if (contasFaltantes.length > 0) {
            
            const valores = contasFaltantes.map(row => `('${row.conta}','${row.entidadeid_loja}','${row.almoxid}','${row.numdocumento}','${row.status}','${row.tipo}','${row.dataemissao}','${row.entidadeid_cliente}','${row.entidadeid_func}','${row.desconto}','${row.valortotalprod}','${row.valortotalnota}','${row.valdesconto}','${row.tiposervid}','${row.pedcliente}','${row.condicaoid}','${row.formapagid}','${row.datafechamento}','${row.status_conf}','${row.entidadeid_parceiro}','${row.entidadeid_func2}','${row.idg2}')`).join(',');
            const inserirdados = `INSERT INTO SITE_MOVIMENTO_DIA (conta, entidadeid_loja, almoxid, numdocumento, status, tipo, dataemissao, entidadeid_cliente, entidadeid_func, desconto, valortotalprod, valortotalnota, valdesconto, tiposervid, pedcliente, condicaoid, formapagid, datafechamento, status_conf, entidadeid_parceiro, entidadeid_func2,idg2) VALUES ${valores}`;

            await pgpool.query(inserirdados);
            console.log("Pedidos sincronizados");

    // -------------------------------------------------Sincronização Itens---------------------------------------------------------------------------
    
    // Consulta de itens no SQL
            let ssqlitens = `SELECT * FROM -- PREENCHA A TABELA`;
            const resultitens = await sqlpool.request().query(ssqlitens);
            const itensSql = resultitens.recordset;
    // Consulta de itens no PG 
            const queryitens = `SELECT * FROM -- PREENCHA A TABELA`;
            const resultadoitens = await pgpool.query(queryitens);
            const pgitens = resultadoitens.rows;
 
    // Filtro de itens
            const itensFaltantes = itensSql.filter(itemsql => !pgitens.some(itempg => itempg.conta === itemsql.conta));
            console.log("Itens inseridos: ",itensFaltantes.map(row => row.item));
    
    // Inserção de itens no SQL    
            if (itensFaltantes.length > 0){
                const valoresitens = itensFaltantes.map(row => `('${row.dados1}','${row.dados2}')`).join(',');
                const inseriritens = `INSERT INTO - PREENCHA A TABELA ) VALUES ${valoresitens}`;
                await pgpool.query(inseriritens);
                console.log("Itens sincronizados");

            } else {
                console.log("Não há itens para ser inseridos");
            };
    
    // Finalizando o registro no Log
        const ultimologsql = `update TABELA_SINCRONIZACAO set DATASINCRONIZACAO_FIM = getdate(), status = '2' where status = '1' and DATASINCRONIZACAO_FIM is null`;
        await sqlpool.request().query(ultimologsql);
        console.log("Log Finalizado"); 

        } else {
            console.log("Dados já estão atualizados");
    
    // Finalizando o registro no Log
            const ultimologsql = `update TABELA_SINCRONIZACAO set DATASINCRONIZACAO_FIM = getdate(), status = '2' where status = '1' and DATASINCRONIZACAO_FIM is null`;
            await sqlpool.request().query(ultimologsql);
            console.log("Log Finalizado"); 
        };

    // Capturando erro
    } catch (err){
        console.error('Erro com a sincronização ', err);
    // Inserção na tabela de Log
        const logsql = `INSERT INTO TABELA_SINCRONIZACAO(DATASINCRONIZACAO_INICIO,DATASINCRONIZACAO_FIM, tipo, descricao, status) values(getdate(),getdate(), 1, 'integracao fv', '3')`
        await sqlpool.request().query(logsql)
        console.log("Log iniciado!")

    // Finalizando conexões
    } finally {
        await pgpool.release();
        await pgpool.end();
        sqlpool.close();
    };
  };
  
module.exports = {pedsinc};

