
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao, TransacaoDocument } from './transacao.schema.js';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectModel(Transacao.name)
    private transacaoModel: Model<TransacaoDocument>,
  ) {}

  async criar(dados: Partial<Transacao>) {
    const novaTransacao = new this.transacaoModel(dados);
    return novaTransacao.save();
  }

  async listar() {
    const historico = await this.transacaoModel.find().exec();

    const receitas = historico
      .filter((t) => t.tipo === 'receita')
      .reduce((total, t) => total + t.valor, 0);

    const despesas = historico
      .filter((t) => t.tipo === 'despesa');

    const totalDespesas = despesas
      .reduce((total, t) => total + t.valor, 0);

    const totalGastoImpulso = despesas
      .filter((t) => t.consumoConsciente === false)
      .reduce((total, t) => total + t.valor, 0);

    const saldoTotal = receitas - totalDespesas;

    return {
      historico,
      metricas: {
        saldoTotal,
        totalDespesas,
        totalGastoImpulso,
      },
    };
  }
}
