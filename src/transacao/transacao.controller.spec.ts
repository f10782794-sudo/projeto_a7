import {Test, TestingModule} from '@nestjs/testing';
import { TransacaoController} from './transacao.controller.js';

describe('TrasacaoController', () => {
  let controller: TransacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ TransacaoController],

    }).compile();


    controller = module.get<TransacaoController>(TransacaoController);

  });

  it('should be defined', () => {

    expect(controller).toBeDefined();

  });
});
