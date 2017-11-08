import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hd-start',
  template: `
    <hd-main-toolbar titleImg="assets/logo.png" [showSidenavToggle]='false' theme='light'>
        <!-- BEGIN: Topbar -->
        <hd-main-toolbar-right-menu>
            <li hd-main-toolbar-notification></li>
            <li hd-main-toolbar-chat></li>
            <li hd-main-toolbar-profile></li>
        </hd-main-toolbar-right-menu>
        <!-- END: Topbar -->
    </hd-main-toolbar>
    <hd-start-page
        copyright='&copy; 2017 humadev angular theme author'
        [menus]="startMenus"></hd-start-page>
  `,
  styles: []
})
export class StartComponent {

      startMenus = this.router.config;

      constructor(
            private router: Router
      ) {}
}
