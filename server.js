const http = require('http');

const todos = [
    { id: 1, text: 'to do 1' },
    { id: 2, text: 'to do 2' },
    { id: 3, text: 'to do 3' }
];

const server = http.createServer(function (req, res) {
    
    const {method, url}=req;
    
    
    let body = [];
    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let status=404;
        const response={
            sucess:false,
            data:null
        }

        if(method==="GET" && url==='/todos'){
            status=200;
            response.sucess=true;
            response.data=todos;
        }else if(method==="POST" && url==='/todos'){
            const {id,text}=JSON.parse(body);

            if(!id||!text){
                status=400;

            }else{
                todos.push({id,text});
            status=201;
            response.sucess=true;
            response.data=todos;

            }

            
        }

        //To specify a response code and headers
    res.writeHead(status, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    });

        //Generate a response
    res.end(JSON.stringify(response));
        
    });

    
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


