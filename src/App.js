import { Component } from 'react';
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import {v4 as uuid} from "uuid"; 
import axios from 'axios';

class App extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    //console.log(uuid());
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({todos: res.data}))
  }
  // Toggle the todos
  markComplete = (id) => {
    //console.log(id);
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id===id){
        todo.completed = !todo.completed
      }
      return todo
    })})
  }
  //delete todo
  delTodo = (id) => {
    //console.log(id)
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({todos: [...this.state.todos.filter(todo =>
      todo.id!==id)]}))
    

  }
  // add todo 
  addTodo = (title) => {
   // console.log(title)
  //  const newTodo = {
  //   id: uuid(),
  //    title : title,
  //    completed: false
  //  }
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    title: title,
    completed: false
  })
  .then(res =>{ 
    res.data.id=uuid()
    this.setState({ todos: [...this.state.todos,res.data]})
  //  console.log(res.data.id)
  })
   
  }

  render() {
    //console.log(this.state.todos)
  return (
    <Router>
    <div className="App">
      <div className="container">
        <Header />
        <Route exact path="/" render={props => (
          <React.Fragment>
             <AddTodo addTodo={this.addTodo}/>
        <Todos todos={this.state.todos} markComplete = {this.markComplete} 
         delTodo = {this.delTodo}/>
          </React.Fragment>
        )} />
        <Route exact path="/about" component = {About} />
       
      </div>
    </div>
    </Router>
  );
}
}

export default App;
