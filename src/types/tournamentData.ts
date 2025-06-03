export interface Player {
	id: number;
	team_id: number;
	nickname: string;
	first_name: string | null;
	second_name: string | null;
	photo: string | null;
	country: string | null;
	deleted_at: string | null;
}

export interface Team {
	id: number;
	title: string;
	logo_url: string | null;
	country: string | null;
	deleted_at: string | null;
	players: Player[];
}

export interface Match {
	id: number;
	level: number;
	pickem_group_id: number;
	parent_id: number | null;
	first_team: Team | null;
	second_team: Team | null;
	winner_team: Team | null;
	first_score: number | null;
	second_score: number | null;
	children: Match[];
}

export interface Group {
	id: number;
	pickem_id: number;
	tournament_group_start_date: string;
	tournament_group_end_date: string;
	title: string;
	matches: Match[];
}

export interface Status {
	id: number;
	slug: string;
	title: string;
	deleted_at: string | null;
}

export interface Tournament {
	id: number;
	status: Status;
	title: string;
	logo_url: string;
	tournament_start_date: string;
	tournament_end_date: string;
	deleted_at: string | null;
	groups: Group[];
}

export type PickemResponse = Tournament[];
