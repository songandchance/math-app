import React from 'react';
import './App.css';

class MathApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {first: '',
                  second: '',
                  answer: '',
                  guess: '',
                  operation: '',
                  numRight: 0};
  }

  onClickButton = () => {
    new Promise((resolve, reject) => {
      if (document.getElementById("operator").value != null) {
      var e = document.getElementById("operator").value;
      }
      resolve(e)
    }).then(e => {
      if (e !== this.state.operation) {
        this.setState({
          numRight: 0,
          operation: e
        });        
      }
      if (e === 'add') {
        this.createAdditionProblem(9);
      } else if (e === 'subtract') {
        this.createSubtractionProblem(9);
      } else if (e === 'multiply') {
        this.createMultiplicationProblem(5);
      } else if (e === 'divide') {
        this.createDivisionProblem(9);
      } else {
        this.createAdditionProblem(4);
      }
      document.getElementById("score").innerHTML = 'Number Right: ' + this.state.numRight;
    })      
  }

  createAdditionProblem = (max) => {
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
      document.getElementById("problem").innerHTML = this.state.first + " <br> + " + this.state.second;
    })
  }

  createSubtractionProblem = (max) => {
    new Promise((resolve, reject) => {
      var problem = {};
      problem[0] = this.getRandomInt(max);
      problem[1] = this.getRandomInt(max);
      while (problem[0] < problem[1]) {
        problem[1] = this.getRandomInt(max);
      }
      problem[2] = problem[0] - problem[1];
      this.setState({
        first: problem[0],
        second: problem[1],
        answer: problem[2]
      });
      resolve(problem)
    }).then(problem => {
      document.getElementById("problem").innerHTML = this.state.first + " <br> - " + this.state.second;
    })
  } 

  createMultiplicationProblem = (max) => {
    new Promise((resolve, reject) => {
      var problem = {};
      problem[0] = this.getRandomInt(max);
      problem[1] = this.getRandomInt(max);
      problem[2] = problem[0] * problem[1];
      this.setState({
        first: problem[0],
        second: problem[1],
        answer: problem[2]
      });
      resolve(problem)
    }).then(problem => {
      document.getElementById("problem").innerHTML = this.state.first + " <br> * " + this.state.second;
    })
  }  

  createDivisionProblem = (max) => {
    new Promise((resolve, reject) => {
      var problem = {};
      problem[0] = this.getRandomInt(max) + 1;
      problem[1] = this.getRandomInt(max);
      while (problem[1] % problem[0] != 0 || problem[0] < problem[1]) {
        problem[1] = this.getRandomInt(max);
      }
      if (problem[1] == 0) {
        problem[1] += 1;
      }      
      problem[2] = problem[0] / problem[1];
      this.setState({
        first: problem[0],
        second: problem[1],
        answer: problem[2]
      });
      resolve(problem)
    }).then(problem => {
      document.getElementById("problem").innerHTML = this.state.first + " <br> ÷ " + this.state.second;
    })
  } 

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }  

  checkAnswer = () => {
    if (this.state.guess == this.state.answer)
    {
      return true;
    } else {
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
          guess: this.state.guess + event.key
        })      
        document.getElementById("answer").innerHTML = this.state.guess;
      })
    }
    
    if (event.key == 'Enter') {
      new Promise((resolve, reject) => {
        if (this.checkAnswer()) {
          this.setState({
            numRight: this.state.numRight + 1
          })
          
        }
        resolve(event);
      }).then(event => {
        this.setState({
          guess: ''
        })
        document.getElementById("score").innerHTML = 'Number Right: ' + this.state.numRight;
        document.getElementById("answer").innerHTML = '';
        userGuess = '';
      })
    }
  };

  render() {
    return (
      <div onKeyPress={this.handleKeyPress}>
        <h1>Math!</h1>
      <select id="operator">
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
        <option value="multiply">Multiply</option>
        <option value="divide">Divide</option>
      </select>  
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