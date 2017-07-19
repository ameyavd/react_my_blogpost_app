import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field) { //field argument internally connects with the Field tag

    const { meta: { touched, error } } = field;
    const className =`form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className= { className }>
        <label>{field.label}</label>
        <input className="form-control"
        type="text"
        {...field.input}   //pre generated event handler which handles event connection with Field tag with input tag
        />
        <div className="text-help">
        {touched ? error : ''}
        </div>
      </div>  //this meta.error property is automatically added to field object from validate function
    );
  }

 onSubmit(values){
     // this.props.history.push('/'); taking back to the root route of our application
    this.props.createPost(values, () => {
      this.props.history.push('/');  //taking back to the root route of our application after
    });
 }

  render(){

    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <Field
      label="Title for post"
      name="title"
      component={this.renderField}
      />

      <Field
      label="Categories"
      name="categories"
      component={this.renderField}
      />

      <Field
      label="Post Content"
      name="content"
      component={this.renderField}
      />

      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to='/' className="btn btn-danger">Cancel</Link>

      </form>
    );
  }
}

function validate(values){ //validation of user inputs
  //values -> {title: 'asasa', categories:'qwqwq qwqw qwqw', content:'wqwqwqqww'}
  const errors = {};


  if(!values.title){
    errors.title = 'Enter a title!';
  }

  if(!values.categories){
    errors.categories = 'Enter some categories';
  }

  if(!values.content){
    errors.content = 'Enter some content please';
  }

  // If errors is empty then the form is fine to submit.
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
