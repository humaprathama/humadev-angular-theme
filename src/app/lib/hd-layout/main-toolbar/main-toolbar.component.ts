import { LayoutService } from './../../services/layout.service';
import {Overlay, OverlayOrigin, OverlayConfig} from '@angular/cdk/overlay';
import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ViewContainerRef,
    QueryList,
    ViewChildren,
    ElementRef, ComponentRef, Renderer2 } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { ComponentPortal, Portal, TemplatePortalDirective } from '@angular/cdk/portal';
import { PopMenuDirective } from '../../directives/pop-menu.directive';

@Component({
    selector: 'hd-main-toolbar',
    templateUrl: 'main-toolbar.component.html',
    styleUrls: ['main-toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class MainToolbarComponent implements OnInit {
      @Input() notification = false;
      @Input() notificationList: Array<any>;
      @Input() profile = true;
      @Input() showSidenavToggle = true;
      @Output() sidenavToggle = new EventEmitter();
      @Output() logout = new EventEmitter();
      @Input() titleText = 'Humadev Theme';
      @Input() titleImg: string;
      @Input() theme: 'default' | 'dark' | 'light' = 'dark';
      @ViewChild('mainMenu') menu: OverlayOrigin;
      @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;
      active;
      accountOpen = false;
      notificationOpen = false;
      messageOpen = false;
      topMenuOpen = false;
      brandClass = {
        minimize: false
      };
      brandBackground = '#282a3c';
      brandToggle = {
          'toggler-right': false,
          'toggler-left': true
      };
      sidenav = true;
      progressBar = false;
      @Output() minimize = new EventEmitter();

      constructor(
            private menuService: MenuService,
            private renderer: Renderer2,
            private elRef: ElementRef,
            private layout: LayoutService
      ) {
      }

      ngOnInit() {
            this.menuService.moduleActive.subscribe(res => {
                  this.active = res;
            });
            if (this.theme === 'dark') {
                this.brandBackground = '#282a3c';
            } else {
                this.brandBackground = '#ffffff';
            }

            this.layout.topProgressBar.subscribe((progress) => this.progressBar = progress);
      }

      toggleSidenav() {
        if (this.sidenav) {
            this.brandToggle['toggler-right'] = true;
            this.brandToggle['toggler-left'] = false;
        }else {
            this.brandToggle['toggler-right'] = false;
            this.brandToggle['toggler-left'] = true;
        }
        this.sidenav = !this.sidenav;
        this.layout.sidebarOpen.next(this.sidenav);
        this.brandClass.minimize = !this.sidenav;
      }

      onSidenavToggle() {
            this.sidenavToggle.emit();
      }

      onLogout() {
            this.logout.emit();
      }

      onChange(e) {
            this.menuService.navigate(e.value);
      }
}
