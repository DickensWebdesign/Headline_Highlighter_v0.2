/* SDK Modules */
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
let uuid = require('sdk/util/uuid').uuid();



/*SHOW OS */
var data = require("sdk/self").data;
// Construct a panel, loading its content from the "system_info_output.html"
// file in the "data" directory, and loading the "get_OS.js" script
// into it.
var system_info_output = require("sdk/panel").Panel({
  contentURL: data.url("system_info_output.html"),
  contentScriptFile: data.url("get_OS.js")
});
system_info_output.on("show", function() {
  system_info_output.port.emit("show");
});
/* Hide after Click */
system_info_output.port.on("closing", function () {

  system_info_output.hide();
});
/****************************************************/
/* Menu Buttons  */
// ************** THE MAIN BUTTON
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});
/* Show Panel */
function handleChange(state) {
  if (state.checked) {
    menupanel.show({ //show panel at button position
      position: button
    });
  }
}
// **********THE PANEL -> Containts Dowloadbutton
// Building the Panel -> Mainstuff
var menupanel = panels.Panel({
	contentURL: data.url("panel.html"),
  contentScriptFile: data.url("panel.js"),
  onHide: handleHide
});

/* Hide Panel */
function handleHide() {
  button.state('window', {checked: false}); //mainbutton = false then hide button
}

menupanel.port.on("download", function () {

  menupanel.hide();
   tabs.open("http://www.headline-highlighter.dickens-webdesign.de/downloads.html");
});
menupanel.port.on("docs", function () {

  menupanel.hide();
   tabs.open("http://www.headline-highlighter.dickens-webdesign.de/docs.html");
});








/* at START */
exports.main = function (startup) {
			 console.log("Addon start successful \nUUID: "+uuid);
			 system_info_output.show();
};

/* uninstall add on we call export.onUnload(reason) { to do } */
exports.onUnload = function (uninstall) {
	tabs.open("http://www.headline-highlighter.dickens-webdesign.de/uninstall_complete.html");
};

/* Modification of Webpages */
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*",
  contentScriptFile: data.url("h1modi.js")
});
