
---
title: State Management and Intro to Redux
type: lesson
duration: "2:00"
creator:
    name: Jamie King
    city: ATL
competencies: Front-End Architecture
---

# State Management and Intro to Redux

### Objectives

*After this lesson, students will be able to:*

- Understand state in relationship to building Front End Applications
- Describe the benefits of using a global state object vs local state
- Explain the 3 Principles of Redux
- Explain the roles of actions and the reducer
- Define Redux specific terms (i.e. Reducer, Actions, Store)

### Preparation

*Before this lesson, students should already be able to:*

- Create a simple app in React using `create-react-app`
- Understand how data is passed between components in React
- Be familiar with higher-order functions and object/array destructuring

### Going Fast Forever

Several weeks ago, we talked about how our goal when designing software is to **go fast forever**. This means that as professionals, we want to plan and structure our application workflow to allow us to make quick changes and build tons of new and interesting features for months and years without needing to slow down.

React so far has allowed us to build really interactive sites that are easily broken up into small pieces, which allows us to build more efficiently than using a library like jQuery where code can become messy quickly.

The ability to break pieces of our application into small components helps us go fast because we can easily find and change small pieces of our app.  That's why it has so rapidly become the most popular choice to render views.  The downside of this is that React is only concerned with being a **VIEW** layer for your application.  This means that, even though we can manage state and data through React, it's doesn't care about that as much as it does showing and updating the DOM quickly.

### You Do (Turn and Talk) - 5 min

With a partner, discuss and write down answers to the following questions.

- What is state?
- Where does state live in a React application?
- How does state get changed?
- How do you pass state from place to place?


### State in React

Even though React has built in tools to manage and update the state of an application, it is not nearly as strong as the rendering capabilities.  This is by design within Facebook, remember React is a `library` focused on solving a few problems, not a `framework` which is more expansive and is more opinionated.

State in React is only handled within individual components. Whenever we have values that may change we must update our state with the `this.setState()` method.

This state private to an individual React component. This is commonly called `Local State`.  The state is defined, called, and transformed only from within the component that owns it.

**CFU**: How do we pass information in a components state to other components?

We can send information down the React component tree through props.  Props allows us to pass values and methods that can reference parts of state and even call methods within the higher level component.  This has worked out great so far, but as your app grows larger it may begin to grow more and more difficult to make changes to your state.  This is why we've lifted our state up to it's very top level in most React apps that we've created. Eventually this becomes an extremely time consuming and risky activity.

One common use case that requires global state like this is having an application with many different views (like when using React Router).

**CFU**: What sort of risks do we gain as we build a large React only application?

### A Little Bit of History

The React developers designed React in such a way as to remain unopinionated about complex React state management. They introduced the [Flux application architecture](https://facebook.github.io/flux/) to fill that void. Flux allows developers to extract the local state of components into something called a **store** (basically a giant object with all of your data).

Flux is only an architecture. A collection of ideas about HOW you should build an app.  After it was introduced, tons of tools were created to implement the Flux pattern, but one has emerged as the favorite choice, Redux.

### Enter Redux

Redux is a library that expands on the ideas of the Flux pattern and combines it with the ideas that power the `reduce` higher order function.  I highly recommend checking out the talk where the creator Dan Abramov introduced Redux [here](https://www.youtube.com/watch?v=xsSnOQynTHs)

Through using Redux, we will be able to take all of the state out of our individual components, and instead house them inside of a **store**.

![](../images/with_and_without_redux.png)

### You Do - 10 min

Read [this Medium post](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f) written by a developer who build a React app for the Australian Broadcast Corporation.  It's a great real world example of how React becomes more and more difficult to handle as projects become more difficult.

- After working on the app for a month, what are some of the pain points the team found by just using React by itself?
- In your own words, describe how Redux handles data differently than React on its own.
- According to the articles, what benefits did his team gain by using a State Management Library like Redux?

## Understanding Redux

The state problems introduced when scaling up React Applications is not unique to this single library.  This problem occurs in Angular 1 & 2, Backbone, Ember and lots of other front-end frameworks.  As data needs to be moved around more often, it is sometimes necessary for that data to all live in another place.  One of the great things about Redux is that is is library and framework agnostic, meaning that it can be used in all of these other libraries as well!

When people first get started with Redux, the biggest difficulties with its learning curve is understanding the terminology and philosophy behind the library.  This difficulty is compounded when you try to learn Redux terminology at the same time as learning the other tools to implement Redux.  For now, we are focusing on the terms related to the Redux library and design pattern.

### Terminology

Just like when we learned about MVC, there are several new terms to learn when we begin to utilize Redux.  Though we will see more terms when we connect it to React, Redux itself only has 4 major concepts to understand.

#### Store

The store is the `Single Source of Truth` that information in a program flows through. The store encapsulates not only the data in the program, but also controls the flow of program data, storing each change in a separate state. Redux even gives us the ability to time travel through our application's history of application states. It's ends up looking like a really large JavaScript object.

All the principles of Redux are embodied in the store. The store holds an application's states (including current and previous states), actions which specify different changes to make on some part of the application state, and the reducer, which specifies which actions update the state object.

Since state is being represented as an immutable data-structure, we cannot directly modify it. Changing state in the program requires dispatching an action that modifies a copy of the state.

#### Action

The action is the simplest of new terms. Actions are simply a JavaScript object that describes what change is being made and contains any data relative to the change.

```js
{
  type: 'ADD_TODO',
  todo: 'Learn Redux'
}
```

The only requirement of these actions is that it must be an object with a `type` that is a string.  Any additional key/value pairs are completely optional.

These actions feed new data into our store, and are typically created inside of an action creator.

#### Action Creator

Action Creators are just functions that return an Action.

```js
const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo: todo
  }
}

addTodo('Learn Redux')
```

### Reducer

When an action gets dispatched it is sent to the Reducer.  The Reducer is a `pure` function that describes how the action will update the store (aka state object)

The reducer will always take the **previous state** and the **action** that was dispatched and will always return a brand new state. The body of the function is normally a switch statement that looks at the `type` property in the action.  Each `case` in the switch statement will be an action `type` that the reducer is listening for.  If there is a match, the reducer will return a brand new object or array for the state object.

```js
const exampleReducer = (state, action) => {
  switch(action.type){
    case: 'EXAMPLE_ACTION'
      //Do some stuff and return a new state
      return newState

    // Make sure to always have a default that returns state
    default:
      return state;
  }
}
```

### 3 Principles of Redux

#### 1. Single Source of Truth

**The state of your whole application is stored in an object tree within a single store.**

This makes it easy to create universal apps, as the state from your server can be serialized and hydrated into the client with no extra coding effort. A single state tree also makes it easier to debug or inspect an application; it also enables you to persist your app's state in development, for a faster development cycle. Some functionality which has been traditionally difficult to implement - Undo/Redo, for example - can suddenly become trivial to implement, if all of your state is stored in a single tree.

#### 2. State is Read-Only

**The only way to change the state is to emit an action, an object describing what happened.**

This ensures that neither the views nor the network callbacks will ever write directly to the state. Instead, they express an intent to transform the state. Because all changes are centralized and happen one by one in a strict order, there are no subtle race conditions to watch out for. As actions are just plain objects, they can be logged, serialized, stored, and later replayed for debugging or testing purposes.

#### 3. Changes are Made with Pure Functions

**To specify how the state tree is transformed by actions, you write pure reducers.**

Reducers are just pure functions that take the previous state and an action, and return the next state. Remember to return new state objects, instead of mutating the previous state. You can start with a single reducer, and as your app grows, split it off into smaller reducers that manage specific parts of the state tree. Because reducers are just functions, you can control the order in which they are called, pass additional data, or even make reusable reducers for common tasks such as pagination.

### Reducer Deep Dive

> The Redux reducer API is `(state, action) => newState`, but how you create those reducers is up to you. -Dan Abramov

Learning how to properly manipulate the reducer is by far the most difficult part of programming with Redux. Let's take a little bit of a deeper look at it and see if we can demystify the hard parts.

It's important to remember that the reducer's job is not to transform your state, but instead to **completely** replace the old state with a brand new state object.  This is achieved through combining two concepts built into JavaScript: **switch statements** and **pure functions**.

#### Switch Statements

It's possible that you have seen switch statements previously.  Switch statements are an additional way to handle conditionals in JavaScript. They are useful for scenarios where the alternative is a lot of `if-else` statements.

```js
switch(condition){
  case 'scenario 1':
    return 'Scenario one Selected'
  case 'scenario 2':
    return 'Scenario two selected'
  default:
    return 'Default Value Selected'
}
```

```js
if (condition === 'scenario 1'){
    return 'Scenario one Selected'
} else if (condition === 'scenario 2'){
    return 'Scenario two selected'
} else {
  return 'Default Value Selected'
}
```

#### Pure Functions

**Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.**

Redux relies on pure functions in order to trigger the update life cycle for a React component.  If you remember back to our conversation on functional programming, you'll remember that a pure function is simply a function given the same inputs it will always output the same value.  Additionally, pure functions will always output a brand new value.  Prior to ES6/ES7, it was very difficult to build pure functions, but this style of programming has exploded in popularity in recent years.

Let's take a look at some different ways we can output a brand new value.

- `[...previousArray]`  This is an example of spreading an array
- `{...previousObject}` This is a spread object
- `map, filter, reduce` are all examples of built in methods that clone an array.

### You Do:

Use pure functions to solve the following problems:

1. Use a pure function to add a `todo` to this existing array of todo objects:

```js
const todos = [
  {
    id: 1,
    task: 'Learn React',
    completed: true
  },
  {
    id: 2,
    task: 'Learn Redux',
    completed: false
  },
  {
    id: 3,
    task: 'Watch Black Mirror',
    completed: true
  }
]

const newTodo = {
  id: 4,
  task: 'Buy a Tesla',
  completed: false
}

function addTodo(todos, newTodo){
  // Your code here
}

addTodo(todos, newTodo)
```

2. Create a pure function called `editUserObject` that will take 2 objects, one that represents a user and another that represents changes to that user object.  Make sure that the object you return is a brand new object.

```js
const user = {
  name: 'Steve Jobs',
  company: 'Apple',
  email: 'steve@mac.me'
}

const userChanges = {
  email: 'steve@geocities.com'
}

function editUserObject(currentUser, edits){
  // Your code here
}

console.log(editUserObject(user, userChanges))
```

3. Return an array of objects that removes all fruits.

```js
const fruitsAndVeggies = ['Apple', 'Squash', 'Orange', 'Pear', 'Lime']

function removeFruit(originalArray){
  // Your code here
}

console.log(removeFruit(fruitsAndVeggies))
```

### Lab/Homework: [Building A Super Simple Shopping Cart With React/Redux](https://git.generalassemb.ly/ga-wdi-exercises/react-redux-shopping-cart)

For the remainder of this class and for homework this evening, try to work through this codealong that sets up a simple React and Redux application.  In here, you will be introduced to the `react` library and the `react-redux` library.  Pay attention to the components and methods that you import here and their relationship with the Redux pattern.  Don't copy paste the code here into your own React app... instead type out everything presented in the example and reflect on what is happening at each level.

## Further Reading

- [Redux Docs](https://redux.js.org/)
- [When do I know I'm ready for Redux](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f)
- [Dissecting Twitter's Redux Store](https://medium.com/statuscode/dissecting-twitters-redux-store-d7280b62c6b1)
- [Redux TLTR](https://medium.com/@nicotsou/tltr-redux-e4fc30f87e4a)

When do I know I’m ready for Redux?
This blog is about when you should start thinking about using Redux, the problems it solved for us and the benefits we found. It is based on what we learnt from scaling up our React app.

If you don’t know what state is, or you haven’t heard about Redux the rest of this blog might not make much sense. Here is a quick overview if these concepts are new to you. Otherwise skip ahead to the main story.

What is state?
State is just data. Think of it as a collection of application data like the current user’s name, if the user is logged in, if the page is loading. The state for an application might change based on things such as user actions or a response from an API. An application will read the state to determine what sort of User Interface it should show.

What is Redux?
Redux is a tool for managing application state. It’s a very common tool used in React applications.

Why we decided to use Redux
Premature optimisation is the root of all evil — Donald Knuth
This is a quote I follow when I am building software. It’s the main reason why when we started building the latest React app for the Australian Broadcasting Corporation we chose to start off managing our application state using local component state.

This worked really well for the first few weeks but we soon started to see issues with our state management as we added more features to our app.

It became really difficult to trace state changes through our app. The functions that changed our application state were scattered through several React components. Some of our components were becoming bloated with functions to manage our state. It was all getting a bit messy and we saw our codebase slowly starting to resemble a big bowl of spaghetti.


So let me step you through my experience of scaling up our app.

Day 1
We started out using React local component state.

React has ‘unidirectional data flow.’ This means components send state downwards as props.

We set our state in our top level component then send the data down as props. Easy.


Day 5
We add some more functionality. Unfortunately, some of our components need to share state, but they don’t share a parent-child relationship.

No worries, we solve this issue by ‘Lifting state’. This means that we lift the state (and functions that change this state) to the closest ancestor(Container Component). We bind the functions to the Container Component and pass them downwards as props. This means that child components can trigger state changes in their parent components, which will update all other components in the tree. Nice.


Day 20
We’ve added a few features and our application state flow started to look like this…


As you can see the way state is being updated and dispersed across our application is becoming more complex. Here are the main pain points we started to feel as we scaled our application up:

Our component structure was based on the applications UI. Our applications state did not necessarily follow our UI.
The shape of our application state was spread across many components.
The functions that changed our state were spread across many components.
To have an overview of the application state, you need to have a mental model of the application structure.
We were passing the same props through multiple levels of components.
It became harder to trace state changes when debugging our app.
If you are starting to run into some of the above issues, it may mean you are ready for Redux.

How does Redux work?
Let me start by saying not all React applications need to use Redux. In fact most really simple React apps don’t benefit from Redux at all.

The most common complaint about Redux is that it’s quite verbose and can take some time to get your head around. It requires developers to explicitly describe how application state is updated through actions and reducers. It allows you to maintain the application state as a single global store, rather than in local component state.

Here is a quick overview of how Redux is structured.

Actions
An action is just information about an event. When you want to update your state with Redux, you always start by dispatching an action. Actions must include the name of the action and optionally any information that needs to be sent with the action. The reason actions must state their type is so the reducer can identify them. In short, an action is just static information about the event that initiates a state change.

Reducer
When an action is dispatched it is sent to the reducer. The reducer is a pure function that describes how each action updates the store. A Pure function is a function that given the same input, will always return the same output. A key point to also remember is that the reducer will always return a new application state. It will never directly mutate the store.

Store
The store is the application state stored as objects. React components can subscribe to the store and whenever the store is updated, it will update the components.

Here is what that looks like. I’ve added an updated version of the diagram, but this time using Redux.

Remember: With Redux we dispatch an action, which triggers our Reducer function, which updates our Store.


What we learnt
After we updated to Redux, these were the benefits we noticed:

Simplified our React components
We were able to flatten our React component structure and even remove some container components. This was because we no longer needed to organise the hierarchy of components around passing data downwards.
We were able to convert some class components to functional components.
Separation of concerns
Having a distinct section of our application that described all of the actions and reducer functions made it easier for new developers to get a quick overview of the business logic of our app in a single place.
Our React components became less bloated with state and functions that updated state. This meant our components could just focus on managing the User Interface and were much more readable.
Quality
It was much easier to debug our state, especially with Redux logger.
Redux is ridiculously easy to write unit tests for.
Finishing up
Premature optimisation is the root of all evil — Donald Knuth
While I still hold true to this quote, I believe that implementing Redux in most React applications early on is the right approach. From our experience, the point where just using local state becomes cumbersome happens pretty quickly.

If your app meets some of the following criteria, I reckon implementing Redux right away is the best approach.

The UI can vary significantly based on application state.
State doesn’t always flow in a linear, unidirectional way.
Common user journeys through your app involve multiple state updates.
Many unrelated components update state in the same way.
The state tree is not simple.
State is updated in many different ways.
You need to be able to undo previous user actions.
It is worth noting that we still do use local state in our app for certain components. For example we have quite a few form screen components and we feel that handling form validation is still best done using local state for now. There are a few reasons why we kept local state for our form screens.

We didn’t want the form state to persist after the component dismounted.
Form validation state was never shared outside of the component.
Want to get started?
Here are some of the fantastic resources I have used to learn Redux.

****************************************************************************

    The ideas behind Redux
        --       --

How doe redux manage and update state? React wass not the first library to have a state problem. State is complex and hrd to manage over timel to accoutnt for every single possible interation a user may have. And Redux is not the only Global State anaer,

The terminaology is heady along with the oncpets ofRedux. Only after undertanifn shy we call this a vie or a model:

* The store: The single source of truth. It's the soleplace to go for your state. TH store determies the state,however bedsides creating it, the store isn't used that often. All the state is within the store is a big JavaSript Object...



 * Anything that can be dynmically changed can be stored in this one state object. The airB&B hub's store has 1299+ lines. 

THe store is immutable. It is very staatic, nd it cannt be changed. its used to show what the page consists of andwhat to change. 


 *  A javascript object that describes the action that is happening. Ex: whenever I click to go to the homepage, an action pops called user login. The login action is just an object which contains information about thr objcet.

 ** == An action is just information about an event. When you want to update your state with Redux, you always start by dispatching an action. Actions must include the name of the action and optionally any information that needs to be sent with the action. The reason actions must state their type is so the reducer can identify them. In short, an action is just static information about the event that initiates a state change

* reducer, when an action is dispatched it gets sent to the reduce. 


 * When an action is dispatched it is sent to the reducer. The reducer is a pure function that describes how each action updates the store. A Pure function is a function that given the same input, will always return the same output. A key point to also remember is that the reducer will always return a new application state. It will never directly mutate the store.

 Your initial state; now we ned to call our reucer whenever the actions get dispatched. Anyimee e upate the sate, it needs to be focusd on the reducer 

EXAMPLE of REDUX:

**************************************************************************************

//Store
const todoStore = []


//Action Creator
const addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo: todo
    }
}

    //Reducer
     switch(action, type) {
         case 'EXAMPLE ACTION';
         //if action tyoe equals example funtion, return this. 
         //DO SOME STUF AND RETURN A NEW STATE
         return newState
        case 'ADD_TODO'
        return [ ... state, action.todo]
        //this returns a brand new object that also contains/incoporates ACtion.todo

         //make sure to always have a default that returns state
        default:
    return state;
     }
 }
//Actions predict UX, and enable us to say: if... this string.. return this or manipulate the state in this way throught state manipulation. Actions help monitor the user, and when a user clcks a button or selects something, there is a reducer somewhere determing how to address the change with  virtual om manipulation 
 const action1 = addToDo('Learn Redux')
 const action2 = addTodo('Learn Functional JS')
const newState = exampleReducer(todoStore, action1)
const newState3 = exampeRdeucer(newstate2, action3)
conole.log(newState)

**************************************************************************************
When you have the actions that will be dispatched through user interactions or events: are examples of triggering a action. The reducer will do its thing and dispatch a brand new state onject. THen the dom is updated by the store saying hy we have a new object. 

Store: where the state lives.
Action: I gets fedinto the reducer and the reducer goted to the state topass info. THe action asks the reducer what ation should i take? the type tells the reducer what kind of action to take. 

Th reducer can do al sorts of things but the type needs to line up with the case and the case needs to return a brand nw object or array or etc that can be returned with alterations made to the stae. Th entrire application canbe stored in one Object. 

You can update JSX and not have toe rest your JSX. WE can use Hot Moduling for live updates. 

How do we chagne our state in react? Setting a new stte: this.setState. 

in redux, we pass in new The ouput is always goubg to be brand new data. You arent changing or mutating anything that alredy exists. [... etc, etc]


**************************************************************************************

pure functions: 

Pure Functions
Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.

Redux relies on pure functions in order to trigger the update life cycle for a React component. If you remember back to our conversation on functional programming, you'll remember that a pure function is simply a function given the same inputs it will always output the same value. Additionally, pure functions will always output a brand new value. Prior to ES6/ES7, it was very difficult to build pure functions, but this style of programming has exploded in popularity in recent years.

Let's take a look at some different ways we can output a brand new value.

[...previousArray] This is an example of spreading an array
{...previousObject} This is a spread object
map, filter, reduce are all examples of built in methods that clone an array.


**************************************************************************************

EXAMPLE:

// // You Do:
// // Use pure functions to solve the following problems:
// Let's take a look at some different ways we can output a brand new value.

// [...previousArray] This is an example of spreading an array
// {...previousObject} This is a spread object
// map, filter, reduce are all examples of built in methods that clone an array.

// Use a pure function to add a todo to this existing array of todo objects:
const todos = [
  {
    id: 1,
    task: 'Learn React',
    completed: true
  },
  {
    id: 2,
    task: 'Learn Redux',
    completed: false
  },
  {
    id: 3,
    task: 'Watch Black Mirror',
    completed: true
  }
]

const newTodo = {
  id: 4,
  task: 'Buy a Tesla',
  completed: false
}

function addTodo(todos, newTodo){
  //gives us a brand new piece of data wth these two arguments generating the //input
return[... todos, newTodo]
}


***********************************************************88
Create a pure function called editUserObject that will take 2 objects, one that represents a user and another that represents changes to that user object. Make sure that the object you return is a brand new object.
const user = {
  name: 'Steve Jobs',
  company: 'Apple',
  email: 'steve@mac.me'
}

const userChanges = {
  email: 'steve@geocities.com'
}

 * function editUserObject(currentUser, edits){
  * return { ...currentUser, ...edits }
}

console.log(editUserObject(user, userChanges))