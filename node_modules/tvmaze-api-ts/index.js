"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const cheerio = require("cheerio");
const apiEndpoint = 'https://api.tvmaze.com';
class Common {
    static apiQuery(url) {
        return new Promise((resolve, reject) => {
            request.get(`${apiEndpoint}${url}`, { json: true }, (err, response) => {
                if (err)
                    return reject(err);
                resolve(response.body);
            });
        });
    }
    static getHtml(url) {
        return new Promise((resolve, reject) => {
            request.get(url, (err, response) => {
                if (err)
                    return reject(err);
                resolve(response.body);
            });
        });
    }
}
class Search {
    shows(query) {
        return Common.apiQuery(`/search/shows?q=${query}`);
    }
    people(query) {
        return Common.apiQuery(`/search/people?q=${query}`);
    }
}
class SingleSearch {
    shows(query) {
        return Common.apiQuery(`/singlesearch/shows?q=${query}`);
    }
}
class Lookup {
    imdb(imdbId) {
        return Common.apiQuery(`/lookup/shows?imdb=${imdbId}`);
    }
    thetvdb(thetvdbId) {
        return Common.apiQuery(`/lookup/shows?thetvdb=${thetvdbId}`);
    }
    tvrage(tvrageId) {
        return Common.apiQuery(`/lookup/shows?tvrage=${tvrageId}`);
    }
    tvmaze(tvmazeId) {
        return Common.apiQuery(`/shows/${tvmazeId}`);
    }
}
class Shows {
    get(id, embeded) {
        let queryString = `/shows/${id}`;
        if (embeded) {
            if (typeof embeded === typeof []) {
                queryString += '?';
                embeded = embeded;
                embeded.forEach(embed => {
                    queryString += `embed[]=${embed}&`;
                });
            }
            else {
                queryString += `?embed=${embeded}`;
            }
        }
        return Common.apiQuery(queryString);
    }
    episodes(id, specials) {
        let queryString = `shows/${id}/episodes`;
        if (specials)
            queryString += '?specials=1';
        return Common.apiQuery(queryString);
    }
    episodebynumber(id, season, episode) {
        return Common.apiQuery(`/shows/${id}/episodebynumber?season=${season}&number=${episode}`);
    }
    episodesbydate(id, date) {
        return Common.apiQuery(`/shows/${id}/episodesbydate?date=${date}`);
    }
    seasons(id) {
        return Common.apiQuery(`/shows/${id}/seasons`);
    }
    seasonEpisodes(seasonId) {
        return Common.apiQuery(`/seasons/${seasonId}/episodes`);
    }
    cast(id) {
        return Common.apiQuery(`/shows/${id}/cast`);
    }
    crew(id) {
        return Common.apiQuery(`/shows/${id}/crew`);
    }
    akas(id) {
        return Common.apiQuery(`/shows/${id}/akas`);
    }
    page(page) {
        return Common.apiQuery(`/shows?page=${page || ''}`);
    }
    updates() {
        return Common.apiQuery(`/updates/shows`);
    }
}
class People {
    get(id, embeded) {
        let queryString = `/people/${id}`;
        if (embeded) {
            if (typeof embeded === typeof []) {
                queryString += '?';
                embeded = embeded;
                embeded.forEach(embed => {
                    queryString += `embed[]=${embed}&`;
                });
            }
            else {
                queryString += `?embed=${embeded}`;
            }
        }
        return Common.apiQuery(queryString);
    }
    castCredits(id, embeded) {
        let queryString = `/people/${id}/castcredits`;
        if (embeded) {
            if (typeof embeded === typeof []) {
                queryString += '?';
                embeded = embeded;
                embeded.forEach(embed => {
                    queryString += `embed[]=${embed}&`;
                });
            }
            else {
                queryString += `?embed=${embeded}`;
            }
        }
        return Common.apiQuery(queryString);
    }
    crewCredits(id, embeded) {
        let queryString = `/people/${id}/crewcredits`;
        if (embeded) {
            if (typeof embeded === typeof []) {
                queryString += '?';
                embeded = embeded;
                embeded.forEach(embed => {
                    queryString += `embed[]=${embed}&`;
                });
            }
            else {
                queryString += `?embed=${embeded}`;
            }
        }
        return Common.apiQuery(queryString);
    }
}
class Scrape {
    episodeTrailer(episodeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield Common.getHtml(episodeUrl);
            const $ = cheerio.load(html);
            return $('article#episode-video iframe')[0].attribs.src;
        });
    }
}
class Tvmaze {
    constructor() {
        this.search = new Search();
        this.singleSearch = new SingleSearch();
        this.lookup = new Lookup();
        this.shows = new Shows();
        this.people = new People();
        this.scrape = new Scrape();
    }
    schedule(country, date) {
        let queryString = '/schedule?';
        if (country)
            queryString += `country=${country}&`;
        if (country)
            queryString += `date=${date}`;
        return Common.apiQuery(queryString);
    }
    fullSchedule() {
        return Common.apiQuery('/schedule/full');
    }
}
exports.Tvmaze = Tvmaze;
exports.tvmaze = new Tvmaze();
