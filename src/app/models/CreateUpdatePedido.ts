import { Estado } from "../Helpers/Enums";

export interface CreateUpdatePedido{
  NumeroPedido: String,
  PrecioTotal: number,
  FechaPedido: Date,
  Estado: Estado,
  Observaciones: String
}

