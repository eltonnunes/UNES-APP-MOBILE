import { TB_PESSOA } from './tb_pessoa';

export class Usuarioalias {

  private uta_id_token_api : number;
  private usu_id_usuario : number;
  private uta_dt_validade : Date;
  private uta_dt_geracao : Date;
  private uta_tx_token : string;
  private pes_pessoa : TB_PESSOA;

  constructor(
                public UTA_ID_TOKEN_API? : number,
                public USU_ID_USUARIO? : number,
                public UTA_DT_VALIDADE? : Date,
                public UTA_DT_GERACAO? : Date,
                public UTA_TX_TOKEN? : string,
                public PES_PESSOA? : TB_PESSOA
              ) {
                  this.Uta_tx_token = UTA_TX_TOKEN;
               }

              public get Uta_tx_token():string{
                return this.uta_tx_token
              }
              public set Uta_tx_token(value){
                this.uta_tx_token = value
              }
}
