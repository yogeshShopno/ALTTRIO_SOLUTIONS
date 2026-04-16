const http = require("http");

const server = http.createServer((req, res) => {
    console.log("new requrest",);

    res.end("hello from the yogi");

});

server.listen(8000, () => {
    console.log("server is listing to port 5000");

})



