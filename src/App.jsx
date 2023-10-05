import { useState, useLayoutEffect, useRef } from 'react'
import './App.css'
import Card from './components/Card'
import AlanTuring from './assets/images/Alan_Turing.png'
import VonNeumannArchitecture from './assets/images/VonNeumannArchiecture.png'

function App() {
    const [currentCard, setCurrentCard] = useState(0);
    const [correctCards, setCorrectCards] = useState(0);
    const [streak, setStreak] = useState({ current: 0, longest: 0 });
    const [showAnswer, setShowAnswer] = useState(false);
    const inputRef = useRef(null);
    const cardRef = useRef(null);
    const [quizData, setQuizData] = useState([
        {
            question: "Can you guess who is this person?\n(Hint: He is considered the Founding Father of Computer Science)",
            answer: `
            Alan Mathison Turing OBE FRS (23 June 1912 - 7 June 1954) was an English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.
            Turing was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general-purpose computer. 
            `,
            textColor: "rgba(27, 35, 80)",
            correctTextColor: "lightyellow",
            correctBackgroundColor: "rgba(76, 15, 80, 0.8)",
            backgroundColor: "rgba(357, 175, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: AlanTuring,
            imageAnswer: AlanTuring,
            correctKeywords: ["Alan Turing", "Alan Mathison Turing OBE", "Alan Mathison Turing"],
            correctGuess: false,
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
            correctTextColor: "lightyellow",
            correctBackgroundColor: "rgba(76, 15, 80, 0.8)",
            backgroundColor: "rgba(357, 175, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: VonNeumannArchitecture,
            imageAnswer: null,
            correctKeywords: ["VonNeumann architecture", "von Neumann architecture", "von Neumann model", "Princeton architecture"],
            correctGuess: false,
        },
        {
            question: `
                What is HTML?
            `,
            answer: `
            - The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. 
            It defines the meaning and structure of web content
            `,
            textColor: "rgba(27, 35, 80)",
            correctTextColor: "lightyellow",
            correctBackgroundColor: "rgba(76, 15, 80, 0.8)",
            backgroundColor: "rgba(357, 175, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: null,
            imageAnswer: null,
            correctKeywords: ["HyperText Markup Language", "standard markup language"],
            correctGuess: false,
        },
        {
            question: `
                What are React hooks? 
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
            textColor: "rgba(27, 35, 80)",
            correctTextColor: "lightyellow",
            correctBackgroundColor: "rgba(76, 15, 80, 0.8)",
            backgroundColor: "rgba(357, 175, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: null,
            imageAnswer: null,
            correctKeywords: ["different React features", "React features"],
            correctGuess: false,
        },

        {
            question: `
                What is an algorithm? 
            `,
            answer: `
            In mathematics and computer science, an algorithm is a finite sequence of rigorous instructions, typically used to solve a class of specific problems or to perform a computation
            A few examples of an algorithm are:
            - Euclid's algorithm: an efficient method for computing the greatest common divisor of two integers, the largest number that divides them both without a remainder.
            - Dijkstra's algorithm: is an algorithm for finding the shortest paths between nodes in a weighted graph, which may represent, for example, road networks.
            - Tarjan's strongly connected components algorithm: is an algorithm in graph theory for finding the strongly connected components (SCCs) of a directed graph.
            `,
            textColor: "rgba(27, 35, 80)",
            correctTextColor: "lightyellow",
            correctBackgroundColor: "rgba(76, 15, 80, 0.8)",
            backgroundColor: "rgba(357, 175, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: null,
            imageAnswer: null,
            correctKeywords: ["finite sequence of instructions", "finite list of instructions", "finite sequence of rigorous instructions"],
            correctGuess: false,
        },
        {
            question: `
                What is CSS?
            `,
            answer: `
            - Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML (including XML dialects such as SVG, MathML or XHTML).
            CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.
            `,
            textColor: "rgba(27, 35, 80)",
            correctTextColor: "lightyellow",
            correctBackgroundColor: "rgba(76, 15, 80, 0.8)",
            backgroundColor: "rgba(357, 175, 80, 0.8)",
            textShadowColor: "3px 3px 10px blue",
            imageQuestion: null,
            imageAnswer: null,
            correctKeywords: ["Cascading Style Sheet"],
            correctGuess: false,
        },
    ].sort(() => Math.random() - 0.5));


    const totalCards = quizData.length;

    const turnOffClass = (ref, className) => {
        if (ref.current.classList.contains(className)) {
            ref.current.classList.toggle(className);
        }
    }

    const turnOnClass = (ref, className) => {
        if (!ref.current.classList.contains(className)) {
            ref.current.classList.toggle(className);
        }
    }

    const changeCurrentCard = (amount) => {
        setShowAnswer(false);

        turnOffClass(cardRef, 'do-flip');
        turnOffClass(inputRef, 'correctAnswer');
        turnOffClass(inputRef, 'incorrectAnswer');

        if (amount >= 0 && amount < totalCards) {
            inputRef.current.value = "";
            setCurrentCard(amount);
            return amount;
        }
        return -1;
    }

    const shuffleQuestions = () => {
        setQuizData([...quizData].sort(() => Math.random() - 0.5));
        changeCurrentCard(0);
    }


    const revealAnswer = () => {
        // console.log(inputRef.current.value)
        setShowAnswer(!showAnswer);
        cardRef.current.classList.toggle('do-flip');
    };

    const checkAnswer = () => {
        //Not doing anything if the answer is blank
        if (inputRef.current.value === "") {
            alert("Please input your guess before seeing the answer");
            return;
        }

        quizData[currentCard].correctKeywords.forEach(keyword => {
            if (inputRef.current.value.toLowerCase().includes(keyword.toLowerCase())) {
                if (!quizData[currentCard].correctGuess) {
                    setCorrectCards(correctCards + 1);
                    setStreak({
                        ...streak,
                        current: streak.current + 1,
                        longest: Math.max(streak.longest, streak.current + 1),
                    })
                }
                quizData[currentCard].correctGuess = true;

            }
        });

        //User guess is wrong
        if (!quizData[currentCard].correctGuess) {
            //Reset streak
            setStreak({
                ...streak,
                current: 0,
            })
            turnOnClass(inputRef, 'incorrectAnswer');
            inputRef.current.value = "Incorrect";
        } else {
            //User guess is right
            turnOnClass(inputRef, 'correctAnswer');
            turnOffClass(inputRef, 'incorrectAnswer');

            if (!showAnswer)
                revealAnswer();
        }
    };


    return (
        <div className="App">
            <h1>Computer Science Trivia</h1>
            <h2>Test your knowledge in CS, no online search allows!</h2>
            <h2>Click and hold to see the answer!</h2>
            <h2>Number of cards: {totalCards} &emsp;
                Current Card: {currentCard + 1} &emsp;
                Correct Cards: {correctCards} &emsp;
                <br></br>
                Current Streak: {streak.current} &emsp;
                Longest Streak: {streak.longest} &emsp;
            </h2>

            <center>
                <Card flipRef={cardRef} quiz={quizData[currentCard]} showAnswer={showAnswer} />
            </center>

            <div className="elemContainer">
                <center>
                    <input type="text" placeholder='Please input your guess'
                        ref={inputRef}
                    />
                    <button onClick={checkAnswer}>
                        Submit Answer
                    </button>
                    <button onClick={revealAnswer}>
                        Reveal Answer
                    </button>

                    <br></br>
                    <button onClick={shuffleQuestions}>
                        Shuffle Questions
                    </button>

                    <br></br>
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
