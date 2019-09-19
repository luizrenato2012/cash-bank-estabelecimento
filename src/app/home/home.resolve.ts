import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { EstabelecimentoService } from "../estabelecimento/estabelecimento.service";

@Injectable({
    providedIn : "root"
})
export class HomeResolve implements Resolve<Observable<any>> {

    constructor(private service : EstabelecimentoService) { }

    async resolve(route:ActivatedRouteSnapshot , state: RouterStateSnapshot): Promise<Observable<any>> {
        console.log('Resolvendo home');
        return await this.service.getEstabelecimento() ; 
    }
}
