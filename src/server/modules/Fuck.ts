/* eslint-disable */

import gql from 'graphql-tag';
import { Resolvers, FuckDbObject } from './generated';
import { Context /* Just the type */ } from '@vaken/sdk';
import React from 'react';

class myPlugin {
	get resolvers(): Resolvers<Context> {
		return {
			mutationtype: {
				id: fuck => fuck.id,
				numberOfFucks: fuck => fuck.numberOfFucks,
			},
			Query: {
				howmayfucksdidhegive: (root, { id }, { db }) =>
					// Check to make sure db.collection() doesn't make any network requests!!!
					db.collection<FuckDbObject>('fuck').findOne({ id }),
			},
			Mutation: {
				givefucks: () => {
					throw new Error('Had no more fucks to give!');
				},
			},
		};
	}

	get frontend() {
		// You should return the string form of a compiled file for proper fucking types
		return function() {
			return React.createElement('div', {}, 'Hello, Gabriel!');
		}.toString();
	}

	get schema() {
		return gql`
			enum Fucks {
				ZERO
				NONE
				ALL_GIVEN
			}

			type mutationtype {
				id: String!
				numberOfFucks: Fucks!
			}

			input FUCK {
				id: ID!
			}

			extend type Mutation {
				givefucks(input: FUCK!): mutationtype!
			}

			extend type Query {
				howmayfucksdidhegive(id: FUCK!): mutationtype!
			}

			query howmayfucksdidhegive($id: FUCK!) {
				howmayfucksdidhegive(id: $id) {
					id
					numberOfFucks
				}
			}

			mutation myMutation($input: FUCK!) {
				givefucks(input: $input) {
					id
					numberOfFucks
				}
			}
		`;
	}
}

export default myPlugin;
