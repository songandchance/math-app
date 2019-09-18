import React from 'react';
import './App.css';

class MathApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {first: '',
                  second: '',
                  answer: '',
                  guess: '',
                  operator: '',
                  numRight: 0};
  }

  onClickButton = () => {
      this.createProblem(4);
      /*
      this.setState({
        numRight: 0
      })
      */
      document.getElementById("score").innerHTML = 'Number Right: ' + this.state.numRight;
  }

  createProblem = (max) => {
    new Promise((resolve, reject) => {
      var problem = {};
      problem[0] = this.getRandomInt(max);
      problem[1] = this.getRandomInt(max);
      problem[2] = problem[0] + problem[1];
      this.setState({
        first: problem[0],
        second: problem[1],
        answer: problem[2]
      });
      resolve(problem)
    }).then(problem => {
      //console.log('First : ' + this.state.first);
      //console.log('Second: ' + this.state.second);
      //console.log('Answer: ' + this.state.answer);
      document.getElementById("problem").innerHTML = this.state.first + " <br> + " + this.state.second;
    })
  }
  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }  

  checkAnswer = () => {
    if (this.state.guess == this.state.answer)
    {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  }

  handleKeyPress = event => {
    event.persist();
    var userGuess = '';
    if (event.key == '0' ||  event.key == '1' ||  event.key == '2' ||  event.key == '3' ||  event.key == '4' ||  event.key == '5' ||  event.key == '6' ||  event.key == '7' ||  event.key == '8' ||  event.key == '9') {
      new Promise((resolve, reject) => {
        userGuess += event.key;
        resolve(userGuess);
      }).then(userGuess => {
        this.setState ({
          guess: event.key
        })      
        document.getElementById("answer").innerHTML = this.state.guess;
        //document.getElementById("answer").innerHTML = "<img src=\"" + window.location.origin + "/images/" + userGuess + ".png\">"; 
        //console.log('Guess: ' + userGuess);  
      })
    }
    
    if (event.key === 'Enter') {
      new Promise((resolve, reject) => {
        if (this.checkAnswer()) {
          this.setState({
            numRight: this.state.numRight + 1
          })
          resolve(event);
        }
      }).then(event => {
        document.getElementById("score").innerHTML = 'Number Right: ' + this.state.numRight;
        document.getElementById("answer").innerHTML = '';
        userGuess = '';
        console.log(this.state.numRight)
      })
    }
  };


  render() {
    return (
      <div onKeyPress={this.handleKeyPress}>
        <h1>Math!</h1>
        
      <button
        onClick={this.onClickButton}>
          Start!
      </button>
      <br /><br />
      <div id="score"></div>
      <div id="problem"></div> --- <div id="answer"></div>
      </div>
    );
  }
}

function App() {
  return (      
    <div className="App">
      <header className="App-header">
        
        <MathApp />
      </header>
    </div>
  );
}

export default App;