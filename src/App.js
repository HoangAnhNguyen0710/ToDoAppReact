import './App.css';
import React, { Component } from 'react';

// funtional component 
const MyInput = (props) => {
  return(
    <input ref={props.inputRef} type='text'/>
  );
}

const FuncCustomComp = () => {
  let inputRef = null;
  
  const onClick = () => {
    inputRef.focus();
  }

    return(
      <React.Fragment>
        <div>
          <span>My Input :</span>
           <MyInput inputRef={(input) => {inputRef = input}}/>
          <input type='submit' value='submit' onClick={onClick}/>
        </div>
      </React.Fragment>
    );
}

class App extends Component {
  
  onClick = () => {
    alert(this.firstName.value);
  }

  onKeyUp = (target, e) => {
    //nếu input nhận vào enter thì focus xuống input tiếp theo
    if(e.keyCode === 13){
      switch(target){
        case 'firstName' :
          this.lastName.focus();
          break;
        case 'lastName' :
          this.age.focus();
          break;
        case 'age' : 
          this.submit.focus();
          break;
        default :
          this.firstName.focus();
      }
    }
  }

  render() { 
    return (
       <div className='App'>
         <FuncCustomComp/>
         <div>
           <span>First Name</span>
           <input ref={(input)=>{this.firstName = input}} type='text' onKeyUp={this.onKeyUp.bind(this, 'firstName')}/>
         </div>
         <div>
           <span>Last Name</span>
           <input ref={(input)=>{this.lastName = input}} type='text' onKeyUp={this.onKeyUp.bind(this, 'lastName')}/>
         </div>
         <div>
           <span>Age..... .......</span>
           <input ref={(input)=>{this.age = input}} type='number' onKeyUp={this.onKeyUp.bind(this, 'age')}/>
         </div>
         <div>
           <input ref={(input)=>{this.submit = input}} type='submit' value='submit' onClick={this.onClick} onKeyUp={this.onKeyUp.bind(this, 'submit')}></input>
         </div>
       </div>
    );
  }
}
 
export default App;

