#!/user/bin/env node

import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";

const args = minimist(process.argv.slice(2));
const timezone = moment.tz.guess();

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



console.log(timezone);