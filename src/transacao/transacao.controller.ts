import {Controller, Post, Get, Body} from '@nestjs/common';
import {TransacaoService } from './transacao.service.js';
import {Transacao } from './transacao.schema.js';

@Controller('transacoes')
export class TransacaoController {
  constructor(
    private readonly transacaoService: TransacaoService,

  ) {}

  @Post()
  criar(@Body() dados: Partial<Transacao>) {

    return this.transacaoService.criar(dados);
  }

  @Get()
  listar() {

    return this.transacaoService.listar();

  }
}