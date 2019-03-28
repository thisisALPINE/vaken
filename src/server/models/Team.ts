import { prop, arrayProp, Ref, Typegoose } from 'typegoose';
import { Hacker } from './Hacker';

class Team extends Typegoose {
	@prop()
	public name!: string;

	@arrayProp({ itemsRef: Hacker, required: true })
	public members: Ref<Hacker>[] = [];
}

const teamModel = new Team().getModelForClass(Team);

export { Team, teamModel };

// Copyright (c) 2019 Vanderbilt University
