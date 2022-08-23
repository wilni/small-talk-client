import React, { useState } from "react";
import './GameModal.scss';
import backArrow from '../../assets/Images/back_arrow_icon.svg';

import Board from '../Board/Board.js'


function GameModal({ socket, onClose, show, connection_id, connection, setShowModal, gameLaunced }) {
    const [result, setResult] = useState({ winner: 'none' })
    return (
        <div className={`modal ${show ? 'modal--show' : ''}`} onClick={onClose}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <img className='modal__back-arrow' onClick={onClose} src={backArrow} alt="back arrow"></img>
                    <h4 className="modal__title"> {gameLaunced}</h4>
                </div>
                {gameLaunced === "Tic-Tak-Toe" ?
                    <div className="modal__body">
                        <Board
                            socket={socket} connection_id={connection_id} result={result}
                            setResult={setResult} connection={connection} setShowModal={setShowModal} />
                    </div>
                    :
                    <p className="modal__body--TBD">Coming Soon!</p>
                }
            </div>
        </div>
    )
}



export default GameModal;