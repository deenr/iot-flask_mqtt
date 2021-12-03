var g_id_selected_dot;
var player1_leds = '111111111111111111';
var player2_leds = '111111111111111111';

$(document).ready(function () {
    //var socket = io.connect('http://' + document.domain + ':' + location.port, {secure: true});
    var socket = io.connect('/');

    var subscribe_data_player_1 = '{"topic": "sensorValP1", "qos": 1}';
    socket.emit('subscribe', data = subscribe_data_player_1);

    var subscribe_data_player_2 = '{"topic": "subscribe_data_player_2", "qos": 1}';
    socket.emit('subscribe', data = subscribe_data_player_2);

    socket.on('mqtt_message', function (data) {
        console.log(data["topic"])
        if (data["topic"] === "sensorValP1") {
            var payload = data["payload"];
            sensor_values = payload.split("");

            sensor_values.forEach((function (sensor_value, i) {
                var dot = '#player1_dot' + (i + 1);
                console.log(dot)
                if (sensor_value === "1") {
                    $(dot).css("background-color", "green");
                    // setCorrectCupColor()
                } else {
                    $(dot).css("background-color", "#2C2C2C");
                }
            }));
        }

        if (data["topic"] === "subscribe_data_player_2") {
            var payload = data["payload"];
            sensor_values = payload.split("");

            sensor_values.forEach((function (sensor_value, i) {
                var dot = '#player2_dot' + (i + 1);
                console.log(dot)
                if (sensor_value === "1") {
                    $(dot).css("background-color", "green");
                    // setCorrectCupColor()
                } else {
                    $(dot).css("background-color", "#2C2C2C");
                }
            }));
        }
    })

    $('#send_leds_player_1').click(function (event) {
        var topic = 'ledValP1';
        var message = $('#data_leds_player_1').val();
        var qos = 1;
        var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
        socket.emit('publish', data = data);
    });

    $('#send_leds_player_2').click(function (event) {
        var topic = 'leds_data_player_2';
        var message = $('#data_leds_player_2').val();
        var qos = 1;
        var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
        socket.emit('publish', data = data);
    });




    $('#submit_rgb').click(function (event) {
        $('#' + g_id_selected_dot).css('filter', 'brightness(1)');

        var player_number = g_id_selected_dot.charAt(g_id_selected_dot.length - 6);
        var led_number = g_id_selected_dot.charAt(g_id_selected_dot.length - 1);

        var RGB = ''
        if ($('#red_dot').css('filter') === 'brightness(1)') {
            RGB = RGB + 1;
        } else {
            RGB = RGB + 0;
        }
        if ($('#green_dot').css('filter') === 'brightness(1)') {
            RGB = RGB + 1;
        } else {
            RGB = RGB + 0;
        }
        if ($('#blue_dot').css('filter') === 'brightness(1)') {
            RGB = RGB + 1;
        } else {
            RGB = RGB + 0;
        }

        if (player_number === '1') {
            player1_leds = player1_leds.substring(0, (led_number - 1) * 3) + RGB + player1_leds.substring((led_number - 1) * 3 + 3);

            var topic = 'ledValP1';
            var message = player1_leds;
            var qos = 1;
            console.log()
            var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
            socket.emit('publish', data = data);
        } else {
            player2_leds = player1_leds.substring(0, (led_number - 1) * 3) + RGB + player2_leds.substring((led_number - 1) * 3 + 3);

            var topic = 'ledValP2';
            var message = player2_leds;
            var qos = 1;
            var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
            socket.emit('publish', data = data);
        }

        switch (RGB) {
            case '000':
                $('#' + g_id_selected_dot).css('background-color', '#2C2C2C');
                break;
            case '001':
                $('#' + g_id_selected_dot).css('background-color', '#3399FF');
                break;
            case '010':
                $('#' + g_id_selected_dot).css('background-color', '#33FF33');
                break;
            case '011':
                $('#' + g_id_selected_dot).css('background-color', '#33FFFF');
                break;
            case '100':
                $('#' + g_id_selected_dot).css('background-color', '#FF3333');
                break;
            case '101':
                $('#' + g_id_selected_dot).css('background-color', '#9933FF');
                break;
            case '110':
                $('#' + g_id_selected_dot).css('background-color', '#FFFF33');
                break;
            case '111':
                $('#' + g_id_selected_dot).css('background-color', '#C0C0C0');
                break;
            default:
                $('#' + g_id_selected_dot).css('background-color', '#BBB');
        }

        console.log(RGB, player_number, led_number);
        $('.rgb_div').hide();
    });
});

function setCorrectCupColor() {
    var players = ['1', '2'];
    var dots = ['1', '2', '3', '4', '5', '6'];
    players.forEach(i => {
        index_player_number = 6;

        id_cup_player = id.substring(0, index_player_number) + i + id.substring(index_player_number + 1);

        dots.forEach(j => {
            index_dot_number = 11;

            id_cup_player_and_number = id_cup_player.slice(0, -1) + j;

            $('#' + id_cup_player_and_number).css('filter', 'brightness(1)');

            var RGB = player1_leds.charAt(player1_leds.length - 18 + (dot_number - 1) * 3) + '' + player1_leds.charAt(player1_leds.length - 17 + (dot_number - 1) * 3) + '' + player1_leds.charAt(player1_leds.length - 16 + (dot_number - 1) * 3);

            switch (RGB) {
                case '000':
                    $('#' + id_cup_player_and_number).css('background-color', '#2C2C2C');
                    break;
                case '001':
                    $('#' + id_cup_player_and_number).css('background-color', '#3399FF');
                    break;
                case '010':
                    $('#' + id_cup_player_and_number).css('background-color', '#33FF33');
                    break;
                case '011':
                    $('#' + id_cup_player_and_number).css('background-color', '#33FFFF');
                    break;
                case '100':
                    $('#' + id_cup_player_and_number).css('background-color', '#FF3333');
                    break;
                case '101':
                    $('#' + id_cup_player_and_number).css('background-color', '#9933FF');
                    break;
                case '110':
                    $('#' + id_cup_player_and_number).css('background-color', '#FFFF33');
                    break;
                case '111':
                    $('#' + id_cup_player_and_number).css('background-color', '#C0C0C0');
                    break;
                default:
                    $('#' + id_cup_player_and_number).css('background-color', '#BBB');
            }
        });
    });
}

function changeCupColor(id) {
    var players = ['1', '2'];
    var dots = ['1', '2', '3', '4', '5', '6'];
    players.forEach(i => {
        index_player_number = 6;

        id_cup_player = id.substring(0, index_player_number) + i + id.substring(index_player_number + 1);

        dots.forEach(j => {
            index_dot_number = 11;

            id_cup_player_and_number = id_cup_player.slice(0, -1) + j;

            $('#' + id_cup_player_and_number).css('filter', 'brightness(1)');
        });
    });

    g_id_selected_dot = id;
    $('#' + id).css('filter', 'brightness(0.5)');


    var player_number = id.charAt(id.length - 6);
    var dot_number = id.charAt(id.length - 1);

    if (player_number === '1') {
        var R = player1_leds.charAt(player1_leds.length - 18 + (dot_number - 1) * 3);
        if (R === '1') {
            $('#red_dot').css('filter', 'brightness(1)');
        } else {
            $('#red_dot').css('filter', 'brightness(0.5)');
        }
        var G = player1_leds.charAt(player1_leds.length - 17 + (dot_number - 1) * 3);
        if (G === '1') {
            $('#green_dot').css('filter', 'brightness(1)');
        } else {
            $('#green_dot').css('filter', 'brightness(0.5)');
        }
        var B = player1_leds.charAt(player1_leds.length - 16 + (dot_number - 1) * 3);
        if (B === '1') {
            $('#blue_dot').css('filter', 'brightness(1)');
        } else {
            $('#blue_dot').css('filter', 'brightness(0.5)');
        }
    } else {
        var R = player2_leds.charAt(player2_leds.length - 18 + (dot_number - 1) * 3);
        if (R === '1') {
            $('#red_dot').css('filter', 'brightness(1)');
        } else {
            $('#red_dot').css('filter', 'brightness(0.5)');
        }
        var G = player2_leds.charAt(player2_leds.length - 17 + (dot_number - 1) * 3);
        if (G === '1') {
            $('#green_dot').css('filter', 'brightness(1)');
        } else {
            $('#green_dot').css('filter', 'brightness(0.5)');
        }
        var B = player2_leds.charAt(player2_leds.length - 16 + (dot_number - 1) * 3);
        if (B === '1') {
            $('#blue_dot').css('filter', 'brightness(1)');
        } else {
            $('#blue_dot').css('filter', 'brightness(0.5)');
        }
    }

    dot_number.substr(1, 4);

    $('.rgb_div').show();
}

function changeRGBColor(id) {
    if ($('#' + id).css('filter') === 'brightness(1)') {
        $('#' + id).css('filter', 'brightness(0.3)');
    } else {
        $('#' + id).css('filter', 'brightness(1)');
    }
}
