import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {updateQuestion, deleteQuestion} from '../../store/actions';

const mapStateProps = (state) => ({
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  deleteQuestion: payload => dispatch(deleteQuestion(payload)),
  updateQuestion: payload => dispatch(updateQuestion(payload)),
});

export class Question extends React.Component {
  constructor() {
    super();

    this.state = {editing: false};

    this.answerInput = null;
    this.questionInput = null;
  }

  handleAnswerClick(e) {
    e.preventDefault();
    this.props.onAnswer({
      question: this.props.question,
      answer: this.answerInput.value,
    });
    this.answerInput.value = '';
    return false;
  }

  handleDeleteQuestionClick(e) {
    e.preventDefault();
    this.props.deleteQuestion(this.props.question);
    return false;
  }

  handleUpdateQuestionClick(e) {
    e.preventDefault();
    const newQuestion = _.omit(this.props.question, ['owner', 'answers']);
    newQuestion.text = this.questionInput.value;
    this.props.updateQuestion(newQuestion);
    this.setState({editing: !this.state.editing});
    return false;
  }

  toggleEdit(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing});
    return false;
  }

  render() {
    const {question, user, onAnswer, deleteQuestion, updateQuestion} = this.props;
    const {editing} = this.state;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {user.id === question.owner.id && (
            <span>
              <button
                className="btn btn-link"
                id="deleteBtn"
                onClick={e => this.handleDeleteQuestionClick(e)}>
                <span className="glyphicon glyphicon-trash" />
              </button>
              {editing ? '' : (
                <button
                  className="btn btn-link"
                  onClick={e => this.toggleEdit(e)}
                  id="editBtn"
                >
                  <span className="glyphicon glyphicon-pencil" />
                </button>
              )}
            </span>
          )}
          {editing ? (
            <span>
              <input
                type="text"
                ref={i => { this.questionInput = i; }}
                defaultValue={question.text}
                id="questionText"
              />
              <button
                className="btn btn-link"
                onClick={e => this.handleUpdateQuestionClick(e)}
                id="updateBtn"
              >
                <span className="glyphicon glyphicon-ok" />
              </button>
              <button
                className="btn btn-link"
                onClick={e => this.toggleEdit(e)}
              >
                <span className="glyphicon glyphicon-remove" />
              </button>
            </span>
          ) : question.text}

          <div className="pull-right">
            <Link to={`/profile/${question.owner.id}`}>
              {question.owner.login}
            </Link>
          </div>
        </div>
        <div className="panel-body">
          {question.answers.length > 0 ? (
            <ul className="list-group">
              {question.answers.map((answer, i) => (
                <li className="list-group-item" key={i}>{answer.answer}</li>
              ))}
            </ul>
          ) : 'No answers yet'}
        </div>
        <div className="panel-footer">
          <form className="form-horizontal">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="answerInput"
                placeholder="Enter your answer..."
                ref={(i) => { this.answerInput = i; }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-default"
              id="answerBtn"
              onClick={e => this.handleAnswerClick(e)}>Answer
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateProps, mapDispatchToProps)(Question);
