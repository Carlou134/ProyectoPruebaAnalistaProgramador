import { Estado } from "../Helpers/Enums";

export interface Pedido{
  Id: number,
  NumeroPedido: string,
  PrecioTotal: number,
  FechaPedido: Date,
  Estado: Estado,
  Observaciones: String,
  FechaCreacion: Date,
  FechaActualizacion: Date
}


