import { useState, useLayoutEffect } from 'react'
import './App.css'
import Card from './components/Card'
import AlanTuring from './assets/images/Alan_Turing.png'
import VonNeumannArchiecture from './assets/images/VonNeumannArchiecture.png'

function App() {
    const [currentCard, setCurrentCard] = useState(0);

    const [quizData, setquizData] = useState([
        {
            question: "Can you guess who is this person?\n(Hint: He is considered the Founding Father of Computer Science)",
            answer: `
            Alan Mathison Turing OBE FRS (23 June 1912 - 7 June 1954) was an English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.
            Turing was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general-purpose computer. 
            He is widely considered to be the father of theoretical computer science and artificial intelligence.
            `,
            textColor: "rgba(27, 35, 80)",
            backgroundColor: "rgba(357, 175, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: AlanTuring,
            imageAnswer: AlanTuring,
        },
        {
            question: "What is this called in Machine Organization?",
            answer: `
            The von Neumann architecture - also known as the von Neumann model or Princeton architecture - is a computer architecture 
                based on a 1945 description by John von Neumann, and by others, in the First Draft of a Report on the EDVAC.
            The document describes a design architecture for an electronic digital computer with these components:
            - A processing unit with both an arithmetic logic unit and processor registers
            - A control unit that includes an instruction register and a program counter
            - Memory that stores data and instructions
            - External mass storage
            - Input and output mechanisms
            `,
            textColor: "rgba(27, 35, 80)",
            backgroundColor: "rgba(357, 175, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: VonNeumannArchiecture,
            imageAnswer: null,
        },
        {
            question: `
                What are HTML(HyperText Markup Language) 
                and CSS (Cascading Style Sheets)?
            `,
            answer: `
            - The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. 
            It defines the meaning and structure of web content
            - Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML (including XML dialects such as SVG, MathML or XHTML).
            CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.
            `,
            textColor: "lightyellow",
            backgroundColor: "rgba(76, 15, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: null,
            imageAnswer: null,
        },
        {
            question: `
                What are React hooks? 
                Give a few examples of the hooks.
            `,
            answer: `
            - Hooks let us use different React features from our components. 
            We can either use the built-in Hooks or combine them to build our own.
            - A few examples of the hooks are:
                + State Hooks: State lets a component "remember" information like user input.
                + Context Hooks: Context lets a component receive information from distant parents without passing it as props.
                + Ref Hooks: Refs let a component hold some information that isn't used for rendering, like a DOM node or a timeout ID.
                + Effect Hooks: Effects let a component connect to and synchronize with external systems.
            `,
            textColor: "lightyellow",
            backgroundColor: "rgba(76, 15, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: null,
            imageAnswer: null,
        },

        {
            question: `
                What is an algorithm? 
                Name a few algorithms and what they do.
            `,
            answer: `
            In mathematics and computer science, an algorithm is a finite sequence of rigorous instructions, typically used to solve a class of specific problems or to perform a computation
            A few examples of an algorithm are:
            - Euclid's algorithm: an efficient method for computing the greatest common divisor of two integers, the largest number that divides them both without a remainder.
            - Dijkstra's algorithm: is an algorithm for finding the shortest paths between nodes in a weighted graph, which may represent, for example, road networks.
            - Tarjan's strongly connected components algorithm: is an algorithm in graph theory for finding the strongly connected components (SCCs) of a directed graph.
            `,
            textColor: "lightyellow",
            backgroundColor: "rgba(76, 15, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: null,
            imageAnswer: null,
        }
    ].sort(() => Math.random() - 0.5));


    const totalCards = quizData.length;
   
    const changeCurrentCard = (amount) => {
        if (amount >= 0 && amount < totalCards) {
            setCurrentCard(amount);
            return amount;
        }
        return -1;
    }
   
    return (
        <div className="App">
            <h1>Computer Science Trivia</h1>
            <h2>Test your knowledge in CS, no online search allows!</h2>
            <h2>Click and hold to see the answer!</h2>
            <h2>Number of cards: {totalCards} &emsp; Current Card: {currentCard + 1}</h2>
            <h2></h2>
            <center>
                <Card quiz={quizData[currentCard]} />
            </center>

            <div className="elemContainer">
                <center>
                    {currentCard != 0 ?
                        <button onClick={() => changeCurrentCard(currentCard - 1)}>
                            Prev
                        </button> : <></>}
                    {currentCard + 1 < totalCards ?
                        <button onClick={() => changeCurrentCard(currentCard + 1)}>
                            Next
                        </button> : <></>}
                </center>
            </div>
        </div>
    )
}

export default App
