import React, { Component } from 'react';
import firebase from 'firebase';
import uuid from 'uuid';


//from firebase
var firebaseConfig = {
    apiKey: "AIzaSyDCbl2Kp9DVfyFD3k1r9tu8Jc_P5BeabRM",
    authDomain: "uservey-c0aef.firebaseapp.com",
    databaseURL: "https://uservey-c0aef.firebaseio.com",
    projectId: "uservey-c0aef",
    storageBucket: "uservey-c0aef.appspot.com",
    messagingSenderId: "75822900868",
    appId: "1:75822900868:web:09aeb61146dc3201"
};
firebase.initializeApp(firebaseConfig);

class Uservey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmitted: false
        };
    }
    formSubmit = (event) => {
        this.setState({ studentName: this.refs.name.value }, () => {
            console.log(this.state.studentName);
        })
    }
    queSubmit = (event) => {
        firebase.database().ref('userveys/' + this.state.uid)
            .set({
                studentName: this.state.studentName,
                answers: this.state.answers
            });
        this.setState({
            isSubmitted: true
        });
    }
    answerselected = (event) => {
        var answers = this.state.answers;
        if (event.target.name === 'answer1')
            answers.answer1 = event.target.value
        else if (event.target.name === 'answer2')
            answers.answer2 = event.target.value
        else if (event.target.name === 'answer3')
            answers.answer3 = event.target.value
        this.setState({
            answers
        }, () => {
            console.log(answers)
        })
    }
    render() {
        var studentName;
        var questions;
        if (this.state.studentName === '' && this.state.isSubmitted === false) {
            studentName = <div>
                <h1>What is your name?</h1>
                <form onSubmit={this.formSubmit}>
                    <input type="text" placeholder="Enter your name.." ref="name" />
                </form>
            </div>;
            questions = '';
        }
        else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
            studentName = <h1>Hey,{this.state.studentName} let us begin our survey</h1>

            // studentName=<h1>Hello,{this.state.studentName}</h1>,
            questions = <div>
                <h2>Here are some questions:</h2>
                <form onSubmit={this.queSubmit}>
                    <div className="card">
                        <label>What is your field of interest?</label><br />
                        <input type="radio" name='answer1' value="Technology" onChange={this.answerselected} />Technology
                        <input type="radio" name='answer1' value="Design" onChange={this.answerselected} />Design
                        <input type="radio" name='answer1' value="Marketing" onChange={this.answerselected} />Marketing
                    </div>
                    <div className="card">
                        <label>Which JS Framework you work on?</label><br />
                        <input type="radio" name='answer2' value="ReactJs" onChange={this.answerselected} />ReactJs
                        <input type="radio" name='answer2' value="AngularJs" onChange={this.answerselected} />AngularJs
                        <input type="radio" name='answer2' value="VueJs" onChange={this.answerselected} />VueJs
                    </div>
                    <div className="card">
                        <label>What are looking for?</label><br />
                        <input type="radio" name='answer3' value="Job" onChange={this.answerselected} />Job
                        <input type="radio" name='answer3' value="Internship" onChange={this.answerselected} />Internship
                        <input type="radio" name='answer3' value="Trainings" onChange={this.answerselected} />Trainings
                    </div>
                    <br /><br />
                    <input type="submit" className="feedback-button" value="submit" />

                </form>
            </div>
        }
        else if (this.state.isSubmitted === true && this.state.studentName !== '')
            studentName = <h1>Thanks,{this.state.studentName}</h1>
        return (
            <div>
                {studentName}
                {questions}
            </div>);
    }
}

export default Uservey;