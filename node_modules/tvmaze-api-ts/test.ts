import { tvmaze, Tvmaze } from './index'

class Mymaze extends Tvmaze {

}

tvmaze.scrape.episodeTrailer('https://www.tvmaze.com/episodes/1445227/silicon-valley-5x08-fifty-one-percent').then(console.log)

tvmaze.search.shows('girls').then(result => {
  if (result[0].show) {
    console.log('👍 API::search::shows')
  } else {
    console.log('👎 API::search::shows')
    debugger
  }
})

tvmaze.search.people('lauren').then(result => {
  if (result[0].person) {
    console.log('👍 API::search::people')
  } else {
    console.log('👎 API::search::people')
    debugger
  }
})

tvmaze.singleSearch.shows('girls').then(result => {
  if (result.id) {
    console.log('👍 API::singleSearch::shows')
  } else {
    console.log('👎 API::singleSearch::shows')
    debugger
  }
})

tvmaze.lookup.imdb('tt0944947').then(result => {
  if (result.id) {
    console.log('👍 API::lookup::shows')
  } else {
    console.log('👎 API::lookup::shows')
    debugger
  }
})

tvmaze.fullSchedule().then(result => {
  if (result[0].id) {
    console.log('👍 API::fullSchedule')
  } else {
    console.log('👎 API::fullSchedule')
    debugger
  }
})

tvmaze.schedule('US', '2014-12-01').then(result => {
  if (result[0].id) {
    console.log('👍 API::schedule')
  } else {
    console.log('👎 API::schedule')
    debugger
  }
})

tvmaze.people.get('1').then(result => {
  if (result.id) {
    console.log('👍 API::people')
  } else {
    console.log('👎 API::people')
    debugger
  }
})

tvmaze.shows.get('1').then(result => {
  if (result.id) {
    console.log('👍 API::shows')
  } else {
    console.log('👎 API::shows')
    debugger
  }
})
