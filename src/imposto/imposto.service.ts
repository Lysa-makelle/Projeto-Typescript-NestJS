import { Injectable } from '@nestjs/common';


@Injectable()
export class ImpostoService {
    calcularImposto(tipo: string, preco: number): number {
        if (tipo === 'produto')  {
            return preco * 0.10 ;
        }
            
        

         if (tipo === 'serviço') {
            return preco * 0.075 ;
        
         }
            

        if (tipo === 'locação') {
            return  preco * 0.05;
        } 
            
        return 0 ;
        
} 
} 
