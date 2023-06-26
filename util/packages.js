//Arquivo de comentário para saber quais pacotes e bibliotecas utilizei durante o projeto
//NPM init para instalar os pacotes
//Debug para debugar
//Yarn para biblioteca de testes de codigo (substituto do nodemon)
//Express como biblioteca responsável por estabelecer os padrões REST
//HTTP para estabelecer a conexão HTTP com as rotas da API
//MSSQL para o SQL SERVER e PG para o POSTGREE
//USE STRICT força meu javascript a interpretar meu código da maneira mais limpa possivel

// Scripts do SQL 
/*
ALTER                                                  VIEW [dbo].[v_SiteItens_Dia2] as
			select b.entidadeid_loja,
			b.almoxid,
			b.conta,
			b.item,
			b.operador,
			CONVERT(varchar, isnull(b.data,00000000), 120) AS data,
			CAST(ISNULL(b.preco,0) AS decimal(16,2)) as preco,
			CAST(ISNULL(b.quantidade,0) AS decimal(16,2)) as quantidade,
			A.desconto,
			CAST(ISNULL(B.precocompra,0) AS decimal(16,2)) as precocompra,
			CAST(ISNULL(B.preco_tabela,0) AS decimal(16,2)) as preco_tabela,
			ISNULL(b.faixaid,0) as faixaid,
			ISNULL(b.ambienteid,0) as ambienteid,
			(SELECT VALOR FROM CONFIGURACAO WHERE PARAMETRO = 31601) as idg2,
			B.produtoid
	From v_SiteMovimento_Dia2 A, Itens_Dia B
	Where a.ENTIDADEID_LOJA = b.ENTIDADEID_LOJA
	and A.tipo = '1'
	and A.status in ('2')
	AND A.CONTA = B.CONTA
	
--------------------------------------------------------------------------------------------------------------

alter                                                  VIEW [dbo].[v_SiteMovimento_Dia2] AS
		SELECT TOP 100  conta, --PK
		entidadeid_loja, --PK
		almoxid,
		numdocumento,
		status,
		tipo,
		CONVERT(varchar, ISNULL(dataemissao,00000000), 120)AS dataemissao,
		ISNULL(entidadeid_cliente,0) AS entidadeid_cliente,
		entidadeid_func,
		CAST(ISNULL(desconto,0) AS decimal(16,2)) as desconto,
		CAST(ISNULL(valortotalprod,0) AS decimal(16,2)) as valortotalprod,
		CAST(ISNULL(valortotalnota,0) AS decimal(16,2)) as valortotalnota,
		CAST(ISNULL(valdesconto,0) AS decimal(16,2)) as valdesconto,
		ISNULL(tiposervid,0) as tiposervid,
		ISNULL(pedcliente,0) as pedcliente,
		ISNULL(condicaoid,0) as condicaoid,
		ISNULL(formapagid,0) as formapagid,
		CONVERT(varchar, ISNULL(datafechamento,00000000), 120) AS datafechamento,
		ISNULL(status_conf,0) AS status_conf,
		ISNULL(entidadeid_parceiro,0) as entidadeid_parceiro,
		ISNULL(entidadeid_func2,0) as entidadeid_func2,
		(SELECT VALOR FROM CONFIGURACAO WHERE PARAMETRO = 31601) AS idg2 --PK
From movimento_dia x , V_SITE_ULTIMAINTEGRACAO Y
Where Status = '2' -- STATUS 2 = FINALIZADO
and tipo = '1' -- TIPO 1 = ORÇAMENTO
and ENTIDADEID_LOJA = 1  -- PREENCHER LOJA
--AND DATAFINALIZACAO >= Y.DATASINC => apos o primeiro sinc
--AND DATAFINALIZACAO >= dateadd(day, -90, getdate()) -- na primeira sincronizacao

------------------------------------------------------------------------------------------------


CREATE TABLE [dbo].[INTEGRACAO_API](
	[LOGID] [int] IDENTITY(1,1) NOT NULL,
	[DATASINCRONIZACAO_INICIO] [datetime] NULL,
	[DATASINCRONIZACAO_FIM] [datetime] NULL,
	[TIPO] [int] NULL,
	[DESCRICAO] [varchar](300) NULL,
	[STATUS] [varchar](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[LOGID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

------------------------------------------------------------------------------------------------------


CREATE VIEW [dbo].[V_SITE_ULTIMAINTEGRACAO] AS
SELECT MAX(DATASINCRONIZACAO_INICIO) AS DATASINC FROM INTEGRACAO_API
GO

*/