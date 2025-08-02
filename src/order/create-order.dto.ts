import { IsString, IsNumber, ValidateNested, Min, IsIn, Length } from 'class-validator';
import { Type } from 'class-transformer';






  export class CriarItemPedido {
      @IsString()
  nome: string;

    @IsString()
    @IsIn([
      'produto', 'serviço','locação' ])
      tipo: 'produto' | 'serviço' | 'locação';

      @IsString()
      @Length(10,200)
    descricao: string;
    
      @Type(() => Number)
  @IsNumber()
  
  @Min(1)
  preco: number;
}
  

  export class CriarPedidoDTO {
  @ValidateNested({ each: true })
  @Type(() => CriarItemPedido)
  itens: CriarItemPedido[];
}

 