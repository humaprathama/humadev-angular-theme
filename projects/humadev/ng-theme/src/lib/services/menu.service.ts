import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { LayoutService } from './layout.service';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  pageTitle = new BehaviorSubject<string>('');
  lazyLoad = true;
  sidenav = new BehaviorSubject([]);
  moduleIndex = new Subject<number>();
  startMenu = [];
  moduleActive = new Subject<string>();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private loc: Location,
    private _ls: LayoutService
  ) {
    this.router.events
      .pipe(
        map(event => {
          if (loc.path() !== '') {
            const modulePath = loc.path().split('/')[1];
            this.moduleActive.next(modulePath);
            this.router.config.forEach((el, i) => {
              if (el.path === modulePath) {
                this.moduleIndex.next(i);
              }
            });
          }
          return event;
        }),
        filter(event => event instanceof NavigationEnd),
        map(() => this.activeRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data)
      )
      .subscribe(res => {
        this._ls.pageTitle.next(res.name);
        this.pageTitle.next(res.name);
      });
    if (this.lazyLoad) {
      this.moduleIndex.subscribe(res => {
        if (this.router.config[res]['_loadedConfig']) {
          this.sidenav.next(
            this.router.config[res]['_loadedConfig'].routes[0].children
          );
        }
      });
    } else {
      this.sidenav.next(this.router.config);
    }

    this.startMenu = this.router.config;
  }

  navigate(url: string) {
    this.router.navigate(['/' + url]);
  }
}
