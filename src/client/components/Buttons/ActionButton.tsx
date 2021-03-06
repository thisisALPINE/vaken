import styled from 'styled-components';
import STRINGS from '../../assets/strings.json';

export const ActionButton = styled.button`
	background-color: ${STRINGS.ACCENT_COLOR};
	color: #ffffff;
	font-size: 1rem;
	padding: 0.75rem 1.5rem;
	border-radius: 4px;
	text-align: center;
	box-sizing: border-box;
	border: none;
	outline: none;
	&:focus {
		outline: none;
		border: none;
	}
	&:hover,
	&:active {
		box-shadow: 0rem 0rem 0.5rem 0rem #d0c9d6;
		outline: none;
		border: none;
	}
`;

export default ActionButton;
