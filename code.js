
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
    displayDefinitionList(order);
}

function displayDefinitionList(order) {
    var definitionsList = document.getElementById("definitionslist");
    //definitionsDiv.removeChild(definitionsDiv.lastChild);
    var list;
    var elements = "";
    if (order == "chrono") {
	list = document.createElement("ol");
    } else {
	list = document.createElement("ul");
    }
    for( var d = 1; d < defs.length; d++) {
	elements += '<li><span id="def' +
	    defs[d].n + '">' + defs[d].term +"</span></li>";
    }
    list.innerHTML = elements;

    var child = definitionsList.firstChild;
    if (child)
	definitionsList.removeChild(child);
    
    definitionsList.appendChild(list);
    MathJax.Hub.Typeset();

    for(var d = 1; d <  defs.length; d++)
    {
	var id = 'def' + defs[d].n;
	var element = document.getElementById(id);
	element.addEventListener('click', e => { displayDefinition(e.target); });
	element.addEventListener('mouseenter',
				 e => { e.target.classList.add("bold"); });
	element.addEventListener('mouseleave',
				 e => { e.target.classList.remove("bold"); });		
    }

}

function displayTheoremList(order) {
    var theoremsDiv = document.getElementById("theoremslist");
    //theoremsDiv.removeChild(theoremsDiv.lastChild);
    var elements = "";
    var list = document.createElement("ul");
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
	element.addEventListener('click', e => { processClick(e); });

	element.addEventListener('dblclick', e => { displayDependencies(e.target); });	
	element.addEventListener('mouseenter',
				 e => { e.target.classList.add("bold"); });
	element.addEventListener('mouseleave',
				 e => { e.target.classList.remove("bold"); });		
    }
	

    MathJax.Hub.Typeset();    
}


function displayDependencies(element)
{
    console.log(element);
}


function processClick(event)
{
    if (event.shiftKey)
	displayDependencies(event.target);
    else
	displayTheorem(event.target);
}



function displayTheorem(span)
{

    var index = span.innerText.indexOf(" ");
    var number = Number.parseInt( span.innerText.substr(index));
    if (! theorems[number].display)
    {
	var statement = theorems[number].text;
	var newdiv = document.createElement("div");
	newdiv.classList.add("theoremstatement")
	newdiv.innerHTML = statement;
	insertTheorem(newdiv, span);
	theorems[number].display = true;
    }
}


var tmp;
function displayDefinition(span)
{
    var number = parseInt(span.id.substr(3));
    var index = defs.map(function(e) { return e.n; }).indexOf(number);
    var statement = defs[index].text;
    
    if (! defs[number].display)
    {
	var newdiv = document.createElement("div");
	newdiv.classList.add("defstatement")
	newdiv.innerHTML = statement;
	insertDefinition(newdiv, span);
	defs[number].display = true;
    }
}

function clickArrow(e) {
    var arrow = e.target;
    if (arrow.innerHTML.startsWith(downArrow)) {
	arrow.innerHTML = rightArrow;
    } else {
	arrow.innerHTML = downArrow;
    }
}


function insertTheorem(newdiv, existingNode) {
    var rect = existingNode.getBoundingClientRect();
    newdiv.addEventListener('click', e => { hideTheorem(newdiv); });
    insertAfter(newdiv,existingNode);
    MathJax.Hub.Typeset();
}


function insertDefinition(newdiv, existingNode) {
    var rect = existingNode.getBoundingClientRect();
    newdiv.addEventListener('click', e => { hideDefinition(newdiv); });
    insertAfter(newdiv,existingNode);
    MathJax.Hub.Typeset();
}


function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
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



function hideTheorem(word) {
    var span = word.previousSibling;
    var number = span.id.substring(7);
    theorems[number].display = false;
    word.parentNode.lastChild.remove();
}


function hideDefinition(word) {
    var span = word.previousSibling;
    var number = span.id.substring(3);
    defs[number].display = false;
    word.parentNode.lastChild.remove();
}
