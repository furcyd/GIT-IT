/*jshint esversion: 6 */

var shown = [];
var rightArrow = "\u25B6";
var downArrow  = "\u25BC";
    
function formatDef(n)
{
    var html = '<p class="header"><strong>Def. ' + n + ':</strong><span class="page">[Page '  + defs[n].page + ']</span></p>' +
    	'<blockquote class="definition">' + defs[n].text + '</blockquote>';
    return html;
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
    var arrow = document.getElementById("arrow1");
    arrow.addEventListener( 'click', e => clickArrow(e) ); 
}

function clickArrow(e) {
    var arrow = e.target;
    if (arrow.innerHTML.startsWith(downArrow)) {
	arrow.innerHTML = rightArrow;
    } else {
	arrow.innerHTML = downArrow;
    }
}

function insert(newdiv, existingNode) {
    var rect = existingNode.getBoundingClientRect();
    newdiv.style.position = "fixed";
    newdiv.style.width = "600px";
    newdiv.style.top = (rect.top + 20) + "px";
    newdiv.style.left = (rect.right - 600) + "px";    
    //newdiv.style.left = rect.left + "px";
    newdiv.style.backgroundColor = "#FFFFFF";
    //newdiv.style.border = "1px dashed black";
    newdiv.style.borderRadius = "10px";
    newdiv.style.padding = "5px";
    newdiv.style.zIndex = "100";    
    newdiv.addEventListener('mouseleave', e => { hideDef(newdiv); });
    existingNode.parentNode.appendChild(newdiv);
    hideAllOthers();
    MathJax.Hub.Typeset();
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
    newdiv.innerHTML = formatDef(defnum);
    insert(newdiv, word);
}

function hideDef(word) {
    word.parentNode.lastChild.remove();
}
