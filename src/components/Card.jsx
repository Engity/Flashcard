import React, { useState } from "react";
import '../assets/styles/Card.css'

const Card = ({ quiz }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    const revealAnswer = () => {
        setShowAnswer(!showAnswer);
        //console.log("Reveal answer: ", showAnswer);
    };



    return (
        // <div className={'Card'} onMouseDown={revealAnswer} onMouseUp={revealAnswer}
        <div className={'Card'}
            style={{
                color: quiz.textColor,
                backgroundColor: quiz.backgroundColor,
                textShadow: quiz.textShadowColor,
            }}
        >
            {/* <div className="flip-card-inner">
                {!showAnswer ? <div className="flip-card-front">
                    <center><h5>{quiz.question} </h5></center>
                    {quiz.imageQuestion ? <img src={quiz.imageQuestion}></img> : <></>}

                </div> : <></>}

                {showAnswer ? 
                    <div className="flip-card-back">
                        <center><h6>{quiz.answer}</h6></center>
                        {quiz.imageAnswer ? <img src={quiz.imageAnswer}></img> : <></>}
                    </div> 
                : <></>}
            </div> */}

            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <center><h5>{quiz.question} </h5></center>
                    {quiz.imageQuestion ? <img src={quiz.imageQuestion}></img> : <></>}

                </div>
                <div className="flip-card-back">
                    <center><h6>{quiz.answer}</h6></center>
                    {quiz.imageAnswer ? <img src={quiz.imageAnswer}></img> : <></>}
                </div>

            </div>



        </div>

    )
}

export default Card;