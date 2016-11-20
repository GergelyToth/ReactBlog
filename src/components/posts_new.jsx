import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/';
import {Link} from 'react-router';
import FormInput from './form_input';

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		this.props.createPost(props)
			.then(() => {
				// blog post has been created, navigate the user to the index
				// we navigate by calling this.context.router.push with the new =
				// path to navigate to.
				this.context.router.push('/');
			});
	}

	render() {
		const {handleSubmit, fields: {title, categories, content}} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a New Post</h3>
				<FormInput input={title} name="Title" />
				<FormInput input={categories} name="Categories" />
				<FormInput input={content} name="Content" type="textarea" />

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a title';
	}
	if (!values.categories) {
		errors.categories = 'Enter some categories';
	}
	if (!values.content) {
		errors.content = 'Enter some content';
	}

	return errors;
}

// connect: 1st mapStateToProps, 2nd mapDispatchToProps
// reduxForm: 1st form config, 2nd mapStateToProps, 3rd mapDispatchToProps
export default reduxForm({
	form: 'PostsNew',
	fields: [
		'title',
		'categories',
		'content'
	],
	validate
}, null, {createPost})(PostsNew);