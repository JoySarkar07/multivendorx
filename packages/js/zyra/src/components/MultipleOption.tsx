import React, { useState, useRef } from "react";
import { ReactSortable } from "react-sortablejs";
import HoverInputRender from "./HoverInputRender";
import OptionMetaBox from "./OptionMetaBox";

interface Option {
    id: string;
    label: string;
    value: string;
    isdefault?: boolean;
}
interface FormField {
    id: number;
    type: string;
    label: string;
    required: boolean;
    name: string;
    placeholder?: string;
    options?: Option[];
}
interface MultipleOptionsProps {
    formField: FormField;
    onChange: ( key: string, value: any ) => void;
    type: "radio" | "checkboxes" | "dropdown" | "multiselect";
    selected: boolean;
}

const MultipleOptions: React.FC< MultipleOptionsProps > = ( {
    formField,
    onChange,
    type,
} ) => {
    const settingHasChanged = useRef( false );
    const firstTimeRender = useRef( true );
    const [ openOption, setOpenOption ] = useState< number | null >( null );

    const [ options, setOptions ] = useState< Option[] >( () => {
        return Array.isArray( formField.options ) && formField.options.length
            ? formField.options
            : [];
    } );

    const renderInputFields = ( type: string ) => {
        switch ( type ) {
            case "radio":
                return options.map( ( option, idx ) => (
                    <div className="radio-input-label-wrap" key={ idx }>
                        <input
                            type="radio"
                            id={ `radio-${ idx }` }
                            value={ option.value }
                        />
                        <label htmlFor={ `radio-${ idx }` }>
                            { option.label }
                        </label>
                    </div>
                ) );
            case "checkboxes":
                return options.map( ( option, idx ) => (
                    <div className="radio-input-label-wrap" key={ idx }>
                        <input
                            type="checkbox"
                            id={ `checkbox-${ idx }` }
                            value={ option.value }
                        />
                        <label htmlFor={ `checkbox-${ idx }` }>
                            { option.label }
                        </label>
                    </div>
                ) );
            case "dropdown":
            case "multiselect":
                return (
                    <section className="select-input-section merge-components">
                        <select>
                            <option>Select...</option>
                            { options.map( ( option, idx ) => (
                                <option key={ idx } value={ option.value }>
                                    { option.label }
                                </option>
                            ) ) }
                        </select>
                    </section>
                );
            default:
                return <p>Unsupported input type</p>;
        }
    };

    const handleOptionFieldChange = (
        index: number,
        key: keyof Option,
        value: string | boolean
    ) => {
        const newOptions = [ ...options ];
        newOptions[ index ] = { ...newOptions[ index ], [ key ]: value };
        setOptions( newOptions );
        onChange( "options", newOptions );
    };

    const handleInsertOption = () => {
        const newOptions = [
            ...options,
            { id: crypto.randomUUID(), label: "Option value", value: "value" }, // Generate a unique ID
        ];
        setOptions( newOptions );
        onChange( "options", newOptions );
    };

    const handleDeleteOption = ( index: number ) => {
        if ( options.length <= 1 ) return;
        const newOptions = options.filter( ( _, i ) => i !== index );
        setOptions( newOptions );
        onChange( "options", newOptions );
    };

    return (
        <HoverInputRender
            label={ formField.label }
            onLabelChange={ ( newLabel ) => onChange( "label", newLabel ) }
            renderStaticContent={ ( { label } ) => (
                <div className="edit-form-wrapper">
                    <p>{ label }</p>
                    <div className="settings-form-group-radio">
                        { renderInputFields( type ) }
                    </div>
                </div>
            ) }
            renderEditableContent={ ( { label, onLabelChange } ) => (
                <>
                    <input
                        className="input-label multipleOption-label"
                        type="text"
                        value={ label }
                        onChange={ ( event ) =>
                            onLabelChange( event.target.value )
                        }
                    />

                    <ReactSortable
                        className="multiOption-wrapper"
                        list={ options }
                        setList={ ( newList: Option[] ) => {
                            if ( firstTimeRender.current ) {
                                firstTimeRender.current = false;
                                return;
                            }
                            setOptions( newList );
                            onChange( "options", newList );
                        } }
                        handle=".drag-handle-option"
                    >
                        { options.map( ( option, index ) => (
                            <div
                                className="option-list-wrapper drag-handle-option"
                                key={ index }
                            >
                                <div className="option-label">
                                    <input
                                        type="text"
                                        value={ option.label }
                                        onChange={ ( event ) => {
                                            settingHasChanged.current = true;
                                            handleOptionFieldChange(
                                                index,
                                                "label",
                                                event.target.value
                                            );
                                        } }
                                        readOnly
                                        onClick={ ( event ) => {
                                            setOpenOption( index );
                                            event.stopPropagation();
                                        } }
                                    />
                                </div>
                                <div className="option-control-section">
                                    <div
                                        onClick={ () => {
                                            settingHasChanged.current = true;
                                            handleDeleteOption( index );
                                        } }
                                    >
                                        Delete
                                    </div>
                                    <OptionMetaBox
                                        hasOpen={ openOption === index }
                                        option={ option }
                                        onChange={ ( key, value ) => {
                                            settingHasChanged.current = true;
                                            handleOptionFieldChange(
                                                index,
                                                key as keyof Option,
                                                value
                                            );
                                        } }
                                        setDefaultValue={ () => {
                                            let defaultValueIndex:
                                                | number
                                                | null = null;
                                            options.forEach(
                                                ( option, idx ) => {
                                                    if ( option.isdefault )
                                                        defaultValueIndex = idx;
                                                }
                                            );
                                            if ( defaultValueIndex !== null ) {
                                                settingHasChanged.current =
                                                    true;
                                                handleOptionFieldChange(
                                                    defaultValueIndex,
                                                    "isdefault",
                                                    false
                                                );
                                            }
                                            handleOptionFieldChange(
                                                index,
                                                "isdefault",
                                                true
                                            );
                                        } }
                                    />
                                </div>
                            </div>
                        ) ) }

                        <div
                            className="add-more-option-section"
                            onClick={ handleInsertOption }
                        >
                            Add new options{ " " }
                            <span>
                                <i className="admin-font adminLib-plus-circle-o"></i>
                            </span>
                        </div>
                    </ReactSortable>
                </>
            ) }
        />
    );
};

export default MultipleOptions;
