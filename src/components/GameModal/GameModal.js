import React from "react";
import './GameModal.scss';
import { ReactDOM } from "react";
import backArrow from '../../assets/Images/back_arrow_icon.svg';

import Board from '../Board/Board.js'


function GameModal({socket, onClose, show, connection_id}) {

    return (
        <div className={`modal ${show ? 'modal--show' : ''}`} onClick={onClose}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                        <img className='modal__back-arrow' onClick={onClose} src={backArrow} alt="back arrow"></img>
                    <h4 className="modal__title"> Tic-Tak-Toe</h4>
                </div>
                    <div className="modal__body">
                        <Board socket={socket} connection_id={connection_id}/>
                    </div>
            </div>
        </div>
    )
}



export default GameModal;