// Action Creator function
// This action will be called from a button in the UI
export const addToCart = (item) => {
    // This console.log is a side effect and technically makes this function 'impure'.
    // It may come in handy when testing to see if we've integrated redux successfully,
    // to determine if our actions are firing
    console.log('ACTION: adding ${item} to cart')
    return {
        //actions must have a type property
        type: 'ADD_ITEM', item 
        //action naming conventions: all caps with snake-case (JAVASCRIPT_CONSTANT naming convention )
        //ES6 shorthand again {item: item}
    }
}