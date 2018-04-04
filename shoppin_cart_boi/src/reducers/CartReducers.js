export default(state = [], action) => {
    switch(action.type){
        case 'ADD_ITEM':
        return [...state, action.item]
        default:
        return state
    }
}
//if user changes anything, the action is sent to the reducer, 
//the reducer sends the item to the store to alter the state. 
//if no action takes place, the initial state is returned.