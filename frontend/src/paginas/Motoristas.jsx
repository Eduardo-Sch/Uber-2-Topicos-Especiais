import "./Cadastros.css";
import axios from "axios";
import Aside from "../layout/Aside";
import { useState, useEffect } from "react";

function Motoristas() {
  //Entidades e listas utilizadas na página
  const [motorista, setMotorista] = useState(null);
  const [motoristas, setMotoristas] = useState([]);

  //Funções de carregamento de dados do backend
  function getMotoristas() {
    axios.get("http://localhost:3005/motoristas").then((resposta) => {
      setMotoristas(resposta.data);
    });
  }

  useEffect(() => {
    getMotoristas();
  }, []);

  //Funções para manipulação da entidade principal
  function novoMotorista() {
    setMotorista({
      _id: null, // Defina o _id como null ao criar um novo Motorista
      nome: "",
      telefone: "",
      email: "",
      avaliacao: "",
    });
  }

  function alterarMotorista (campo, valor, id) {
    setMotorista((prevMotorista) => ({
      ...prevMotorista,
      _id: id,
      [campo]: valor,
    }));
  }

  function excluirMotorista(id) {
    axios.delete("http://localhost:3005/motoristas/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarMotorista() {
    if (motorista._id) {
      axios.put("http://localhost:3005/motoristas/" + motorista._id, motorista).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3005/motoristas", motorista).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setMotorista(null);
    getMotoristas();
  }

  //Função para geração do formulário
  function getFormulario() {
    return (
      <form>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={motorista.nome}
          onChange={(e) => {
            alterarMotorista(e.target.name, e.target.value, motorista._id);
          }}
        />
  
        <label>Telefone</label>
        <input
          type="text"
          name="telefone"
          value={motorista.telefone}
          onChange={(e) => {
            alterarMotorista(e.target.name, e.target.value, motorista._id);
          }}
        />
  
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={motorista.email}
          onChange={(e) => {
            alterarMotorista(e.target.name, e.target.value, motorista._id);
          }}
        />
  
        <label>Avaliação</label>
        <input
          type="number"
          name="avaliacao"
          value={motorista.avaliacao}
          onChange={(e) => {
            alterarMotorista(e.target.name, e.target.value, motorista._id);
          }}
        />

  
        <button
          type="button"
          onClick={() => {
            salvarMotorista();
          }}
        >
          Salvar
        </button>
        
        <button
          type="button"
          onClick={() => {
            setMotorista(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  //Funções para geração da tabela
  function getLinhaDaTabela(motorista) {
    return (
      <tr key={motorista._id}>
        <td>{motorista._id}</td>
        <td>{motorista.nome}</td>
        <td>{motorista.telefone}</td>
        <td>{motorista.email}</td>
        <td>{motorista.avaliacao}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão do Motorista " + motorista.nome + "?"
                )
              ) {
                excluirMotorista(motorista._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              setMotorista(motorista);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    const linhasDaTabela = [];
    for (let i = 0; i < motoristas.length; i++) {
      const motorista = motoristas[i];
      linhasDaTabela[i] = getLinhaDaTabela(motorista);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Avaliaçao</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  //Função do conteúdo principal
  function getConteudo() {
    if (motorista == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novoMotorista();
            }}
          >
            Novo Motorista
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="motoristas">
      <Aside />
      <div className="conteudo">
        <h2>Cadastro de Clientes</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Motoristas;
