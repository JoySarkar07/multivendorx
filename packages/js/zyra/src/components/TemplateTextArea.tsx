import React from "react";
import HoverInputRender from "./HoverInputRender";

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
            onLabelChange={ ( newLabel ) => onChange( "label", newLabel ) }
            renderStaticContent={ ( { label, placeholder } ) => (
                <div className="edit-form-wrapper">
                    <p>{ label }</p>
                    <div className="settings-form-group-radio">
                        <input
                            className="input-text-section textArea-text-input"
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
                        className="input-label textArea-label"
                        type="text"
                        value={ label }
                        onChange={ ( event ) =>
                            onLabelChange( event.target.value )
                        }
                    />
                    { /* Render placeholder */ }
                    <input
                        className="input-text-section textArea-text-input"
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
