import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'groups',
        children: [
          {
            path: '',
            loadChildren: '../groups/groups.module#GroupsPageModule'
          },
          {
            path: 'group-details',
            loadChildren: '../group-details/group-details.module#GroupDetailsPageModule'
          },
          {
            path: 'create-group',
            loadChildren: '../create-group/create-group.module#CreateGroupPageModule'
          },
          {
            path: 'add-user',
            loadChildren: '../add-user/add-user.module#AddUserPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings/settings.module#SettingsPageModule'
          }
        ]
      }
    ]
  },
  {
    path: 'tabs',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
