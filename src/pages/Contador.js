import { useState } from "react";
import "../css/Contador.css";

function ContaCliques()
{
  const [count, setCount] = useState(0);

  function clique()
  {
    setCount(count + 1);
  }

  return (
    <div className="divMain">
      <button onClick={clique} className="btnClique">
        <h1 className="h1Contador">CONTADOR DE CLIQUES</h1>
        <h1>Quantidade de cliques: {count}</h1>
      </button>
    </div>
  )
}

export default function MyApp() {
  return (
    <div>
      <ContaCliques />
    </div>
  );
}
