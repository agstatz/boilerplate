const selectors = {
    // Selectors for the scraper
    'dining_court_links': {
        'earhart_link': '#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(1)',
        'ford_link': '#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(2)',
        'wiley_link': '#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(4)',
        'windsor_link': '#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(5)',
        'hillenbrand_link': '#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(3)',
    },

    'earhart': '#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(1)',
    'ford': '#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(2) > li > div.MuiListItemText-root.MuiListItemText-multiline > span',
    'hillenbrand': '#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(3) > li > div.MuiListItemText-root.MuiListItemText-multiline > span',
    'wiley': '#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(4) > li > div.MuiListItemText-root.MuiListItemText-multiline > span',
    'windsor': '#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(5) > li > div.MuiListItemText-root.MuiListItemText-multiline > span',

}

module.exports = selectors;