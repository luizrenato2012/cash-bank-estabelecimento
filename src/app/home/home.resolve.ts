import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { EstabelecimentoService } from "../estabelecimento/estabelecimento.service";
import { EstabelecimentoCacheService } from "../estabelecimento/estabelecimento-cache.service";
import { Estabelecimento } from "../estabelecimento/estabelecimento";

@Injectable({
    providedIn : "root"
})
export class HomeResolve implements Resolve<Estabelecimento> {

    constructor(private service : EstabelecimentoCacheService) { }

    async resolve(route:ActivatedRouteSnapshot , state: RouterStateSnapshot): Promise<Estabelecimento> {
        console.log('Resolvendo home');
        let estabelecimento: Estabelecimento = await this.service.getEstabelecimento();
        return  estabelecimento;
    }
}
