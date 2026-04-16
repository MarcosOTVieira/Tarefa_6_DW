import { useState } from 'react';
import { useEffect } from 'react';
import '../css/Calculadora.css';

function Display({ expression, result }) {
  return (
    <div className="calcDisplay">
      <span className="calcExpression">{expression || '\u00A0'}</span>
      <span className="calcResult">{result}</span>
    </div>
  );
}

function ButtonGrid({ onDigit, onOperator, onEquals, onClear, onToggleSign, onPercent, onDecimal, onBackspace }) {
  const buttons = [
    { label: 'AC', action: onClear,       cls: 'calcBtnFunc' },
    { label: '+/-', action: onToggleSign,  cls: 'calcBtnFunc' },
    { label: '%',   action: onPercent,     cls: 'calcBtnFunc' },
    { label: '÷',   action: () => onOperator('/'), cls: 'calcBtnOp' },

    { label: '7', action: () => onDigit('7') },
    { label: '8', action: () => onDigit('8') },
    { label: '9', action: () => onDigit('9') },
    { label: '×', action: () => onOperator('*'), cls: 'calcBtnOp' },

    { label: '4', action: () => onDigit('4') },
    { label: '5', action: () => onDigit('5') },
    { label: '6', action: () => onDigit('6') },
    { label: '−', action: () => onOperator('-'), cls: 'calcBtnOp' },

    { label: '1', action: () => onDigit('1') },
    { label: '2', action: () => onDigit('2') },
    { label: '3', action: () => onDigit('3') },
    { label: '+', action: () => onOperator('+'), cls: 'calcBtnOp' },

    { label: '⌫',  action: onBackspace,    cls: 'calcBtnFunc' },
    { label: '0',  action: () => onDigit('0') },
    { label: '.',  action: onDecimal },
    { label: '=',  action: onEquals,        cls: 'calcBtnEq' },
  ];

  return (
    <div className="calcGrid">
      {buttons.map(({ label, action, cls = '' }) => (
        <button
          key={label}
          className={`calcBtn ${cls}`}
          onClick={action}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function evaluate(a, op, b) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (op === '+') return x + y;
  if (op === '-') return x - y;
  if (op === '*') return x * y;
  if (op === '/') return y !== 0 ? x / y : 'Erro';
  return y;
}

function formatNumber(n) {
  if (n === 'Erro') return n;
  const num = parseFloat(n);
  if (isNaN(num)) return '0';
  return parseFloat(num.toPrecision(10)).toString();
}

export default function Calculadora() {
  const [current,  setCurrent]  = useState('0');
  const [previous, setPrevious] = useState('');
  const [operator, setOperator] = useState(null);
  const [waitNext, setWaitNext] = useState(false);

  const buildExpression = () => {
    const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    if (previous && operator) return `${previous} ${opSymbols[operator]}`;
    return '';
  };

  const handleDigit = (d) => {
    if (waitNext) {
      setCurrent(d);
      setWaitNext(false);
    } else {
      setCurrent(current === '0' ? d : current + d);
    }
  };

  const handleOperator = (op) => {
    if (operator && !waitNext) {
      const result = formatNumber(evaluate(previous, operator, current));
      setPrevious(result);
      setCurrent(result);
    } else {
      setPrevious(current);
    }
    setOperator(op);
    setWaitNext(true);
  };

  const handleEquals = () => {
    if (!operator || waitNext) return;
    const result = formatNumber(evaluate(previous, operator, current));
    setCurrent(result);
    setPrevious('');
    setOperator(null);
    setWaitNext(true);
  };

  const handleClear = () => {
    setCurrent('0');
    setPrevious('');
    setOperator(null);
    setWaitNext(false);
  };

  const handleToggleSign = () =>
    setCurrent(formatNumber((parseFloat(current) * -1).toString()));

  const handlePercent = () =>
    setCurrent(formatNumber((parseFloat(current) / 100).toString()));

  const handleDecimal = () => {
    if (waitNext) { setCurrent('0.'); setWaitNext(false); return; }
    if (!current.includes('.')) setCurrent(current + '.');
  };

  const handleBackspace = () => {
    if (waitNext || current === 'Erro') { setCurrent('0'); return; }
    const next = current.length > 1 ? current.slice(0, -1) : '0';
    setCurrent(next);
  };

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key >= '0' && e.key <= '9')   handleDigit(e.key);
    else if (e.key === '+')              handleOperator('+');
    else if (e.key === '-')              handleOperator('-');
    else if (e.key === '*')              handleOperator('*');
    else if (e.key === '/')              { e.preventDefault(); handleOperator('/'); }
    else if (e.key === 'Enter' || e.key === '=') handleEquals();
    else if (e.key === 'Backspace')      handleBackspace();
    else if (e.key === 'Escape')         handleClear();
    else if (e.key === '.')              handleDecimal();
    else if (e.key === '%')              handlePercent();
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, previous, operator, waitNext]);

  return (
    <div className="divMain">
      <h1 className="h1Calc">CALCULADORA</h1>
      <div className="calcContainer">
        <Display expression={buildExpression()} result={current} />
        <ButtonGrid
          onDigit={handleDigit}
          onOperator={handleOperator}
          onEquals={handleEquals}
          onClear={handleClear}
          onToggleSign={handleToggleSign}
          onPercent={handlePercent}
          onDecimal={handleDecimal}
          onBackspace={handleBackspace}
        />
      </div>
    </div>
  );
}