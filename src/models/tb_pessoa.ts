export class TB_PESSOA {
  constructor(
                public PES_ID_PESSOA : number,
                public PES_IN_PESSOA : string,
                public PES_TX_NOME : string,
                public PES_DT_CADASTRO : Date,
                public PES_TX_OBSERVACAO : string,
                public PES_TX_EMAIL : string,
                public PES_TX_EMAIL_VERIFICAR : string,
                public PES_BL_EMAIL_VERIFICADO : Boolean,
                public PES_NR_CPF_CNPJ : number,
                public TB_USUARIO : Object[]
              ) { }
}
