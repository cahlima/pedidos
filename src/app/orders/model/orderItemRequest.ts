import { ItemPedidoRequest } from './ItemPedidoRequest';

export interface OrderItemRequest {
  itensDoPedido: ItemPedidoRequest;
  cpf: String;
}
