import React from 'react';

export default ({input, name, type}) => {
	return (
		<div className={`form-group ${input.touched && input.invalid ? 'has-danger' : ''}`}>
			<label>{name}</label>
			{type === 'textarea'
				?
					<textarea className="form-control" {...input} />
				:
					<input type="text" className="form-control" {...input} />
			}
			<div className="form-control-feedback">
				{input.touched ? input.error : ''}
			</div>
		</div>
	);
};