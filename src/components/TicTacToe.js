import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import { withRouter } from 'react-router-dom';

export class TicTacToe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(2700).fill(null),
            count: 0,
            stage: 0,
            winner: ''
        }
    }

    isWinner(element,sign){
        let win = 0;
        for(let i = element-4; i<element+5; i++){
            if(sign === this.state.squares[i]){
                win++
            }else {
                win = 0;
            }
            if(win === 5){
                this.redirectFunction();
            }
        }

        for(let i = element-4*54; i<element+5*54; i=i+54){
            if(sign === this.state.squares[i]){
                win++
            }else {
                win = 0;
            }
            if(win === 5){
                this.redirectFunction();
            }
        }

        for(let i = element-4*54-4; i<element+5*54+5; i=i+55){
            if(sign === this.state.squares[i]){
                win++
            }else {
                win = 0;
            }
            if(win === 5){
                this.redirectFunction();
            }
        }

        for(let i = element-4*54+4; i<element+5*54-5; i=i+53){
            if(sign === this.state.squares[i]){
                win++
            }else {
                win = 0;
            }
            if(win === 5){
                this.redirectFunction();
            }


        }
    }

    redirectFunction(){
        let x = (this.state.count % 2 === 0  ) ? 'X' : 'O';
        this.setState({
            winner: 'победу одержал '+ x
        });

        this.setState({
            stage: 1
        });
    }
    handleClick = e => {

        let data = e.target.getAttribute('data-index');

        if(this.state.squares[data] !== ('X' && 'O'))
        {
            let list = this.state.squares;
            list[data] = (this.state.count % 2 === 0  ) ? 'X' : 'O';

            this.setState({
                squares: list,
                count: this.state.count + 1
            });
            this.isWinner(data,list[data]);
        }
        else {
            alert('Уже стоит')
        }
    };


    render() {
        let count_squares = 0;
        const {squares} = this.state;
        if(this.state.stage === 1) return <Redirect to={{
            pathname: '/results',
            state: { winner: this.state.winner }
        }}
        />
            return (
                <div className="divStyle"
                >
                    {squares.map((square, index)=> {
                            if(count_squares === 54){
                                count_squares = 0;
                            }
                        count_squares = count_squares+1;

                        return (
                            <div key={index}
                                 onClick={this.handleClick}
                                 data-index={index}
                                 className={count_squares<=50 ? 'itemStyle' : 'itemStyle_hidden'}>
                                {square}
                            </div>
                        )
                    }
                    )}
                </div>
            )
        }
}

export default withRouter (TicTacToe);