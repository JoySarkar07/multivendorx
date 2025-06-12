/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import HoverInputRender from './HoverInputRender';

// Types
interface TextareaProps {
	formField: { label: string; placeholder?: string };
	onChange: ( field: string, value: string ) => void;
}

const TemplateTextArea: React.FC< TextareaProps > = ( {
	formField,
	onChange,
} ) => {
	return (
		<HoverInputRender
			label={ formField.label }
			placeholder={ formField.placeholder }
			onLabelChange={ ( newLabel ) => onChange( 'label', newLabel ) }
			renderStaticContent={ ( { label, placeholder } ) => (
				<div className="edit-form-wrapper">
					<p>{ label }</p>
					<div className="settings-form-group-radio">
						<input
							className="basic-input"
							type="text"
							value={ placeholder }
							readOnly
						/>
					</div>
				</div>
			) }
			renderEditableContent={ ( {
				label,
				onLabelChange,
				placeholder,
			} ) => (
				<>
					<input
						className="basic-input textArea-label"
						type="text"
						value={ label }
						onChange={ ( event ) =>
							onLabelChange( event.target.value )
						}
					/>
					{ /* Render placeholder */ }
					<input
						className="basic-input"
						type="text"
						placeholder={ placeholder }
						readOnly
					/>
				</>
			) }
		/>
	);
};

export default TemplateTextArea;
