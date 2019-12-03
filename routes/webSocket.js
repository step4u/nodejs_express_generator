const wsModule = require("ws");

module.exports = function ( _server ) {
    const wss = new wsModule.Server({server:_server});
    wss.on( 'connection', function( ws, req ) {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log( ip + "아이피 클라이언트로 부터 접속 요청이 있었습니다.");
        ws.on( 'message', function( message ) {
            console.log(ip + "로 부터 받은 메시지 : " + message);
            ws.send( "echo:" + message );
        });

        ws.on('error', function(err) {
            console.log( ip + "클라이언트 연결중 오류 발생:" + err);
        });

        ws.on('close', function(){
            console.log( ip + "클라이언트와 접속이 끊어졌습니다." );
        });
    });
}
