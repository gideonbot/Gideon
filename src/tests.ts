export const commands = [
    {
        name: 'eval',
        options: [
            {
                name: 'code',
                value: '1 + 1'
            }
        ]
    },
    { name: 'ping' },
    { name: 'uptime' },
    { name: 'nxeps' },
    { name: 'dceps' },
    { name: 'xovers' },
    { name: 'credits' },
    { name: 'meme' },
    { name: 'boom' },
    { name: 'timeline' },
    { name: 'wells' },
    { name: 'tracks' },
    { name: 'quote' },
    { name: 'donate' },
    { name: 'stats' },
    { name: 'add' },
    {
        name: 'wiki',
        options: [
            {
                name: 'wiki',
                value: 'wiki_av'
            },
            {
                name: 'term',
                value: 'arrow'
            }
        ]
    },
    {
        name: 'next',
        options: [
            {
                name: 'show',
                value: 'show_fl'
            },
            {
                name: 'season',
                value: 1
            },
            {
                name: 'episode',
                value: 1
            }
        ]
    },
    {
        name: 'episode',
        options: [
            {
                name: 'cwtv',
                options: [
                    {
                        name: 'show',
                        value: 'show_fl'
                    },
                    {
                        name: 'season',
                        value: 1
                    },
                    {
                        name: 'episode',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        name: 'cuddle',
        options: [
            {
                name: 'user',
                value: process.gideon.user?.id
            }
        ]
    },
    {
        name: 'attack',
        options: [
            {
                name: 'power',
                value: 'iceblast'
            },
            {
                name: 'user',
                value: '351871113346809860'
            }
        ]
    },
    {
        name: 'custommeme',
        options: [
            {
                name: 'first',
                value: 'top text'
            },
            {
                name: 'second',
                value: 'bottom text'
            }
        ]
    },
    { name: 'joke' },
    {
        name: 'joke',
        options: [
            {
                name: 'category',
                value: 'prog'
            }
        ]
    },
    { name: 'leaderboard' },
    {
        name: 'guess',
        options: [
            {
                name: 'show',
                value: 'flash'
            }
        ]
    },
    {
        name: 'opening',
        options: [
            {
                name: 'show',
                value: 'flash'
            }
        ]
    },
    {
        name: 'abilities',
        options: [
            {
                name: 'metahuman',
                value: 'speedster'
            }
        ]
    },
    {
        name: 'subs',
        options: [
            {
                name: 'cwtv',
                options: [
                    {
                        name: 'show',
                        value: 'show_fl'
                    },
                    {
                        name: 'lang',
                        value: 'eng'
                    },
                    {
                        name: 'season',
                        value: 1
                    },
                    {
                        name: 'episode',
                        value: 1
                    }
                ]
            }
        ]
    }
];