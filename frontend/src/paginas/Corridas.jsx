import "./Corrida.css";
import axios from "axios";
import Aside from "../layout/Aside";
import { useState, useEffect } from "react";
import Select from "react-select";

const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    margin: 0,
    padding: "5px 0",
    borderRadius: 3,
    borderColor: "gray",
    boxShadow: state.isFocused ? "0 0 0 2px black" : 0,
    ":hover": { borderColor: "black" },
  }),
};

function Corridas() {
  const [corrida, setCorrida] = useState(null);
  const [corridas, setCorridas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionados, setClienteSelecionados] = useState([]);
  const [motoristas, setMotoristas] = useState([]);
  const [motoristasSelecionados, setMotoristasSelecionados] = useState([]);

  function getCorridas() {
    axios.get("http://localhost:3005/corridas").then((resposta) => {
      setCorridas(resposta.data);
    });
  }

  function getMotoristas() {
    axios.get("http://localhost:3005/motoristas").then((resposta) => {
      setMotoristas(resposta.data);
    });
  }

  function getClientes() {
    axios.get("http://localhost:3005/clientes").then((resposta) => {
      setClientes(resposta.data);
    });
  }

  useEffect(() => {
    getClientes();
    getCorridas();
    getMotoristas();
  }, []);

  function novaCorrida() {
    setCorrida({
      _id: null,
      pontoPartida: "",
      pontoChegada: "",
      clientes: [],
      motoristas: [],
    });
  }

  function alterarCorrida(campo, valor, id) {
    setCorrida((corrida) => ({
      ...corrida,
      _id: id,
      [campo]: valor,
    }));
  }

  function excluirCorrida(id) {
    axios.delete("http://localhost:3005/corridas/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarCorrida() {
    if (corrida._id) {
      axios.put("http://localhost:3005/corridas/" + corrida._id, corrida).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3005/corridas", corrida).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setCorrida(null);
    getCorridas();
    setClienteSelecionados([]);
    setMotoristasSelecionados([]);
  }

  function getSelectClientes() {
    const options = clientes.map((cliente) => ({
      value: cliente._id,
      label: cliente.nome,
    }));

    return (
      <Select
        isMulti
        isClearable={false}
        value={clienteSelecionados}
        onChange={onChangeSelectClientes}
        options={options}
        styles={selectStyles}
      />
    );
  }

  function onChangeSelectClientes(valores) {
    setClienteSelecionados(valores);
    const clientesIds = valores.map((cliente) => cliente.value);
    alterarCorrida("clientes", clientesIds, corrida?._id);
  }

  function getSelectMotoristas() {
    const options = motoristas.map((motorista) => ({
      value: motorista._id,
      label: motorista.nome,
    }));

    return (
      <Select
        isMulti
        isClearable={false}
        value={motoristasSelecionados}
        onChange={onChangeSelectMotoristas}
        options={options}
        styles={selectStyles}
      />
    );
  }

  function onChangeSelectMotoristas(valores) {
    setMotoristasSelecionados(valores);
    const motoristasIds = valores.map((motorista) => motorista.value);
    alterarCorrida("motoristas", motoristasIds, corrida?._id);
  }

  function getFormulario() {
    return (
      <form>
        <label>Ponto de partida</label>
        <input
          type="text"
          name="pontoPartida"
          value={corrida?.pontoPartida ?? ''}
          onChange={(e) => {
            alterarCorrida(e.target.name, e.target.value, corrida?._id);
          }}
        />

        <label>Ponto de chegada</label>
        <input
          type="text"
          name="pontoChegada"
          value={corrida?.pontoChegada ?? ''}
          onChange={(e) => {
            alterarCorrida(e.target.name, e.target.value, corrida?._id);
          }}
        />

        <label>Clientes</label>
        {getSelectClientes()}

        <label>Motoristas</label>
        {getSelectMotoristas()}

        <button
          type="button"
          onClick={() => {
            salvarCorrida();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => {
            reiniciarEstadoDosObjetos();
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  function getLinhaDaTabela(corrida) {
    return (
      <tr key={corrida._id}>
        <td>{corrida._id}</td>
        <td>{corrida.pontoChegada}</td>
        <td>{corrida.pontoPartida}</td>
        <td>{corrida.distancia}</td>
        <td>{corrida.valor}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da linha " + corrida.pontoChegada + "?"
                )
              ) {
                excluirCorrida(corrida._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              setCorrida(corrida);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getTabela() {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ponto de partida</th>
            <th>Ponto de chegada</th>
            <th>Distância</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {corridas.map((corrida) => getLinhaDaTabela(corrida))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="corridas" style={{ display: 'flex', justifyContent: 'center' }}>
      <h2>Corridas</h2>
      <button type="button" onClick={novaCorrida}>
        Nova Corrida
      </button>
      {getTabela()}
      {corrida && getFormulario()}
    </div>
  );
}

export default Corridas;
