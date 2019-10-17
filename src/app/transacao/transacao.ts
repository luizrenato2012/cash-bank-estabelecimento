export class Transacao {
    id:string;
    cnpj:string;
    data : DataFirebase;
    hora: DataFirebase;
    
    valorTransacao: number;
    percentualCashBack: number;
    valorCashBack: number;

    situacao : any = {codigo: 'PENDENTE', dataAtualizacao: new Date()};
    usuario: any;

}

export class DataFirebase {

    seconds : number;
    constructor( seconds : number) {
        this.seconds = seconds;
    }
}
