import { Pedido } from './../../models/Pedido';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PedidosService } from '../../services/pedidos-service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-pedidos',
  imports: [MatButtonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit, OnDestroy {
  displayedColumns: string[] = ['Id', 'NumeroPedido', 'PrecioTotal',
    'FechaPedido', 'Estado', 'Observaciones', 'acciones'];
  dataSource = new MatTableDataSource<Pedido>()
  private sub!:Subscription
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private pS: PedidosService){}

  ngOnInit(): void {
    this.sub = this.pS.getPedidos().subscribe(pedidos => this.dataSource.data = pedidos)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
