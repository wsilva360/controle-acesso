import { Injectable, Injector } from '@angular/core';

import { Agendamento } from "./agendamento.model";

import { API_CONFIG } from "../../../config/api.config";
import { BaseResourceService } from "../../../shared/services/base-resource.service";

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService extends BaseResourceService<Agendamento> {

  // CONSTRUTOR
  constructor(protected injector: Injector) {
    super(API_CONFIG.baseUrl_MV + "agendamento", injector, Agendamento.fromJson);

    console.log("[INFO][SHARED][AGENDAMENTO.SERVICE] - [constructor]: ");
  }

}