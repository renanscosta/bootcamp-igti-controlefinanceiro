import React, { useState, useEffect } from 'react';
import Data from './components/Data';
import * as totalizador from './helper/totalizador';
import * as api from './api/apiService';
import Summary from './components/Summary';
import Actions from './components/Actions';
import Transactions from './components/Transactions';

const somatorio_zerado = {
  lancamentos: 0,
  receitas: 0,
  despesas: 0,
  saldo: 0
}

export default function App() {

  const [allTransactions, setAllTransactions] = useState([]);
  const [filtredTransactions, setFilteredTransactions] = useState([]);
  const [somatorio, setSomatorio] = useState(somatorio_zerado);
  const [periodoCorrente, setPeriodoCorrente] = useState(null);
  const [filtro, setFiltro] = useState('');

  const obterPeriodo = (periodo) => {
    setPeriodoCorrente(periodo);

  };

  const handleFilter = (valor) => {
    setFiltro(valor);
  }

  useEffect(() => {
    const obterTransacoesAPI = async () => {

      if (periodoCorrente === "--") {
        setAllTransactions([]);
        setSomatorio(somatorio_zerado)
        return;
      }

      const transacoes = await api.getAllTransactions(periodoCorrente);
      setAllTransactions(transacoes);

      const somatorio_aux = totalizador.calcular(transacoes);
      setSomatorio(somatorio_aux);

    }
    obterTransacoesAPI(periodoCorrente);

  }, [periodoCorrente])

  useEffect(() => {


    if (filtro.trim() !== '') {
      const textLowerCase = filtro.toLowerCase();

      const newFiltredTransactions = allTransactions.filter((t) => {
        return t.description.toLowerCase().includes(textLowerCase);
      });

      setFilteredTransactions(newFiltredTransactions);
    }
    else {
      setFilteredTransactions([...allTransactions]);
    }
    console.log(filtro);
    console.log(allTransactions);

  }, [filtro, allTransactions]);

  return (
    <div className='container'>
      <div>
        <h2 className="center">Bootcamp Full Stack - Desafio final</h2>
        <h3 className="center">Controle Financeiro Pessoal</h3>
      </div>

      <Data carregarPeriodo={obterPeriodo} />
      <Summary somatorio={somatorio} />
      <Actions handleFilter={handleFilter} />
      <Transactions transactions={filtredTransactions} />
    </div>
  );
}
