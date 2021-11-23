/* eslint-disable no-unused-vars */
declare module 'last-commit-log' {
	export default class LCL {
		public constructor(path: string);
		public getLastCommit(): Promise<Info>;
	}

	interface Info {
		gitTag: string;
		gitBranch: string;
		gitRemote: string;
		gitUrl: string;
		shortHash: string;
		hash: string;
		subject: string;
		sanitizedSubject: string;
		body: string;
		committer: {
			date: string;
			relativeDate: string;
			name: string;
			email: string;
		};
		author: {
			date: string;
			relativeDate: string;
			name: string;
			email: string;
		};
	}
}
