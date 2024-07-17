const { Worker } = require('worker_threads')

// Read all JSON file contents into an array
const contents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// Function to create a worker and process an item
function processItem(item) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js');

        worker.postMessage(item);

        var x = new Date();
        worker.on('message', (result) => {
            var y = new Date();
            let seconds = Math.abs(x.getTime() - y.getTime()) / 1000;
            console.log(`result:`, result, `in ${seconds} seconds`);
            resolve(result);
        });

        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

// Process all items concurrently
Promise.all(contents.map(processItem))
    .then(() => console.log('All items processed'))
    .catch(err => console.error('Error:', err));
