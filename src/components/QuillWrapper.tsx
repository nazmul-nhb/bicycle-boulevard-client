import { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import '../styles/quill.css';

/** * CustomQuill component to wrap ReactQuill. */
const QuillWrapper = forwardRef<ReactQuill, ReactQuillProps>((props, ref) => {
	const quillRef = useRef<ReactQuill>(null);

	useImperativeHandle(ref, () => quillRef.current as ReactQuill, []);

	return (
		<div>
			<ReactQuill ref={quillRef} {...props} />
		</div>
	);
});

export default QuillWrapper;
