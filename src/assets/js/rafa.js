

jQuery(document).ready(function($) {
    $('.counter').counterUp({
        delay: 100,
        time: 1200
    });
    $('.circliful-chart').circliful();
});

/* BEGIN SVG WEATHER ICON */
if (typeof Skycons !== 'undefined'){
var icons = new Skycons(
    {"color": "#00b19d"},
    {"resizeClear": true}
    ),
        list  = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
        ],
        i;

    for(i = list.length; i--; )
    icons.set(list[i], list[i]);
    icons.play();
};