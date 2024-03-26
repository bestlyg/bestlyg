const net = require('net');
const fs = require('fs');
const server = net.createServer(function (socket) {
    console.log('\n\n\n\n\n\nSOCKET\n');
    const html = fs.readFileSync('./src/tcp/http/index.html');
    const message = `HTTP/1.1 200 OK\r\nContent-Length: ${html.length}\r\n\r\n${html.toString()}`;
    socket.write(message, function () {
        const writeSize = socket.bytesWritten;
        console.log('数据发送成功，数据长度为：' + writeSize);
    });
    socket.on('data', function (data) {
        const readSize = socket.bytesRead;
        console.log('接收到数据为：' + data.toString(), '；接收的数据长度为：' + readSize);
    });
});
server.listen(8001, function () {
    console.log('服务正在监听中。。。');
});
