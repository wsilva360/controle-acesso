import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';


@NgModule({
  declarations: [DashboardViewComponent],
  imports: [
    SharedModule,
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { }
