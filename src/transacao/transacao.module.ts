
import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Transacao, TransacaoSchema} from './transacao.schema.js';
import { TransacaoController} from './transacao.controller.js';
import { TransacaoService} from './transacao.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([

      {
        name: Transacao.name,
        schema: TransacaoSchema,
      },
    ]),

  ],


  controllers: [TransacaoController],
  providers: [TransacaoService],

})

export class TransacaoModule {}