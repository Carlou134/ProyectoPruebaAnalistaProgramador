import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Pedido } from '../models/Pedido';
import { CreateUpdatePedido } from '../models/CreateUpdatePedido';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private readonly url:string = `${environment.url}/api`;

  constructor(private http:HttpClient){}

  getPedidos(){
    return this.http.get<Pedido[]>(`${this.url}/Pedidos/list`);
  }

  CreatePedido(pedido: CreateUpdatePedido){
    return this.http.post<void>(`${this.url}/Pedidos/create`, pedido);
  }

  UpdatePedido(pedido: CreateUpdatePedido, Id: number){
    return this.http.put<void>(`${this.url}/Pedidos/update/${Id}`, pedido);
  }

  DeletePedido(Id: number){
    return this.http.delete<void>(`${this.url}/Pedidos/delete/${Id}`);
  }

  getPedidosById(Id: number){
    return this.http.get<Pedido>(`${this.url}/Pedidos/list/${Id}`);
  }
}
