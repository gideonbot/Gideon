interface Ischedule {
    time: string;
    days: string[];
}
interface Iratring {
    average: number;
}
interface Icountry {
    name: string;
    code: string;
    timezone: string;
}
interface Inetwork {
    id: number;
    names: string;
    country: Icountry;
}
interface Iexternals {
    tvrage: number;
    thetvdb: number;
    imdb: string;
}
interface Iimage {
    medium: string;
    original: string;
}
interface Iself {
    href: string;
}
interface Ipreviousepisode extends Iself {
}
interface IshowLink extends Iself {
}
interface IcharacterLink extends Iself {
}
interface I_links {
    self?: Iself;
    previousepisode?: Ipreviousepisode;
    show?: IshowLink;
    character?: IcharacterLink;
}
interface I_embedded {
    show?: Ishow;
    seasons?: Iseason[];
    episodes?: Iepisode[];
    cast?: Icast[];
    castcredits?: Icastcredits[];
    crew?: Icrew[];
    crewcredits?: Icrewcredits[];
    akas?: Iaka[];
}
interface Iaka {
    name: string;
    country: Icountry;
}
interface Icrewcredits {
    type: string;
    _links: I_links;
}
interface Icastcredits {
    _links: I_links;
}
interface Iepisode {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    airdate: string;
    airtime: string;
    airstamp: string;
    runtime: number;
    image: Iimage;
    summary: string;
    _links: I_links;
}
interface Iseason {
    id: number;
    url: string;
    number: number;
    name: string;
    episodeOrder: number;
    premiereDate: string;
    endDate: string;
    network: Inetwork;
    webChannel: string | null;
    image: Iimage;
    summary: string;
    _links: I_links;
}
interface Iupdates {
    [key: number]: number;
}
interface Iperson {
    id: number;
    url: string;
    country: Icountry;
    birtday: string;
    deathday: string | null;
    image: Iimage;
    _links: I_links;
}
interface Icharacter {
    id: number;
    url: string;
    name: string;
    image: Iimage;
    _links: I_links;
}
interface Icast {
    person: Iperson;
    character: Icharacter;
    self: boolean;
    voice: boolean;
}
interface Icrew {
    type: string;
    person: Iperson;
}
interface Ishow {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    premiered: string;
    officialSite: string;
    schedule: Ischedule;
    ratring: Iratring;
    weight: number;
    netwoek: Inetwork;
    webChannel: string | null;
    externals: Iexternals;
    image: Iimage;
    summary: string;
    updated: number;
    _links: I_links;
    _embedded: I_embedded;
}
interface IshowSearch {
    score: number;
    show: Ishow;
}
declare class Search {
    shows(query: string): Promise<IshowSearch[]>;
    people(query: string): Promise<{}>;
}
declare class SingleSearch {
    shows(query: string): Promise<Ishow>;
}
declare class Lookup {
    imdb(imdbId: string): Promise<Ishow>;
    thetvdb(thetvdbId: string): Promise<Ishow>;
    tvrage(tvrageId: string): Promise<Ishow>;
    tvmaze(tvmazeId: string): Promise<Ishow>;
}
declare class Shows {
    get(id: string, embeded?: string | string[]): Promise<Ishow>;
    episodes(id: string, specials?: boolean): Promise<Iepisode[]>;
    episodebynumber(id: string, season: string, episode: string): Promise<Iepisode>;
    episodesbydate(id: string, date: string): Promise<Iepisode>;
    seasons(id: string): Promise<Iseason[]>;
    seasonEpisodes(seasonId: string): Promise<Iepisode[]>;
    cast(id: string): Promise<Icast[]>;
    crew(id: string): Promise<Icrew[]>;
    akas(id: string): Promise<Iaka[]>;
    page(page?: string): Promise<Ishow[]>;
    updates(): Promise<Iupdates>;
}
declare class People {
    get(id: string, embeded?: string | string[]): Promise<Iperson>;
    castCredits(id: string, embeded?: string | string[]): Promise<Icastcredits[]>;
    crewCredits(id: string, embeded?: string | string[]): Promise<Icrewcredits[]>;
}
declare class Scrape {
    episodeTrailer(episodeUrl: string): Promise<string>;
}
export declare class Tvmaze {
    search: Search;
    singleSearch: SingleSearch;
    lookup: Lookup;
    shows: Shows;
    people: People;
    scrape: Scrape;
    schedule(country?: string, date?: string): Promise<{}>;
    fullSchedule(): Promise<{}>;
}
export declare const tvmaze: Tvmaze;
export {};
