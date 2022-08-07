import React, {useEffect} from "react";
import './ConnectionModal.scss';
import { ReactDOM } from "react";
import backArrow from '../../assets/Images/back_arrow_icon.svg';

function ConnectionModal({onClose, show, onSubmit}) {

    return (
        <div className={`modal ${show ? 'modal--show' : ''}`} onClick={onClose}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                <img className='modal__back-arrow' onClick={onClose} src={backArrow} alt="back arrow"></img>
                    <h4 className="modal__title"> Add a connection</h4>
                </div>
                <form className="modal__form" onSubmit={onSubmit}>
                    <div className="modal__body">
                        <input className="modal__input" name="newConnection" type={'text'} placeholder="enter your connections name"></input>
                    </div>
                    <div className="modal__footer">
                        <button  className="button button-modal">submit</button>
                    </div>
                </form>

            </div>
        </div>
    )
}



export default ConnectionModal;