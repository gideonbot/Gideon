/* eslint-disable no-unused-vars */
declare module 'opensubtitles-api' {
    interface OSInterface {
        useragent: string;
        username: string;
        password: string;
        ssl: boolean;
    }

    interface SubResponse {
        [key: string]: {
            downloads: string;
            encoding: string;
            id: string;
            lang: string;
            langName: string;
            score: number;
            url: string;
            filename: string;
        }[]
    }

    interface OSSearch {
        sublanguageid: string;       
        season: number;
        episode: number;
        limit: string;                
        imdbid: string;           
    }

    export class OS {
        constructor(data: OSInterface);
        search(data: OSSearch): Promise<SubResponse>;
    }

    export default OS;
}