import React, { Component } from 'react'

class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        // 
        todos : []
      };
    }
  
    componentDidMount() {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              todos : result
            });
            console.log('a');
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <ul>
            {this.state.todos.map(todo => (
              <li key={todo.id}>
                {todo.userId} {todo.title}
              </li>
            ))}
          </ul>
        );
      }
    }
  }

export default MyComponent;