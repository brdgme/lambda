'use strict';

const exec = require('child_process').exec;

exports.handler = (event, context, callback) => {
    var output = "";
    const child = exec(process.env.LAMBDA_TASK_ROOT + "/game", (error) => {
        if (error !== null) {
            callback(error, null);
            return;
        }
        try {
            let json = JSON.parse(output);
            callback(null, json);
        } catch (e) {
            callback(e.message, null);
        }
    });

    // Log process stdout and stderr
    child.stdout.on('data', (data) => output += data);
    child.stderr.on('data', console.error);
    child.stdin.write(JSON.stringify(event));
    child.stdin.end();
};

