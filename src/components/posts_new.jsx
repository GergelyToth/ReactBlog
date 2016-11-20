import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/';
import {Link} from 'react-router';
import FormInput from './form_input';

const FIELDS = {
	title: {
		type: 'input',
		label: 'Title'
	},
	categories: {
		type: 'input',
		label: 'Categories'
	},
	content: {
		type: 'textarea',
		label: 'Content'
	}
}


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

				{_.map(FIELDS, (data, field) => {
					return <FormInput key={field} input={this.props.fields[field]} name={data.label} type={data.type} />
				})}

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	_.each(FIELDS, (type, field) => {
		if (!values[field]) {
			errors[field] = `Enter some ${field}`;
		}
	});

	return errors;
}

// connect: 1st mapStateToProps, 2nd mapDispatchToProps
// reduxForm: 1st form config, 2nd mapStateToProps, 3rd mapDispatchToProps
export default reduxForm({
	form: 'PostsNew',
	fields: _.keys(FIELDS), // ['title', 'categories', 'content']
	validate
}, null, {createPost})(PostsNew);