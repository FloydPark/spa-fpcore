import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IDGeneratorService{

    private API_BASE_RESOURCE_URL = environment.api_fpcore_maestros_host+environment.id_generator_api_v1_base_resource;

    constructor(private httpClient: HttpClient) { }

    public getIdByPrefix(prefix:string){

        return this.httpClient.get(this.API_BASE_RESOURCE_URL+prefix+"/next");
    }
}