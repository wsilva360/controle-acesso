import { Injectable, Injector } from '@angular/core';
import { Dashboard } from "./dashboard.model";

import { API_CONFIG } from "../../../config/api.config";
import { BaseResourceService } from "../../../shared/services/base-resource.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseResourceService<Dashboard> {

  // CONSTRUTOR
  constructor(protected injector: Injector) {
    super(API_CONFIG.baseUrl_GSI + "dashboard", injector, Dashboard.fromJson);
  }

}