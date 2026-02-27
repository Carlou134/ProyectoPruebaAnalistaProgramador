import { Routes } from '@angular/router';
import { Pedidos } from './components/pedidos/pedidos';
import { Creaedita } from './components/pedidos/creaedita/creaedita';

export const routes: Routes = [
  { path: 'pedidos', component: Pedidos},
  { path: 'pedidos/nuevo', component: Creaedita },
  { path: 'pedidos/editar/:id', component: Creaedita}
];
