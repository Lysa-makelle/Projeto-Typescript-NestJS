import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { CriarItemPedido, CriarPedidoDTO } from './create-order.dto';
import { ImpostoService } from '../imposto/imposto.service';
import { OrderController } from './order.controller';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers : [OrderController],
      providers: [OrderService , ImpostoService],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });


  it('deve criar um novo pedido e calcular o imposto corretamente ', () => {
    const criarPedido: CriarPedidoDTO = { 
      itens: [ {
        nome: 'perfume',
       tipo: 'produto',
       descricao: 'perfume muito cheiroso',
        preco: 150
      }
      
      ]
      
    }
  
      const salvarPedido = service.criarPedido(criarPedido);
      expect(salvarPedido.itens[0].precoComImposto).toBe(165);




  });





      it ('listar pedidos' ,  () => { 
        service.criarPedido ({
          itens: [
            {
              nome: 'smartphone',
              tipo: 'produto',
              descricao: 'ultima geração',
              preco: 3000
            }
          ]
        }
        )
         expect (service.listarPedidos().length).toBeGreaterThan(0)
      });



      it ('adicionar item ao pedido' , () => {
        const salvarPedido = service.criarPedido({
        itens: [
          {
             nome: 'camisa',
      tipo: 'produto',
      descricao: 'camisa preta',
      preco: 100,
          },
        ],
          });


        const id = salvarPedido.id;
    
          const novosItens: CriarItemPedido[] = [
            {
              nome: 'casa alugada',
              tipo: 'locação',
              descricao: 'casa com tres quartos e um deles com suite',
              preco: 1500
            },
          ];      
      
      const pedidoAtualizado = service.adicionarItemPedido(id , novosItens);
        expect (pedidoAtualizado.itens.length). toBe(2);
      });
    
       


        it ('buscar pedido por ID' , () => {
          const salvarPedido = service.criarPedido({
            itens: [
              {
                nome: 'limpar uma casa',
                tipo: 'serviço',
                descricao: 'tres vezes na semana',
                preco: 500
              }
            ]
          });

          const id = salvarPedido.id;

          const buscarPedido= service.buscarPorId(id)
        expect(buscarPedido).toBeDefined()
        
        
        
        });
}) ;
