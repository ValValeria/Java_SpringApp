import React from 'react';


export default function({question,answer}){
    const [state,updateState] = React.useState(true);

    const update = ()=>{
        updateState((state)=>{
            const currentState = !state;
            return currentState;
        });
    }

    return (
        <div className={"questions__item"}>
            <div className={"questions__item-wrap"}>
                <div className={"questions__item-content  center justify-content-between w-100"}>
                    <div className={"questions__item-txt"}>
                        <h5>{question}</h5>
                    </div>
                    <div className={"questions__item-rectangle center "} onClick={update}>
                        {(state)?
                            (
                                <svg fill="currentColor" height="18" width="18" viewBox="0 0 20 20">
                                    <path d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
	C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
	C15.952,9,16,9.447,16,10z"></path>
                                </svg>
                            ):
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-file-earmark-excel" viewBox="0 0 16 16">
                                    <path
                                        d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z"/>
                                    <path
                                        d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                </svg>
                            )}
                    </div>
                </div>
                <div className={"questions__item-line bg-gray "+(!state?"bg-dark":"")}></div>

                <div className={"questions__item-answer " + (!state?'activeItem':'')}>
                    <div >
                        <h5>{answer}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
