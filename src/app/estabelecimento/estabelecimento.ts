export class Estabelecimento {
    id?:string="";
    cnpj="";
    nome="";
    dataCadastro : Date;
    usuario : {
        nome: string;
        email: string;
    };
    saldo=0;
}
