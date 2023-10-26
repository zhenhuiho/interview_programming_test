import React, { Component } from 'react';
import $ from 'jquery';

export class TestHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {title: "Card Deck Generator"};
    }

    render() {
        return (
            <div id='testHeader' className='row p-3 m-0 bg-primary text-white'>
                {/* <div className='col-md-8'>
                    <h1 className='text-white'>{this.state.title}</h1>
                </div>
                <div className='col-md-4' style={{textAlign: 'right'}}>
                    <span>
                        <small>Extra text here</small>
                    </span>
                </div> */}
                <h1 className='text-white'>{this.state.title}</h1>
            </div>
        );
    }
}