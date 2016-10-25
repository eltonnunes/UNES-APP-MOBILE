export class Retorno {
  constructor(
                public Registros : any[],
                public TotalDeRegistros : number,
                public ItensPorPagina : number,
                public Totais : number,
                public Token : Boolean
              ) { }
}
