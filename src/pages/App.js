import { useState } from "react";
import ToDo from "./ToDo";
import Contador from "./Contador";
import Jogo from "./Jogo";
import Calculadora from "./Calculadora";
import CEP from "./CEP";
import Header from '../utils/header';

const pages = {
    ToDo: <ToDo />,
    Contador: <Contador />,
    Jogo: <Jogo />,
    Calculadora: <Calculadora />,
    CEP: <CEP />
}

export default function App() {
    const [activePage, setActivePage] = useState("ToDo");
    
    return (
        <>
            <Header activePage={activePage} setActivePage={setActivePage} />
            <main>{pages[activePage]}</main>
        </>
    );
}