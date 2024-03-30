const http = require("http");
const url = require("url");
const fs = require("fs").promises;

async function serve(filePath, port) {
    
    try {
        const fileData = await fs.readFile(filePath, 'utf8');

        const dataArray = fileData.trim().split("\n");

        const dataObject = {
            name: dataArray[0],
            age: parseInt(dataArray[1]),
            gender: dataArray[2]
        };

        const jsonData = JSON.stringify(dataObject);

        console.log("Converted json data", jsonData);

        const server = http.createServer();

        server.listen(port);

        console.log("Listening on port", port);

        server.on("request", async (request, response) => {
            const endpoint = url.parse(request.url).pathname;

            const headers = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            };

            let responseData;
            let statusCode = 200;

            switch (endpoint) {
                case "/name":
                    responseData = dataObject.name;
                    break;
                case "/age":
                    responseData = dataObject.age;
                    break;
                case "/gender":
                    responseData = dataObject.gender;
                    break;
                case "/all":
                    responseData = jsonData;
                    break;
                default:
                    statusCode = 404;
                    responseData = "Invalid endpoint. Available endpoints: /name, /age, /gender, /all";
            }

            response.writeHead(statusCode, headers);

            console.log(`Request: ${request.url}, Response: ${statusCode}, Data: ${responseData}`);
            
            response.end(JSON.stringify(responseData));
        });
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

serve("text.txt", 8000);
