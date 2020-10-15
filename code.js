/*jshint esversion: 6 */

var shown = [];
var definitionOrder = "alpha";
var rightArrow = "\u25B6";
var downArrow  = "\u25BC";
    
function formatDef(n)
{
    var html = '<p class="header"><strong>Def. ' + n + ':</strong><span class="page">[Page '  + defs[n].page + ']</span></p>' +
    	'<blockquote class="definition">' + defs[n].text + '</blockquote>';
    return html;
}

function init() {

    displayTheoremList();
    
    // radiobuttons

    var radiobuttons = document.querySelectorAll("input[type=radio]"),
	n = radiobuttons.length;
    for (var n = 0; n < radiobuttons.length; n++) {
        radiobuttons[n].addEventListener("change",function() {
            if (this.name == "defOrder") {
		var order = document
		    .querySelector('input[name = "defOrder"]:checked').value;
		orderDefinitions(order)	
	    }
	},0);
    }

    orderDefinitions("alpha");
    /*
    // definitions
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
    */
    var arrow = document.getElementById("arrow1");
    arrow.addEventListener( 'click', e => clickArrow(e) ); 
}

function orderDefinitions(order) {
    if (order == "alpha")
	defs.sort( function(a,b) {
	    if (a["term"] < b["term"]) return -1;
	    else if (a["term"] == b["term"]) return 0;
	    else return 1;
	});
    else // chrono
	defs.sort( function(a,b) {
	    if (a["n"] < b["n"]) return -1;
	    else if (a["n"] == b["n"]) return 0;
	    else return 1;
	});
    //console.log(order);
    displayDefinitions(order);
}

function displayDefinitions(order) {
    var definitionsDiv = document.getElementById("definitions");
    definitionsDiv.removeChild(definitionsDiv.lastChild);
    var list;
    var elements = "";
    if (order == "chrono") {
	list = document.createElement("ol");
	for( var d = 1; d < defs.length; d++) {
	    elements += '<li><span class="hasdefinition def"' +
		defs[d].n + ">" + defs[d].term +"</span></li>";
	}
    }
    else {
	list = document.createElement("ul");
	for( var d = 1; d < defs.length; d++) {
	    elements += '<li><span class="hasdefinition def"' +
		defs[d].n + ">" + defs[d].term +"</span></li>";
	}
	
    }

    list.innerHTML = elements;
    definitionsDiv.appendChild(list);
    MathJax.Hub.Typeset();    
}

function displayTheoremList(order) {
    var theoremsDiv = document.getElementById("theoremslist");
    theoremsDiv.removeChild(theoremsDiv.lastChild);
    var elements = "";
    var list = document.createElement("ol");
    for( var t = 1; t <  theorems.length; t++)
    {
	var id = '"theorem' + theorems[t].n + '"';
	elements += '<li><span id=' + id + '>Theorem ' +
	    theorems[t].n +"</span></li>";
    }
    list.innerHTML = elements;
    theoremsDiv.appendChild(list);
    for(var t = 1; t <  theorems.length; t++)
    {
	var id = 'theorem' + theorems[t].n;
	var element = document.getElementById(id);
	element.addEventListener('click', e => { displayTheorem(e.target); });
    }
	

    MathJax.Hub.Typeset();    
}

function displayTheorem(span)
{
    var index = span.innerText.indexOf(" ");
    var number = Number.parseInt( span.innerText.substr(index));
    var statement = theorems[number].text;
    console.log(statement);
}

/*
      <ul>
	<li><span class="hasdefinition def1">effectively decidable</span></li>
	<li><span class="hasdefinition def2">effectively formalized</span></li>
	<li><span class="hasdefinition def3">effectively axiomatized formal theory</span></li>
	<li><span class="hasdefinition def4">$\vdash$ or turnstile symbol </span></li>
	<li><span class="hasdefinition def5">$\models$ or double turnstile symbol </span></li>	
      </ul>

*/
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
