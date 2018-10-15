
// UNCOMMENT THIS CODE IF YOU USE THE "serverwithanalytics" SERVER
var socket = io.connect();
socket.on('connect', function () {
  socket.send(window.location.href);
});
window.onhashchange = function () {
  socket.send(window.location.href);
}
