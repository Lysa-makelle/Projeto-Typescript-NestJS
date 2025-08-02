import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarItemPedido, CriarPedidoDTO } from './create-order.dto';
import { ImpostoService } from '../imposto/imposto.service';
import { error } from 'console';
import { throwError } from 'rxjs';



@Injectable()
export class OrderService {
    private pedidos: any[] = []
    constructor(private impostoService: ImpostoService){}
    criarPedido (dados: CriarPedidoDTO) {
         const novoID = this.pedidos.length +1;
        const itemComImposto = dados.itens.map (item => { 
            const imposto = this.impostoService.calcularImposto(item.tipo , item.preco) ;

            const totalcomImposto = item.preco + imposto; 
         
                return {
                nome: item.nome,
                tipo: item.tipo, 
                preco: item.preco, 
                descricao: item.descricao,
                precoComImposto: totalcomImposto 

                } ;
        
        } )

    

    const novoPedido = {
        id: novoID,
        itens: itemComImposto
    };

    this.pedidos.push(novoPedido);
    return novoPedido;
  }



    listarPedidos() {
        return this.pedidos
    }




       adicionarItemPedido(id: number, novosItens: CriarItemPedido[]) {

    const novosItensComImposto = novosItens.map(item => {
            var imposto = 0 ; 

            if(item.tipo === 'produto'){
                imposto = item.preco * 0.10;
            } else if(item.tipo === 'serviço') {
                imposto = item.preco * 0.075;
            } else {
                 imposto = item.preco * 0.05 ;
            }

            const TotalComImposto = item.preco + imposto ;

            return {
                nome: item.nome,
                tipo: item.tipo,
                preco: item.preco, 
                descricao: item.descricao,
                precoComImposto:  TotalComImposto 
            } ;
        })

         const pedido = this.pedidos.find(p => p.id === id);

         if( pedido ) {
            pedido.itens.push(...novosItensComImposto); 
            return pedido;
         } else {
            throw new NotFoundException ( "pedido não encontrado") 
         }


       };

       buscarPorId(id: number) {
         const pedido = this.pedidos.find(p => p.id === id);

         if (!pedido){
          throw new  error('Pedido não encontrado')
         } else {
            return pedido;
         }
       }



       calcularTotaldoPedido(id: number ) {
        const pedido = this.pedidos.find(p => p.id === id );
         if (!pedido) {
    throw new NotFoundException('Pedido não encontrado');
  }
       const total = pedido.itens.reduce( (_soma, item) => {
        return _soma + (item.precoComImposto || 0 );
       }, 0 )
       return {
        PedidoId: id, 
       totalComImposto: total 
       } ;
       }
    
    
 
    
}




       
     
      

    

