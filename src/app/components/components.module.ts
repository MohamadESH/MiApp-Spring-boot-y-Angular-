import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './search-box/search-box.component';
import { TableModule } from 'primeng/table';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    CommonModule,
    DropdownModule,
    FloatLabelModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ListboxModule,
    ReactiveFormsModule,
    SearchBoxComponent,
    TableModule,
    TabMenuComponent,

  ],
  exports:[
    ButtonModule,
    CommonModule,
    DropdownModule,
    FloatLabelModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ListboxModule,
    ReactiveFormsModule,
    SearchBoxComponent,
    TableModule,
    TabMenuComponent,

  ]
})
export class ComponentsModule { }
