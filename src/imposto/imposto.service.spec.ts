import { Test, TestingModule } from '@nestjs/testing';
import { ImpostoService } from './imposto.service';

describe('ImpostoService', () => {
  let service: ImpostoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImpostoService],
    }).compile();

    service = module.get<ImpostoService>(ImpostoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
