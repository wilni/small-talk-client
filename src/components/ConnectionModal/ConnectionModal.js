import React from "react";
import './ConnectionModal.scss';
import { ReactDOM } from "react";
import backArrow from '../../assets/Images/back_arrow_icon.svg';

function ConnectionModal(props) {
    // if (!props.show) {
    //     return null;
    // }


    return (
        <div className={`modal ${props.show ? 'modal--show' : ''}`} onClick={props.onClose}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                <img className='modal__back-arrow' onClick={props.onClose} src={backArrow} alt="back arrow"></img>
                    <h4 className="modal__title"> Add a connection</h4>
                </div>
                <form className="modal__form" onSubmit={props.onSubmit}>
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