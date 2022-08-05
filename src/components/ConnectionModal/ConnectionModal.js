import React from "react";
import './ConnectionModal.scss';
import { ReactDOM } from "react";


function ConnectionModal(props) {
    // if (!props.show) {
    //     return null;
    // }


    return (
        <div className={`modal ${props.show ? 'modal--show' : ''}`} onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title"> Add a connection</h4>
                </div>
                <form onSubmit={props.onSubmit}>
                    <div className="modal-body">
                        <input className="modal-input" name="newConnection" type={'text'} placeholder="enter your connections name"></input>
                    </div>
                    <div className="modal-footer">
                        <button >submit</button>
                        <button onClick={props.onClose}>close</button>
                    </div>
                </form>

            </div>
        </div>
    )
}



export default ConnectionModal;