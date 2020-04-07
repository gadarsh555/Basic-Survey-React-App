import React,{ Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var firebaseConfig = {
    apiKey: "AIzaSyDNpRL3i8MVuUzPYkg9Dmw58JZJnWsemzo",
    authDomain: "usurvey-afe93.firebaseapp.com",
    databaseURL: "https://usurvey-afe93.firebaseio.com",
    projectId: "usurvey-afe93",
    storageBucket: "usurvey-afe93.appspot.com",
    messagingSenderId: "799685511021",
    appId: "1:799685511021:web:3955a034521b22bdddbc64",
    measurementId: "G-1HE27VR3B1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

class Usurvey extends Component {

nameSubmit(event){
    var studentName = this.refs.name.value;
    this.setState({studentName:studentName},()=>{
        console.log("reference got is :",this.ref);
        console.log("state got is:",this.state);
    });
}

answerSelected(event){
   var answers = this.state.answers;
   if(event.target.name === 'answer1'){
       answers.answer1 = event.target.value;
   }
   else if(event.target.name === 'answer2'){
       answers.answer2 = event.target.value;
   }
   else if(event.target.name === 'answer3'){
    answers.answer3 = event.target.value;
   }
   console.log(this.state);
}

questionSubmit(){
    firebase.database().ref('survey/'+this.state.uid).set({
        name : this.state.studentName,
        answers : this.state.answers
    });
    this.setState({isSubmitted : true});
}

constructor(props){
super(props);
    this.state = {
        uid:uuid.v1(),
        studentName:"",
        answers : {
            answer1 : "",
            answer2 : "",
            answer3 : ""
        },
        isSubmitted : false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
}

render(){

var studentName;
var questions;

if(this.state.studentName === "" && this.state.isSubmitted === false){
    studentName = <div>
        <h1>Please, enter your name : </h1>
        <form onSubmit={this.nameSubmit}>
          <input id="getname" type="text" placeholder="name" ref="name"/>
        </form>
    </div>;
    questions = '';
}
else if(this.state.studentName !== "" && this.state.isSubmitted === false){
studentName = <h1>Welcome to our survey, {this.state.studentName}</h1>;
questions = <div>
    <form onSubmit={this.questionSubmit}>
         <div className="card">
             <label>You are a : </label><br/>
             <input type="radio" name="answer1" value="Student" onChange={this.answerSelected} />Student
             <input type="radio" name="answer1" value=">Looking for Job" onChange={this.answerSelected} />Looking for Job
             <input type="radio" name="answer1" value="Working" onChange={this.answerSelected} />Working
         </div>
         <div className="card">
             <label>The type of courses you like :</label><br/>
             <input type="radio" name="answer2" value="Technology" onChange={this.answerSelected} />Technology
             <input type="radio" name="answer2" value="Design" onChange={this.answerSelected} />Design
             <input type="radio" name="answer2" value="Marketing" onChange={this.answerSelected} />Marketing
         </div><div className="card">
             <label>Do you think online courses are helpful : </label><br/>
             <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} />Yes
             <input type="radio" name="answer3" value="No" onChange={this.answerSelected} />No
             <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected} />Maybe
         </div>
         <input className="feedback-button" type="submit" value="submit"></input><br/><br/><br/>
    </form>
</div>;
}
else if(this.state.studentName !== "" && this.state.isSubmitted === true){
studentName = <h1>Thank you for this survey, {this.state.studentName}</h1>;
}

return(
<div>
     <h3>This is Usurvey Component.</h3>
     {studentName}
     -------------------------------------------------------------------------------
     {questions}
</div>
);
}
}


export default Usurvey;