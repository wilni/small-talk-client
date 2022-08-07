import './Board.scss';
import React, {useState, useEffect} from 'react';
import Square from '../Square/Square.js';
import { toast } from 'react-toastify';
import { useAuth0 } from "@auth0/auth0-react";

const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function Board({socket, connection_id, result, setResult, connection}){
    const [board, setBoard] = useState(() => ['','','','','','','','','']);
    const [player, setPlayer] = useState('X');
    const [turn, setTurn] = useState("X");
    const { user } = useAuth0();

    const notify = (message) => toast(`${message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const chooseSquare = (square) => {
        if(turn === player && board[square] === ''){
            setTurn(player === "X"? "O" : "X");
            socket.emit('played-turn', {
                square: square,
                player: player,
                connection_id: connection_id,
                board: board.map((value, index) => {
                    if(index === square && value === ''){
                        return player;
                    }
                    return value;
                })
            });
            setBoard(board.map((value, index) => {
                if(index === square && value === ''){
                    return player;
                }
                return value;
            }))
        }
    }

    const checkForWin = () => {
        winningPatterns.forEach((pattern) => {
            const firstSpace = board[pattern[0]]
            if(firstSpace === ''){return}
            let foundWinner = true;
            pattern.forEach((boardIndex) => {
                if(board[boardIndex] != firstSpace){
                    foundWinner = false;
                }
            })
            if(foundWinner){
                setResult({winner: firstSpace})
                let winner = '';
                console.log("log from win check", firstSpace, player);
                if(firstSpace === player){
                    winner = user.email;
                }else{
                    winner = connection;
                }
                notify(`${winner} Won!`);
                setTimeout(resetBoard, 6000);
            }
        })
    }

    const checkForTie = () => {
        let filled = true;
        board.forEach((square) => {
            if(square === ''){
                filled = false;
            }
        });
        if(filled){
            setResult({winner: 'none'})
            notify("Cat's game!");
            setTimeout(resetBoard, 6000);
        }
    }

    const resetBoard = () => {
        setBoard(['','','','','','','','',''])
        setPlayer('X');
        setTurn('X');
    }


    //useEffect for whern a message is recieved
    useEffect(() => {
        const handler =  (data) => {
            const currentPlayer = data.player === "X" ? "O" : "X";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);
            setBoard(data.board.map((value, index) => {
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

    // side effect for when the board is changed
    useEffect(() => {
        checkForWin();
        checkForTie();
    },[board])


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