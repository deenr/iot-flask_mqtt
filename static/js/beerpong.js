$(document).ready(function() {
    //var socket = io.connect('http://' + document.domain + ':' + location.port, {secure: true});
	var socket = io.connect('/');

    var subscribe_data_player_1 = '{"topic": "subscribe_data_player_1", "qos": 1}';
    socket.emit('subscribe', data=subscribe_data_player_1);

    var subscribe_data_player_2 = '{"topic": "subscribe_data_player_2", "qos": 1}';
    socket.emit('subscribe', data=subscribe_data_player_2);

    socket.on('mqtt_message', function(data) {
        console.log(data["topic"])
        if (data["topic"] === "subscribe_data_player_1") {
            var payload = data["payload"];
            sensor_values = payload.split("");

            sensor_values.forEach((function (sensor_value, i) {
                var dot = '#player1_dot' + (i+1);
                console.log(dot)
                if (sensor_value === "1") {
                    $(dot).css("background-color","green");
                } else {
                    $(dot).css("background-color","red");
                }
            }));
        }
            
        if (data["topic"] === "subscribe_data_player_2") {
            var payload = data["payload"];
            sensor_values = payload.split("");

            sensor_values.forEach((function (sensor_value, i) {
                var dot = '#player2_dot' + (i+1);
                console.log(dot)
                if (sensor_value === "1") {
                    $(dot).css("background-color","green");
                } else {
                    $(dot).css("background-color","red");
                }
            }));
        }
    })
  });