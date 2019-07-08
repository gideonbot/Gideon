# Installation
download the module
```
npm i tvmaze-api-ts
```
use it in your projekt

```js
// node way
const { tvmaze } = require('tvmaze-api-ts')

// es6 way
import { tvmaze } from 'tvmaze-api-ts'
```

want to extend the api with your own functions?
no problem, just import the "Tvmaze" class.

```js
// node way
const { tvmaze, Tvmaze } = require('tvmaze-api-ts')

// es6 way
import { tvmaze, Tvmaze } from 'tvmaze-api-ts'

class Mymaze extends Tvmaze {
  // code
}

const mymaze = new Mymaze()
```

## made with ♥️ and typescript.
I added complete typing support for all api json returns.

![](https://i.imgur.com/jT0M8hc.png)

# Srape

## Episode Trailer
Scrape the episode youtube trailer link from the episode page.

**example:**
```js
// (episodeUrl: string): Promise
tvmaze.scrape.episodeTrailer('https://www.tvmaze.com/episodes/1445227/silicon-valley-5x08-fifty-one-percent')
  .then(youtube => {
    // code
  })
```

# Search

## Show search
Search through all the shows in our database by the show's name. A fuzzy algorithm is used (with a fuzziness value of 2), meaning that shows will be found even if your query contains small typos. Results are returned in order of relevancy (best matches on top) and contain each show's full information.

The most common usecase for this endpoint is when you're building a local mapping of show names to TVmaze ID's and want to make sure that you're mapping to exactly the right show, and not to a different show that happens to have the same name. By presenting each show's basic information in a UI, you can have the end-user pick a specific entry from that list, and have your application store the chosen show's ID or URL. Any subsequent requests for information on that show can then be directly made to that show's URL.

**example:**
```js
// (query: string): Promise
tvmaze.search.shows('girls').then(result => {
  // code
})
```

## People search
Search through all the people in our database, using the same mechanism as described for show searches.

**example:**
```js
// (query: string): Promise
tvmaze.search.people('lauren').then(result => {
  // code
})
```

# Lookup
If you already know a show's tvrage, thetvdb or IMDB ID, you can use this endpoint to find this exact show on TVmaze. If the given ID can be matched, a HTTP 302 redirect to the show's URL will be returned. Otherwise, a HTTP 404 is sent.

**example:**
```js
// (imdbId: string): Promise
tvmaze.lookup.imdb('tt0944947').then(result => {
  // code
})

// (thetvdbId: string): Promise
tvmaze.lookup.thetvdb('81189').then(result => {
  // code
})

// (tvrageId: string): Promise
tvmaze.lookup.tvrage('24493').then(result => {
  // code
})
```

# Shows

## Show main information
Retrieve all primary information for a given show. This endpoint allows embedding of additional information. See the section [embedding](#embedding) for more information.

**example:**
```js
// (id: string, embeded?: string | string[]): Promise
tvmaze.shows.get('1').then(result => {
  // code
})

// (id: string, embeded?: string | string[]): Promise
tvmaze.shows.get('1', 'crew').then(result => {
  // code
})

// (id: string, embeded?: string | string[]): Promise
tvmaze.shows.get('1', ['crew', 'cast']).then(result => {
  // code
})
```

## Show episode list
A complete list of episodes for the given show. Episodes are returned in their airing order, and include full episode information. By default, specials are not included in the list.

- (optional) *specials*: do include specials in the list

**example:**
```js
// (id: string, specials?: boolean): Promise
tvmaze.shows.episodes('1').then(result => {
  // code
})

// (id: string, specials?: boolean): Promise
tvmaze.shows.episodes('1', true).then(result => {
  // code
})
```

## Episode by number
Retrieve one specific episode from this show given its season number and episode number. This either returns the full information for one episode, or a HTTP 404.

- *season*: a season number
- *number*: an episode number

**example:**
```js
// (id: string, season: string, episode: string): Promise
tvmaze.shows.episodebynumber('1', '1', '1').then(result => {
  // code
})
```

## Episodes by date
Retrieve all episodes from this show that have aired on a specific date. This either returns an array of full episode info, or a HTTP 404. Useful for daily (talk) shows that don't adhere to a common season numbering.

- *date*: an ISO 8601 formatted date

**example:**
```js
// (id: string, date: string): Promise
tvmaze.shows.episodesbydate('1', '2013-07-01').then(result => {
  // code
})
```

## Show seasons
A complete list of seasons for the given show. Seasons are returned in ascending order and contain the full information that's known about them.

**example:**
```js
// (id: string): Promise
tvmaze.shows.seasons('1').then(result => {
  // code
})
```

## Season episodes
A list of episodes in this season. Specials are always included in this list; they can be recognized by a NULL value for number.

**example:**
```js
// (id: string): Promise
tvmaze.shows.seasonEpisodes('1').then(result => {
  // code
})
```

## Show cast
A list of main cast for a show. Each cast item is a combination of a person and a character. Items are ordered by importance, which is determined by the total number of appearances of the given character in this show.

**example:**
```js
// (id: string): Promise
tvmaze.shows.cast('1').then(result => {
  // code
})
```

## Show crew
A list of main crew for a show. Each crew item is a combination of a person and their crew type.

**example:**
```js
// (id: string): Promise
tvmaze.shows.crew('1').then(result => {
  // code
})
```

## Show AKA's
A list of AKA's (aliases) for a show. An AKA with its country set to null indicates an AKA in the show's original country. Otherwise, it's the AKA for that show in the given foreign country.

**example:**
```js
// (id: string): Promise
tvmaze.shows.akas('1').then(result => {
  // code
})
```

## Show index
A list of all shows in our database, with all primary information included. You can use this endpoint for example if you want to build a local cache of all shows contained in the TVmaze database. This endpoint is paginated, with a maximum of 250 results per page. The pagination is based on show ID, e.g. page 0 will contain shows with IDs between 0 and 250. This means a single page might contain less than 250 results, in case of deletions, but it also guarantees that deletions won't cause shuffling in the page numbering for other shows.

Because of this, you can implement a daily/weekly sync simply by starting at the page number where you last left off, and be sure you won't skip over any entries. For example, if the last show in your local cache has an ID of 1800, you would start the re-sync at page number floor(1800/250) = 7. After this, simply increment the page number by 1 until you receive a HTTP 404 response code, which indicates that you've reached the end of the list.

As opposed to the other endpoints, results from the show index are cached for up to 24 hours.

**example:**
```js
// (page?: string): Promise
tvmaze.shows.page('1').then(result => {
  // code
})
```

## Show updates
A list of all shows in the TVmaze database and the timestamp when they were last updated. Updating a direct or indirect child of a show will also mark the show itself as updated. For example; creating, deleting or updating an episode or an episode's gallery item will mark the episode's show as updated.

**example:**
```js
// (): Promise
tvmaze.shows.updates().then(result => {
  // code
})
```

# People

## Person main information
Retrieve all primary information for a given person. This endpoint allows embedding of additional information. See the section [embedding](#embedding) for more information.

**example:**
```js
// (id: string, embeded?: string | string[]): Promise: Promise
tvmaze.people.get('1').then(result => {
  // code
})

// (id: string, embeded?: string | string[]): Promise: Promise
tvmaze.people.get('1', 'castcredits').then(result => {
  // code
})
```

## Person cast credits
Retrieve all (show-level) cast credits for a person. A cast credit is a combination of both a show and a character. By default, only a reference to each show and character will be returned. However, this endpoint supports embedding, which means full information for the shows and characters can be included.

**example:**
```js
// (id: string, embeded?: string | string[]): Promise: Promise
tvmaze.people.castCredits('1').then(result => {
  // code
})

// (id: string, embeded?: string | string[]): Promise: Promise
tvmaze.people.castCredits('1', 'show').then(result => {
  // code
})
```

## Person crew credits
Retrieve all (show-level) crew credits for a person. A crew credit is combination of both a show and a crew type. By default, only a reference to each show will be returned. However, this endpoint supports embedding, which means full information for the shows can be included.

**example:**
```js
// (id: string, embeded?: string | string[]): Promise: Promise
tvmaze.people.crewCredits('1').then(result => {
  // code
})

// (id: string, embeded?: string | string[]): Promise: Promise
tvmaze.people.crewCredits('1', 'show').then(result => {
  // code
})
```

# Schedule
The schedule is a complete list of episodes that air in a given country on a given date. Episodes are returned in the order in which they are aired, and full information about the episode and the corresponding show is included.

Note that contrary to what you might expect, the ISO country code for the United Kingdom is not UK, but GB.

- (optional) countrycode: an ISO 3166-1 code of the country; defaults to US
- (optional) date: an ISO 8601 formatted date; defaults to the current day

**example:**
```js
// (country?: string, date?: string): Promise
tvmaze.schedule().then(result => {
  // code
})

// (country?: string, date?: string): Promise
tvmaze.schedule('US', '2014-12-01').then(result => {
  // code
})
```

## Full schedule
The full schedule is a list of all future episodes known to TVmaze, regardless of their country. Be advised that this endpoint's response is at least several MB large. As opposed to the other endpoints, results are cached for 24 hours.

**example:**
```js
// (): Promise
tvmaze.fullSchedule().then(result => {
  // code
})
```

# Embedding
As defined by the [HAL](http://stateless.co/hal_specification.html) convention, our API resources can contain links to related URLs. These URLs can refer to either a collection (like a list of episodes), or to an individual resource (like an episode). References to an individual resource are always advertised in the model's _links, for example as a show's _links.previousepisode or a cast credit's _links.character. References to collections are not actively advertised in the _links output, but are documented here. Both types of links can be embedded in the response by using the embed query parameter.

For example, `tvmaze.shows.get('1', 'episodes')` will serve the show's main information and its episode list in one single response. `tvmaze.shows.get('1', 'nextepisode')` would embed the details of that show's upcoming episode in the response, but only if one such episode currently exists. Embedding multiple links is possible with the array syntax: `tvmaze.shows.get('1', ['episodes', 'cast'])`

# Images
Most resources available in the API have an image property that refers to that item's primary image. For shows, people and characters this is an image in poster format; for episodes the image is in landscape format. If an image exists, the image property will be a dictionary containing a "medium" and "original" key, referring to the image in fixed resized dimensions or in the original uploaded resolution. If no image exists yet, the image property will be NULL.

You are free to directly link ("hotlink") to our image CDN. However, for performance reasons we recommend to cache the images on your end: on your own server in case of a web application, or on the client in case of a desktop/mobile app. Images can safely be cached indefinitely: on our end the content of a specific image URL will never change; if an item's primary image changes, the item's image URL will change instead.

# HTTPS
All endpoints are accessible using encrypted HTTPS as well, for example: https://api.tvmaze.com/shows/1. Links embedded in the API response - to other API endpoints or to our image CDN - will be returned as HTTP regardless, but can all be accessed using HTTPS if you manually change the URL's scheme to HTTPS.

# Caching
All output is cached by our HTTP load balancers for 60 minutes, so when information is updated on the site, please allow up to 1 hour for the changes to propagate to the API.

# Rate limiting
API calls are rate limited to allow at least 20 calls every 10 seconds per IP address. If you exceed this rate, you might receive an HTTP 429 error. We say at least, because rate limiting takes place on the backend but not on the edge cache. So if your client is only requesting common/popular endpoints like shows or episodes (as opposed to more unique endpoints like searches or embedding), you're likely to never hit the limit. For an optimal throughput, simply let your client back off for a few seconds when it receives a 429.

Under special circumstances we may temporarily have to impose a stricter rate limit. So even if your client wouldn't normally exceed our rate limit, it's useful to gracefully handle HTTP 429 responses: simply retry the request after a small pause instead of treating it as a permanent failure.

While not required, we strongly recommend setting your client's HTTP User Agent to something that'll uniquely describe it. This allows us to identify your application in case of problems, or to proactively reach out to you.

# CORS
All endpoints are [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (Cross-origin resource sharing) enabled, which means our API can be used directly in web applications without having to resort to JSONP or HTTP proxying.

# Licensing
Use of the TVmaze API is licensed by [CC BY-SA](http://creativecommons.org/licenses/by-sa/4.0/). This means the data can freely be used for any purpose, as long as TVmaze is properly credited as source and your application complies with the ShareAlike provision. You can satisfy the attribution requirement by linking back to TVmaze from within your application or website, for example using the URLs available in the API.