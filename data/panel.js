
/*add event listener to close the panel */
var download = document.getElementById("download");
download.addEventListener('click', function () {
  
    self.port.emit("download");
  
}, false);
/*add event listener to close the panel */
var docs = document.getElementById("docs");
docs.addEventListener('click', function () {
  
    self.port.emit("docs");
  
}, false);