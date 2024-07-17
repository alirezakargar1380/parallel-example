const { parentPort } = require("worker_threads");

// Receive message from the parent
parentPort.on("message", async (item) => {
    // Send result back to parent
    if (item >= 10) 
        await new Promise((resolve) => setTimeout(resolve, 2000));
    else
        await new Promise((resolve) => setTimeout(resolve, 1000));
    parentPort.postMessage(item)
})