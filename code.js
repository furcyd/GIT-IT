/*jshint esversion: 6 */

var def = [];
def[1] = formatDef(1,"this is some text");
def[2] = formatDef(2,"this is some more text");
def[3] = formatDef(3,"this is some other text");
var shown = [];

function formatDef(n,text)
{
    return "<strong>Def. " + n + "</strong>:<br />" +
	"<blockquote>" + text + "</blockquote>";    
}
function init() {
    var words = document.getElementsByTagName("span");    
    for( var i = 0; i < words.length; i++) {
	var word = words[i];
	var classes = word.className.split(/\s+/);
	for (var c = 0; c < classes.length; c++) {
	    if (classes[c].startsWith("def")) {
		word.addEventListener(
		    'mouseenter',
		    e => { showDef(e.target); });		
	    }
	}	
    }
}

function insert(newdiv, existingNode) {
    var rect = existingNode.getBoundingClientRect();
    newdiv.style.position = "fixed";
    newdiv.style.width = "600px";
    newdiv.style.top = rect.bottom;
    newdiv.style.left = rect.left + "px";
    newdiv.style.backgroundColor = "#FFFFFF";
    newdiv.style.border = "1px dashed black";
    newdiv.style.borderRadius = "10px";
    newdiv.style.padding = "5px";
    newdiv.style.zIndex = "100";    
    newdiv.addEventListener('mouseleave', e => { hideDef(newdiv); });
    existingNode.parentNode.appendChild(newdiv);
    hideAllOthers();    
    shown.push(newdiv);
}


function hideAllOthers() {
    for ( var i = 0; i < shown.length; i++) {
	shown[i].remove();
    }
    shown = [];
}

function showDef(word) {
    var newdiv = document.createElement("div");
    var classes = word.className.split(/\s+/);
    var defnum;
    for (var c = 0; c < classes.length; c++) {
	if (classes[c].startsWith("def")) {
	    defnum = parseInt(classes[c].substring(3));
	    break;
	}
    }
    newdiv.innerHTML = def[defnum];
    insert(newdiv, word);
}

function hideDef(word) {
    word.parentNode.lastChild.remove();
}
