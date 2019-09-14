export class Transacao {
    id:string;
    cnpj:string;
    data : DataFirebase;
    
    percentualCashBack: number;
    valorTransacao: number;

    constructor() {
        this.cnpj='1111111111';
    }

}

export class DataFirebase {

    seconds : number;
    constructor( seconds : number) {
        this.seconds = seconds;
    }
}
