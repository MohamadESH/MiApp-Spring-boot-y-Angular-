import { Routes } from '@angular/router';
import { ListCapituloComponent } from './pages/capitulo-pages/list-capitulo/list-capitulo.component';
import { EditarCapituloComponent } from './pages/capitulo-pages/editar-capitulo/editar-capitulo.component';
import { CrearCapituloComponent } from './pages/capitulo-pages/crear-capitulo/crear-capitulo.component';
import { ListPersonajeComponent } from './pages/personaje-page/list-personaje/list-personaje.component';
import { EditarPersonajeComponent } from './pages/personaje-page/editar-personaje/editar-personaje.component';
import { CrearPersonajeComponent } from './pages/personaje-page/crear-personaje/crear-personaje.component';
import { ListSerieComponent } from './pages/serie-page/list-serie/list-serie.component';
import { EditarSerieComponent } from './pages/serie-page/editar-serie/editar-serie.component';
import { CrearSerieComponent } from './pages/serie-page/crear-serie/crear-serie.component';

export const routes: Routes = [
  {
    path:'personajes',
    title: "Personajes",
    component: ListPersonajeComponent
    // loadComponent: () => import("./pages/personajes-pages/personaje-page/personajes-page.component"),
  },
  {
    path:"editar-personajes/:id",
    title:"Editar Personaje",
    component: EditarPersonajeComponent
    // loadComponent: () => import("./pages/personajes-pages/editar-page/editar-page.component")
  },
  {
    path:"crear-personajes",
    title:"Crear Personaje",
    component: CrearPersonajeComponent
    // loadComponent: () => import("./pages/personajes-pages/crear-dialog/crear-dialog.component")
  },
  {
    path:'capitulos',
    title: "Capitulos",
    component: ListCapituloComponent
  },
  {
    path:'editar-capitulos/:id',
    title: "Editar Capitulos",
    component: EditarCapituloComponent
  },
  {
    path:'crear-capitulos',
    title: "Crear Capitulos",
    component: CrearCapituloComponent
  },
  {
    path:'series',
    title: "Series",
    component: ListSerieComponent
    // loadComponent: () => import("./pages/series-pages/serie-page/series-page.component"),
  },
  {
    path:"editar-series/:id",
    title:"Editar Serie",
    component: EditarSerieComponent
    // loadComponent: () => import("./pages/series-pages/editar-page/editar-page.component")
  },
  {
    path:"crear-series",
    title:"Crear Serie",
    component: CrearSerieComponent
    // loadComponent: () => import("./pages/series-pages/crear-page/crear-page.component")
  },
  {
    path:'',
    redirectTo: 'capitulos',
    pathMatch: 'full',
  },
  {
    path:'**',
    redirectTo: 'personajes',
  }
];
