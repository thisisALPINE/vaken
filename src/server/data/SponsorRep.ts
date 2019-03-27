import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

import User from './User';
import { Sponsor } from './Sponsor';

@ObjectType({ description: 'DTO for a Vaken sponsor rep' })
class SponsorRep extends User {
	@Field(type => [Sponsor])
	public sponsors!: [Sponsor];

	@Field()
	public title!: string;

	@Field()
	public leadRep!: boolean;
}

export default SponsorRep;

// Copyright (c) 2019 Vanderbilt University
