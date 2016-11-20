import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';
import FormInput from './form_input';
import {fetchPost} from '../actions/';

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	onSubmit(props) {
		// the api doesn't implement the update property. This is done purely
		// for experimental reasons, on how to load initial data into the form
		console.log('Update would be sent with: ', props);
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
				<Link to={`/posts/${this.props.params.id}`} className="btn btn-danger">Cancel</Link>
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

// in order to load initial values from server to the post, we need to declare
// it in a prop 'initialValues' and thats basically it... easy pease
function mapStateToProps(state) {
	return {
		initialValues: state.posts.post
	};
}

// connect: 1st mapStateToProps, 2nd mapDispatchToProps
// reduxForm: 1st form config, 2nd mapStateToProps, 3rd mapDispatchToProps
export default reduxForm({
	form: 'PostsEdit',
	fields: [
		'title',
		'categories',
		'content'
	],
	validate
}, mapStateToProps, {fetchPost})(PostsNew);