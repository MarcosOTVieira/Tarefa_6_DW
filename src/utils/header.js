import "../css/header.css";

function MyButton({ activePage, setActivePage }) {
  return (
    <div>
      <button
        className={`btnHeader ${activePage === "ToDo" ? "active" : ""}`}
        onClick={() => setActivePage("ToDo")}
      >
        To-do list
      </button>

      <button
        className={`btnHeader ${activePage === "Contador" ? "active" : ""}`}
        onClick={() => setActivePage("Contador")}
      >
        Contador de cliques
      </button>

      <button
        className={`btnHeader ${activePage === "Jogo" ? "active" : ""}`}
        onClick={() => setActivePage("Jogo")}
      >
        Jogo da Velha
      </button>

      <button
        className={`btnHeader ${activePage === "Calculadora" ? "active" : ""}`}
        onClick={() => setActivePage("Calculadora")}
      >
        Calculadora
      </button>

      <button
        className={`btnHeader ${activePage === "CEP" ? "active" : ""}`}
        onClick={() => setActivePage("CEP")}
      >
        Buscador de CEP
      </button>
    </div>
  );
}

export default function Header({ activePage, setActivePage }) {
  return (
    <div>
    <div className="divHeader">
      <h1 className="h1Header">TAREFA 6 - DESENVOLVIMENTO WEB</h1>
    </div>
    <div className="divbtnHeader">
        <MyButton activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
}