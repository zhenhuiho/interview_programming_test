import React, { Component } from 'react';
import $ from 'jquery';

export class TestContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_message: '',
            default_players: 0,
            total_players: 0,
            players: [],
            cards: []
        };
    }

    //custom functions
    startCardGame = () => {
        //validate the selected total of players first
        let errorMessageText = $('#players_label_grp').find('p');
        if (this.state.total_players > 0) {
            errorMessageText.addClass('d-none'); //hide error message if total of players > 0
            fetch("/generateCards", {
                method: 'POST',
                headers: {'Content-type': 'application/json; charset=UTF-8'},
                body: JSON.stringify({ randomize: true, players: this.state.total_players })
            })
                .then(response => response.json())
                .then(data => this.showCardDecks(data.cards));
        } else {
            errorMessageText.removeClass('d-none'); //show error message here if total of players == 0
        }
    }

    showCardDecks = ( decks ) => { //display generated card decks in front end
        let emptyDecksMsg = $('#emptyDecksMsg');
        let rowSize = 2;
        let displayDecks = [];
        let cardDecksDisp = $('#cardDecks');
        if (decks.length === 0) {
            emptyDecksMsg.show();
        } else if (decks.length > 0) {
            emptyDecksMsg.hide();
            cardDecksDisp.empty();

            if (decks.length === 1) { //if only 1 deck
                let fullCardsList = '';
                for (let c = 0; c < decks[0].cards.length; c++) {
                    fullCardsList += decks[0].cards[c].label + decks[0].cards[c].suit;
                    if (c < decks[0].cards.length - 1) {
                        fullCardsList += ', ';
                    }
                }

                cardDecksDisp.append(
                    '<div class="w-100 p-2">'
                    + '<div class="row border rounded m-0 p-2">'
                    + '<div class="col-md-8">' + decks[0].player + '</div>'
                    + '<div class="col-md-4 text-end"><span class="badge text-bg-primary p-2">' + decks[0].points + ' points</span></div>'
                    + '<div class="mt-2 pt-2 border-top">' + fullCardsList + '</div>'
                    + '</div>'
                    + '</div>'
                );
            } else { //if more than 1 deck
                while (decks.length > 0) { //split decks into groups of 2 (rowSize)
                    displayDecks.push( decks.splice(0, rowSize) );
                }

                displayDecks.forEach(function(d) { //insert decks details
                    let rowContents = '';
                    for (let i = 0; i < d.length; i++) {
                        console.log(d[i].cards);
                        let cardsList = '';
                        for (let c = 0; c < d[i].cards.length; c++) {
                            cardsList += d[i].cards[c].label + d[i].cards[c].suit;
                            if (c < d[i].cards.length - 1) {
                                cardsList += ', ';
                            }
                        }

                        rowContents += '<div class="col-md-6 col-sm-12 mb-3">'
                            + '<div class="row border rounded m-0 p-2">'
                            + '<div class="col-md-8">' + d[i].player + '</div>'
                            + '<div class="col-md-4 text-end"><span class="badge text-bg-primary p-2">' + d[i].points + ' points</span></div>'
                            + '<div class="mt-2 pt-2 border-top">' + cardsList + '</div>'
                            + '</div>'
                            + '</div>';
                    }

                    cardDecksDisp.append('<div class="row">' + rowContents + '</div>');
                });
            }
        }
    }

    playersInput = () => {
        return (
            <div id='playersInput' className='row mb-3'>
                <div id='players_label_grp' className='col-md-8 col-sm-12 py-3'>
                    <label>Please select between 1 to 4 players before clicking the START button</label>
                    <p className='m-0 text-danger d-none'>Input value does not exist or value is invalid</p>
                </div>
                <div id='players_input_grp' className='col-md-4 col-sm-12 row'>
                    <div className='col-md-4'><label className='py-3'>Number of players:</label></div>
                    <div className='input-group d-flex col'>
                        <input
                            className='form-control'
                            type='number'
                            min={0}
                            max={4}
                            defaultValue={this.state.default_players}
                            onChange={e => this.setState({ total_players: e.target.value })}
                        >
                        </input>
                        <button id='submitPlayers' className='btn btn-primary' type='submit' onClick={() => this.startCardGame()}>
                            START
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    //main reactjs functions
    render() {
        return (
            <div id='testContents' className='p-3'>
                <this.playersInput />
                <div id='cardDecks' className='py-2'>
                    <h3 id='emptyDecksMsg' className='border rounded text-center p-4 m-0'>No Card Decks Available</h3>
                </div>
            </div>
        );
    }
}