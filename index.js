'use strict';

const exec = require('child_process').exec;

exports.handler = (event, context, callback) => {
    var output = "";
    const child = exec(process.env.LAMBDA_TASK_ROOT + "/game", (error) => {
        if (error !== null) {
            callback(error);
            return;
        }
        callback(null, {
            statusCode: '200',
            headers: {
                'Content-Type': 'application/json'
            },
            body: output
        });
    });

    // Log process stdout and stderr
    child.stdout.on('data', (data) => output += data);
    child.stderr.on('data', console.error);
    child.stdin.write(event.body);
    child.stdin.end();
};