import React, { Component } from 'react';

class Shelf extends Components {
    constructor(props) {
        super(props)
        this.state = {
            shelfItems: [
                "Bananas", "Frozen Pizza", "Flamin' Hot Cheetos", "Arugula", "Cucumba"
            ]
        }
    }
    //We are detting up a shelf that can be altered. That is why it is declared as
    //a state. The shelf items can be looped through with a pure function below (map), and
    //when a user selects an item, an action is initiated which will be passed to the reducer,
    //which will then alter the store(state)
    render() {
        const shelfItems = this.state.shelfItems.map((item, id) => {
            return (
                <li key={id}>item<button onClick={() => this.props.addItem(item)}>+</button></li>
            )
        })
        return (
            <div>
                <h2>Store Inventory</h2>
                <ul>
                    {shelfItems}
                </ul>
            </div>
        )
    }

}

export default Shelf;