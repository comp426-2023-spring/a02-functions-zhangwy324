#!/usr/bin/env node

import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";

const args = minimist(process.argv.slice(2));
let timezone;
if (args.t) {
    timezone = args.t;
} else {
    timezone = moment.tz.guess();
}


if (args.h == true) {
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`);
    process.exit(0);
}

let url = 'https://api.open-meteo.com/v1/forecast?';

let latitude
let longitude

if (args.n) {
    latitude = args.n;
} else if (args.s) {
    latitude = -args.s;
} else {
    console.log("Latitude must be in range");
    process.exit(1);
}

if (args.e) {
    longitude = args.e;
} else if (args.w) {
    longitude = -args.w;
} else {
    console.log("Longitude must be in range");
    process.exit(1);
}

url = url + 'latitude=' + `${latitude}` + '&longitude=' + `${longitude}` + '&daily=precipitation_hours&timezone=' + timezone

const response = await fetch(url);
const data = await response.json();

if (args.j) {
    console.log(data);
    process.exit(0);
}

const precipitation_hours_data = data.daily.precipitation_hours;

const days = args.d

let day_str;

if (days == 0) {
    day_str = "today.";
} else if (days > 1) {
    day_str = "in " + days + " days.";
} else {
    day_str = "tomorrow.";
}

if (!days) {
    if (precipitation_hours_data[1] > 0) {
        console.log('It will rain ' + day_str);
    } else {
        console.log('It will not rain ' + day_str);
    }
} else if (precipitation_hours_data[days] > 0) {
    console.log('It will rain ' + day_str);
} else {
    console.log('It will not rain ' + day_str);
}

