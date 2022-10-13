#!/usr/bin/env node

import moment from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';


var args = minimist(process.argv.slice(2),
{
    string:["e","w","n","s","z","t"],
    int:["d"],
    
}
);

if (args.h){
    console.log(
    `
    Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
        -h            Show this help message and exit.
        -n, -s        Latitude: N positive; S negative.
        -e, -w        Longitude: E positive; W negative.
        -z  -t          Time zone: uses tz.guess() from moment-timezone by default.
        -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
        -j            Echo pretty JSON from open-meteo API and exit.
    `
    )
    process.exit(0);
};
// console.log(moment.tz.guess());
var tz = args.z ||  moment.tz.guess();
if (args.n | args.s){
    var lati = args.n || ( "-"+args.s) ;
}
else{
    var lati = 35;
}

if (args.e | args.w){
    var longti = args.e || ( "-"+args.w) ;
}
else{
    var longti = 79;
}

var days = args.d || 1;

var url_w = "https://api.open-meteo.com/v1/forecast?latitude=" + lati + "&longitude=" + longti + "&hourly=temperature_2m&timezone=" + tz;
// console.log(url_w);
const response = await fetch(url_w);
const data = await response.json();


if (args.j){
    console.log(
        data
    );
    process.exit(0);
}


console.log(data);

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}