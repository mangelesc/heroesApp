import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  // Las urls las tengo definidas en el router link
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url:'./list' },
    { label: 'Añadir', icon: 'add', url:'./new-hero' },
    { label: 'Buscar', icon: 'search', url:'./search' },
  ]


}
