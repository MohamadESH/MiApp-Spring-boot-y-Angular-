import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'tab-menu-component',
  standalone: true,
  imports: [TabMenuModule,CommonModule],
  templateUrl: './tab-menu.component.html',
})
export class TabMenuComponent implements OnInit{
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
        { label: 'Personajes', icon: 'pi pi-user', route: '/personajes' },
        { label: 'Capitulos', icon: 'pi pi-file', route: '/capitulos' },
        { label: 'Series', icon: 'pi pi-book', route: '/series' },
    ];
}

}
