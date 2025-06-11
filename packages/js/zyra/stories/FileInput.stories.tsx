import FileInput from '../src/components/FileInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta< typeof FileInput > = {
	title: 'Zyra/Components/FileInput',
	component: FileInput,
	tags: [ 'autodocs' ],
};

export default meta;

type Story = StoryObj< typeof FileInput >;

export const TestFileInput: Story = {
	args: {
		wrapperClass: 'setting-file-uploader-class',
		descClass: 'settings-metabox-description',
		description: 'This is a simple file input',
		inputClass: 'sample_file form-input',
		imageSrc: 'https://example.com/preview.jpg',
		imageWidth: 100,
		imageHeight: 100,
		buttonClass: 'btn btn-purple',
		openUploader: 'Upload Image',
		type: 'hidden',
		name: 'userFile',
		value: '',
		placeholder: 'Choose a file',
		proSetting: true,
		onChange: ( e ) => {
			console.log( 'File changed:', e.target.files );
		},
		onClick: ( e ) => {
			console.log( 'Input clicked', e );
		},
		onMouseOver: ( e ) => {
			console.log( 'Mouse over input', e );
		},
		onMouseOut: ( e ) => {
			console.log( 'Mouse out of input', e );
		},
		onFocus: ( e ) => {
			console.log( 'Input focused', e );
		},
		onButtonClick: ( e ) => {
			console.log( 'Upload button clicked', e );
		},
	},
	render: ( args ) => {
		return <FileInput key={ 'sample_file' } { ...args } />;
	},
};
