import React, { Component } from 'react';

class Shelf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shelfItems: [
                "Bananas", "Frozen Pizza", "Flamin' Hot Cheetos", "Arugula", "Cucumba"
            ]
        }
    }
    //2. We are detting up a shelf that can be altered. That is why it is declared as
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
//3. Here weare setting up the container tha will hold shelf items added by the user. When 
//the user (onClick) adds an item, the item will be passed here, and displayed. So in review, 
//this component is referring to the state, and saying "the 'normal' state of things are these 
//items here." Next, we have a higher order function, .map, looping through the state (this.state.shelfItems.map) 
//using an ID. addItem, takes a shelf item from the array, and adds it into the "store inventory", seen above.
        )
    }

}

export default Shelf;