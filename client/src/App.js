import React, { useState, useEffect } from 'react';
import Data from './components/Data';
import * as totalizador from './helper/totalizador';
import * as api from './api/apiService';
import Summary from './components/Summary';
import Actions from './components/Actions';
import Transactions from './components/Transactions';
import ModalTransaction from './components/ModalTransaction';
import Waiting from './components/Waiting';

const somatorio_zerado = {
  lancamentos: 0,
  receitas: 0,
  despesas: 0,
  saldo: 0
}

function sortTransactions(transactions) {
  return transactions.sort((a, b) =>
    a.yearMonthDay.localeCompare(b.yearMonthDay)
  );
}

export default function App() {
  const dtHoje = new Date();
  const hoje = `${dtHoje.getFullYear().toString()}-${(dtHoje.getMonth() + 1).toString().padStart(2, '0')}`;

  const [allTransactions, setAllTransactions] = useState([]);
  const [filtredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [somatorio, setSomatorio] = useState(somatorio_zerado);
  const [periodoCorrente, setPeriodoCorrente] = useState(hoje);
  const [filtro, setFiltro] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const obterPeriodo = (periodo) => {
    setPeriodoCorrente(periodo);

  };

  const handleFilter = (valor) => {
    setFiltro(valor);
  }

  const handleDeleteTransaction = async (id) => {
    await api.deleteTransaction(id);

    const newTransactions = allTransactions.filter(
      (transaction) => transaction._id !== id
    );

    setAllTransactions(newTransactions);
    setFilteredTransactions(newTransactions);
  };

  const handleEditTransaction = (id) => {
    const newSelectedTransaction = allTransactions.find(
      (transaction) => transaction._id === id
    );

    setSelectedTransaction(newSelectedTransaction);
    setIsModalOpen(true);
  };

  const handleInsertTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const handleModalSave = async (newTransaction, mode) => {
    setIsModalOpen(false);
    if (mode === 'insert') {
      const postedTransaction = await api.postTransaction(newTransaction);

      let newTransactions = [...allTransactions, postedTransaction];
      newTransactions = sortTransactions(newTransactions);
      setAllTransactions(newTransactions);
      setFilteredTransactions(newTransactions);
      setSelectedTransaction(null);

      return;
    }

    if (mode === 'edit') {
      const updatedTransaction = await api.updateTransaction(newTransaction);
      const newTransactions = [...allTransactions];

      const index = newTransactions.findIndex(
        (transaction) => transaction._id === newTransaction._id
      );

      newTransactions[index] = updatedTransaction;
      setAllTransactions(newTransactions);
      setFilteredTransactions(newTransactions);

      return;
    }
  };

  useEffect(() => {
    const obterTransacoesAPI = async () => {

      if (periodoCorrente === "--") {
        setAllTransactions([]);
        setSomatorio(somatorio_zerado)
        return;
      }

      setAllTransactions([]);
      setSomatorio(somatorio_zerado)

      const transacoes = await api.getAllTransactions(periodoCorrente);
      setAllTransactions(sortTransactions(transacoes));

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

  }, [filtro, allTransactions]);

  useEffect(() => {

    if (filtredTransactions.length === 0) {
      setSomatorio(somatorio_zerado);
      return;
    }

    const somatorio_aux = totalizador.calcular(filtredTransactions);
    setSomatorio(somatorio_aux);

  }, [filtredTransactions]);

  return (
    <div className='container'>
      <div>
        <h2 className="center">Bootcamp Full Stack - Desafio final</h2>
        <h3 className="center">Controle Financeiro Pessoal</h3>
      </div>

      {!isModalOpen && (
        <Data carregarPeriodo={obterPeriodo} peridoAnterior={periodoCorrente} />
      )}

      {allTransactions.length === 0 && <Waiting>Aguarde...</Waiting>}

      {allTransactions.length > 0 && (
        <>
          <Summary somatorio={somatorio} />
          {!isModalOpen && (
            <Actions handleFilter={handleFilter}
              filterText={filtro}
              onNewTransaction={handleInsertTransaction}
              isModalOpen={isModalOpen} />
          )}
          <Transactions
            transactions={filtredTransactions}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleEditTransaction} />
        </>
      )}

      {isModalOpen && (
        <ModalTransaction
          isOpen={isModalOpen}
          selectedTransaction={selectedTransaction}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
}
