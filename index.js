var fs = require('fs');

var env = {
    lines: null,
    i: 1,
    time_current: null,
    time_next: null
};

var filepath = '/Users/huangling/wanghao/tmp/inside-out.srt';
fs.readFile(filepath, function(err, data) {
    //console.log(data + '');
    if(err) {
        return console.log('err:', err);
    }

    data = data.toString();

    env.lines = data.split('\n');

    //console.log(lines);

    var pause = true;
    var n = 0;

    /*for(var i=1; i<lines.length; i++) {
        console.log(lines[i]);
    }

    var time = lines[1].split(' --> ');
    var start = get_millisecond(time[0]);
    var end = get_millisecond(time[1]);

    console.log('start:', start);
    console.log('end:', end);
     console.log('duration:', end - start);*/

    env.time_current = env.lines[env.i].split(' --> ');

    show();
});

function show() {
    var start = get_millisecond(env.time_current[0]);
    //var end = get_millisecond(time_current[1]);

    console.log('start:', start);

    env.i += 1;
    console.log('content:', env.lines[env.i]);
    env.i += 1;
    console.log('content:', env.lines[env.i]);

    env.i += 3;
    env.time_next = env.lines[env.i].split(' --> ');
    console.log('next:', env.time_next);

    var end = get_millisecond(env.time_next[0]);
    console.log('end:', end);
    console.log('duration:', end - start);

    var duration = end - start;

    env.time_current = env.time_next;

    setTimeout(show, duration);
}

function get_millisecond(input) {
    var time_array = input.split(':');

    var hour = time_array[0];
    var minitue = time_array[1];
    var second_array = time_array[2].split(',');
    var second = second_array[0];
    var millisecond = second_array[1];

    console.log('hour:', hour, 'minitue:', minitue, 'second:', second, 'millisecond:', millisecond);

    return (hour * 60 * 60 + minitue * 60 + (second - 0)) * 1000 + (millisecond - 0);
}
