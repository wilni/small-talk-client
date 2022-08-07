import './Board.scss';
import React, {useState, useEffect} from 'react';
import Square from '../Square/Square.js';
import { useAuth0 } from "@auth0/auth0-react";


function Board({socket, connection_id}){
    const { user } = useAuth0();
    const [board, setBoard] = useState(() => ['','','','','','','','','']);
    const [player, setPlayer] = useState('X');
    const [turn, setTurn] = useState("X");

    const chooseSquare = (square) => {
        if(turn === player && board[square] === ''){
            setTurn(player === "X"? "O" : "X");
            socket.emit('played-turn', {
                square: square,
                player: player,
                connection_id: connection_id
            });
            setBoard(board.map((value, index) => {
                if(index === square && value === ''){
                    return player;
                }
                return value;
            }))
        }
    }

    useEffect(() => {
        let boardSnap = board;
        const handler = (data) => {
            console.log("this is recieved turn", data);
            const currentPlayer = data.player === "X" ? "O" : "X";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);
            console.log("board napshot", boardSnap);
            setBoard(board.map((value, index) => {
                if(index === data.square && value === ''){
                    return data.player;
                }
                return value;
            }))
        }
        socket.on('recieved-turn', handler);
        return () => {
            socket.off('recieved-turn', handler);
        }
    }, [socket])


    return(
        <div className='board'>
            <div className='row'>
                <Square chooseSquare={() => {chooseSquare(0)}} value={board[0]} position='1'/>
                <Square chooseSquare={() => {chooseSquare(1)}} value={board[1]} position='2'/>
                <Square chooseSquare={() => {chooseSquare(2)}} value={board[2]} position='3'/>
            </div>
            <div className='row'>
                <Square chooseSquare={() => {chooseSquare(3)}} value={board[3]} position='4'/>
                <Square chooseSquare={() => {chooseSquare(4)}} value={board[4]} position='5'/>
                <Square chooseSquare={() => {chooseSquare(5)}} value={board[5]} position='6'/>
            </div>
            <div className='row'>
                <Square chooseSquare={() => {chooseSquare(6)}} value={board[6]} position='7'/>
                <Square chooseSquare={() => {chooseSquare(7)}} value={board[7]} position='8'/>
                <Square chooseSquare={() => {chooseSquare(8)}} value={board[8]} position='9'/>
            </div>
        </div>
    )
}



export default Board;