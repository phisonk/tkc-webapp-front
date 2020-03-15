import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AddsensorComponent } from '../../addsensor/addsensor.component';
import { IconsComponent } from '../../icons/icons.component';
import { UserComponent} from '../../user/user.component';
import { UserResolver } from 'src/app/user/user.resolver';
export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent ,resolve: { data: UserResolver}},
    { path: 'addsensor',      component: AddsensorComponent ,resolve: { data: UserResolver}},
    { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
    { path: 'icons',          component: IconsComponent ,resolve: { data: UserResolver}}
];
