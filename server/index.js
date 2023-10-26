const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/generateCards", (req, res) => {
    const randomize = req.body.randomize ?? false;
    const players = req.body.players;
    const card_values = [
        {label: "A", value: 1},
        {label: "2", value: 2},
        {label: "3", value: 3},
        {label: "4", value: 4},
        {label: "5", value: 5},
        {label: "6", value: 6},
        {label: "7", value: 7},
        {label: "8", value: 8},
        {label: "9", value: 9},
        {label: "X", value: 10},
        {label: "J", value: 11},
        {label: "Q", value: 12},
        {label: "K", value: 13}
    ];
    const card_suites = ["H", "D", "S", "C"]; //["Hearts", "Diamonds", "Spades", "Clubs"];
    const cards = [];
    const player_decks = [];

    let total_points = 0; //specifically for single players only

    for (let s = 0; s < card_suites.length; s++) { //generate cards without shuffling/randomization
        for (let v = 0; v < card_values.length; v++) {
            cards.push({
                label: card_values[v].label,
                value: card_values[v].value,
                suit: card_suites[s]
            });
            total_points += card_values[v].value;
        }
    }

    if (randomize == true) { //randomize/shuffle cards if requested
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor( Math.random() * (i + 1) );
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    if (players > 1) { //more than 1 players is specified - split cards between players
        for (let p = 0; p < players; p++) {
            player_decks.push({
                player: 'Player ' + (p + 1),
                cards: [],
                points: 0
            });
        }

        let c = 0;
        while (0 < cards.length) {
            player_decks[c].points += cards[0].value;
            player_decks[c].cards.push( cards[0] );
            cards.shift();

            if (c < (players - 1)) {
                c += 1;
            } else {
                c = 0;
            }
        }
    } else { //assign all cards to one player
        player_decks.push({
            player: 'Player 1',
            cards: cards,
            points: total_points
        });
    }

    res.json({
        success: true,
        cards: player_decks
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});