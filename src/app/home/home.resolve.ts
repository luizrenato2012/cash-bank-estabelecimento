import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Observer } from "rxjs";
import { LoginService } from "../login/login.service";
import { EstabelecimentoService } from "../estabelecimento/estabelecimento.service";
import { async } from "@angular/core/testing";

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
