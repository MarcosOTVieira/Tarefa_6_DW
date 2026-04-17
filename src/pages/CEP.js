import { useState } from 'react';
import '../css/CEP.css';

function InputRow({ input, setInput, onSearch, loading }) {
  return (
    <div className="cepInputRow">
      <input
        className="cepInput"
        value={input}
        onChange={(e) => setInput(e.target.value.replace(/\D/g, '').slice(0, 8))}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder="Digite o CEP..."
        maxLength={8}
      />
      <button className="cepSearchBtn" onClick={onSearch} disabled={loading}>
        {loading ? '...' : 'Buscar'}
      </button>
    </div>
  );
}

function ErrorMessage({ message }) {
  if (!message) return null;
  return <p className="cepError">{message}</p>;
}

function ResultCard({ data }) {
  if (!data) return null;

  const fields = [
    { label: 'CEP',         value: data.cep },
    { label: 'Logradouro',  value: data.logradouro },
    { label: 'Complemento', value: data.complemento },
    { label: 'Bairro',      value: data.bairro },
    { label: 'Cidade',      value: data.localidade },
    { label: 'Estado',      value: data.uf },
    { label: 'IBGE',        value: data.ibge },
    { label: 'DDD',         value: data.ddd },
  ];

  return (
    <div className="cepCard">
      {fields.map(({ label, value }) =>
        value ? (
          <div className="cepField" key={label}>
            <span className="cepLabel">{label}</span>
            <span className="cepValue">{value}</span>
          </div>
        ) : null
      )}
    </div>
  );
}

async function fetchCEP(cep) {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!res.ok) throw new Error('Erro na requisição.');
  const data = await res.json();
  if (data.erro) throw new Error('CEP não encontrado.');
  return data;
}

export default function BuscaCEP() {
  const [input,   setInput]   = useState('');
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (input.length !== 8) { setError('Digite um CEP válido com 8 dígitos.'); return; }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await fetchCEP(input);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="divMain">
      <h1 className="h1CEP">BUSCA CEP</h1>
      <div className="cepContainer">
        <InputRow
          input={input}
          setInput={setInput}
          onSearch={handleSearch}
          loading={loading}
        />
        <ErrorMessage message={error} />
        <ResultCard data={result} />
      </div>
    </div>
  );
}