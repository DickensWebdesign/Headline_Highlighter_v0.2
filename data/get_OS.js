var OSName="Unknown OS";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="Mac";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

/* output the System */
document.getElementById("system").innerHTML = "System:<br /><strong>"+OSName+"</strong>";
document.getElementById("closer").innerHTML = "Click to close";



/*add event listener to close the panel */
var closer = document.getElementById("closer");
closer.addEventListener('click', function () {
  
    self.port.emit("closing");
  
}, false);




 