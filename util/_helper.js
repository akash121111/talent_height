// const express = require('express');
function  addTime(watched, newTime){
    watched.seconds+=newTime.seconds;
    if(watched.seconds>59){
        watched.minutes+=1;
        watched.seconds-=60;
    }
    watched.minutes+=newTime.minutes;
    if(watched.minutes>59){
        watched.hours+=1;
        watched.minutes-=60;
    }
    return watched;
}


module.exports.add = addTime;