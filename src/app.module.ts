import {Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TransacaoModule} from './transacao/transacao.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({

      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');

        if (!uri) {
          throw new Error('MONGODB_URI não foi encontrada no arquivo .env');
        }

        return {uri };
      },
    }),

     TransacaoModule,
  ],
})
export class AppModule {}