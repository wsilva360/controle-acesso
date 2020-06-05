import { Injectable, Injector } from '@angular/core';
import { Error } from "./error.model";

import { API_CONFIG } from "../../../config/api.config";
import { BaseResourceService } from "../../../shared/services/base-resource.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService extends BaseResourceService<Error> {

  // CONSTRUTOR
  constructor(protected injector: Injector) {
    super(API_CONFIG.baseUrl_GSI + "error", injector, Error.fromJson);
  }

}