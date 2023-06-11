import "./Cadastros.css";
import axios from "axios";
import Aside from "../layout/Aside";
import { useState, useEffect } from "react";

function Cadastros() {
  //Entidades e listas utilizadas na página
  const [cliente, setCliente] = useState(null);
  const [clientes, setClientes] = useState([]);

  //Funções de carregamento de dados do backend
  function getClientes() {
    axios.get("http://localhost:3005/clientes").then((resposta) => {
      setClientes(resposta.data);
    });
  }

  useEffect(() => {
    getClientes();
  }, []);

  //Funções para manipulação da entidade principal
  function novoCliente() {
    setCliente({
      _id: null, // Defina o _id como null ao criar um novo cliente
      nome: "",
      telefone: "",
      email: "",
      avaliacao: "",
    });
  }

  function alterarCliente(campo, valor, id) {
    setCliente((prevCliente) => ({
      ...prevCliente,
      _id: id,
      [campo]: valor,
    }));
  }

  function excluirCliente(id) {
    axios.delete("http://localhost:3005/clientes/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarCliente() {
    if (cliente._id) {
      axios.put("http://localhost:3005/clientes/" + cliente._id, cliente).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3005/clientes", cliente).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setCliente(null);
    getClientes();
  }

  //Função para geração do formulário
  function getFormulario() {
    return (
      <form>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={(e) => {
            alterarCliente(e.target.name, e.target.value, cliente._id);
          }}
        />
  
        <label>Telefone</label>
        <input
          type="text"
          name="telefone"
          value={cliente.telefone}
          onChange={(e) => {
            alterarCliente(e.target.name, e.target.value, cliente._id);
          }}
        />
  
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={cliente.email}
          onChange={(e) => {
            alterarCliente(e.target.name, e.target.value, cliente._id);
          }}
        />
  
        <label>Avaliação</label>
        <input
          type="number"
          name="avaliacao"
          value={cliente.avaliacao}
          onChange={(e) => {
            alterarCliente(e.target.name, e.target.value, cliente._id);
          }}
        />
  
        <button
          type="button"
          onClick={() => {
            salvarCliente();
          }}
        >
          Salvar
        </button>
        
        <button
          type="button"
          onClick={() => {
            setCliente(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  //Funções para geração da tabela
  function getLinhaDaTabela(cliente) {
    return (
      <tr key={cliente._id}>
        <td>{cliente._id}</td>
        <td>{cliente.nome}</td>
        <td>{cliente.telefone}</td>
        <td>{cliente.email}</td>
        <td>{cliente.avaliacao}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da área " + cliente.nome + "?"
                )
              ) {
                excluirCliente(cliente._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              setCliente(cliente);
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
    for (let i = 0; i < clientes.length; i++) {
      const cliente = clientes[i];
      linhasDaTabela[i] = getLinhaDaTabela(cliente);
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
    if (cliente == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novoCliente();
            }}
          >
            Novo cliente
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="cadastros">
      <Aside />
      <div className="conteudo">
        <h2>Cadastro de Clientes</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Cadastros;
