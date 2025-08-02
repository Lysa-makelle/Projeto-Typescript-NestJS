import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CriarItemPedido, CriarPedidoDTO } from './create-order.dto';
import { OrderService } from './order.service';





@Controller('orders')
export class OrderController { 
    constructor (private readonly orderService: OrderService ) {}

    
    @Post()
    ChamarMetodo(@Body() dados: CriarPedidoDTO) {
        return this.orderService.criarPedido(dados);
    }
    @Get()
    ChamarPedido() {
        return this.orderService.listarPedidos();
    }
    @Get (':id')
    BuscarID(@Param('id') id: string){
        return this.orderService.buscarPorId(Number(id));
    }

    @Get ('calcular/:id' )
    calcularTotal(@Param('id') id: string) {
        return this.orderService.calcularTotaldoPedido(Number(id));
    }

    @Post(':id/itens')
    Adicionaritem(@Param('id') id: string, @Body()novositens: CriarItemPedido[]){
       return this.orderService.adicionarItemPedido(Number(id), novositens);
    }
     
}
 