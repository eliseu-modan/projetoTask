/**
 *
 * FormItem Component
 *
 */

import { Form } from "antd";
import { useRef, useState, cloneElement, useEffect } from "react";

import "./index.css";

function FormItem({ children, noMargin, isFocused, ...props }) {
	const [focused, setFocused] = useState(isFocused);
	const [hasMargin, setHasMargin] = useState(false);
	const chindrenRef = useRef();
	const name = props.name;

	const childrenCloned = cloneElement(children, {
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false),
		ref: chindrenRef,
	});

	useEffect(() => {
		setHasMargin(
			!!chindrenRef.current?.pickerRef || !!chindrenRef.current?.selectRef
		);
	}, []);

	function shoudUpdate(prevValue, curValues) {
		return prevValue[name] !== curValues[name];
	}

	return (
		<Form.Item noStyle shouldUpdate={shoudUpdate}>
			{({ getFieldValue, getFieldsValue }) => {
				const hasValue = typeof getFieldValue(name) !== "undefined";

				return (
					<Form.Item
						{...props}
						children={childrenCloned}
						className={`${props.className} common-form-item ${
							hasValue || isFocused ? "active" : ""
						} ${hasMargin ? "has-picker" : ""} ${
							noMargin ? "no-margin" : ""
						}`}
					/>
				);
			}}
		</Form.Item>
	);
}

FormItem.defaultProps = {
	isFocused: false,
};

export default FormItem;
