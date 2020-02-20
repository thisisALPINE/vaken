import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { ResumeLink } from './ResumeLink';
import { SignedReadUrlDocument, DetailedHackerDocument } from '../../generated/graphql';

const mockedURL = 'https://readurl.fake/';
const testId = 'testid';
const mocks = [
	{
		request: {
			query: SignedReadUrlDocument,
			variables: { input: testId },
		},
		result: {
			data: {
				signedReadUrl: mockedURL,
			},
		},
	},
	{
		request: {
			query: DetailedHackerDocument,
			variables: { id: testId },
		},
		result: {
			data: {
				hacker: {
					id: testId,
				},
			},
		},
	},
];

let container: HTMLDivElement | null = null;

describe('ToggleSwitch', () => {
	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		if (container) document.body.removeChild(container);
		container = null;
	});

	it('HeaderButton', () => {
		const component = renderer
			.create(
				<MockedProvider mocks={mocks}>
					<ResumeLink id={testId} />
				</MockedProvider>
			)
			.toJSON();
		expect(component).toMatchSnapshot();
	});

	it('Toggles on click', async () => {
		// Test first render and componentDidMount
		await act(async () => {
			ReactDOM.render(
				<MockedProvider mocks={mocks}>
					<ResumeLink id={testId} />
				</MockedProvider>,
				container
			);

			if (!container) throw new Error('Container not properly set up in beforeEach');

			let tableRow = container.querySelector('tr');
			await waitForExpect(() => {
				expect((tableRow = container?.querySelector('tr') ?? null)).toBeTruthy();
			});

			if (!tableRow) throw new Error('tableRow is null');
			tableRow.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

			let link = container.querySelector('a');
			await waitForExpect(() => {
				expect((link = container?.querySelector('a') ?? null)).toBeTruthy();
			});

			expect(link?.href).toEqual(mockedURL);
		});
	});
});
