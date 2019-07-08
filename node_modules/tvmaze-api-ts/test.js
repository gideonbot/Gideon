"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class Mymaze extends index_1.Tvmaze {
}
index_1.tvmaze.scrape.episodeTrailer('https://www.tvmaze.com/episodes/1445227/silicon-valley-5x08-fifty-one-percent').then(console.log);
index_1.tvmaze.search.shows('girls').then(result => {
    if (result[0].show) {
        console.log('👍 API::search::shows');
    }
    else {
        console.log('👎 API::search::shows');
        debugger;
    }
});
index_1.tvmaze.search.people('lauren').then(result => {
    if (result[0].person) {
        console.log('👍 API::search::people');
    }
    else {
        console.log('👎 API::search::people');
        debugger;
    }
});
index_1.tvmaze.singleSearch.shows('girls').then(result => {
    if (result.id) {
        console.log('👍 API::singleSearch::shows');
    }
    else {
        console.log('👎 API::singleSearch::shows');
        debugger;
    }
});
index_1.tvmaze.lookup.imdb('tt0944947').then(result => {
    if (result.id) {
        console.log('👍 API::lookup::shows');
    }
    else {
        console.log('👎 API::lookup::shows');
        debugger;
    }
});
index_1.tvmaze.fullSchedule().then(result => {
    if (result[0].id) {
        console.log('👍 API::fullSchedule');
    }
    else {
        console.log('👎 API::fullSchedule');
        debugger;
    }
});
index_1.tvmaze.schedule('US', '2014-12-01').then(result => {
    if (result[0].id) {
        console.log('👍 API::schedule');
    }
    else {
        console.log('👎 API::schedule');
        debugger;
    }
});
index_1.tvmaze.people.get('1').then(result => {
    if (result.id) {
        console.log('👍 API::people');
    }
    else {
        console.log('👎 API::people');
        debugger;
    }
});
index_1.tvmaze.shows.get('1').then(result => {
    if (result.id) {
        console.log('👍 API::shows');
    }
    else {
        console.log('👎 API::shows');
        debugger;
    }
});
