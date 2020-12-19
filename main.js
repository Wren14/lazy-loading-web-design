var list = ['happy', 'angry', 'bored', 'disappointed', 'drunk', 'embarrassed', 'excited', 'frustrated', 'hungry', 'inspired', 'lonely', 'love', 'nervous', 'pain', 'reaction', 'relaxed', 'sad', 'sassy', 'scared', 'shocked', 'sick', 'stressed', 'surprised', 'suspicious', 'tired', 'unimpressed'];
var reqUrl = "http://api.giphy.com/v1/gifs/search?api_key="+API_KEY;
var i=2;
var scrollAmount = 200.0;
function createCarousal(title, elements)
{

	var outer = document.createElement("div");
	outer.setAttribute("class", "outerDiv");
	var carous = document.createElement("div");
	carous.id = ""+title;
	carous.setAttribute("class", "carousel slide");
	carous.setAttribute("data-ride", "carousel");
	var ol = document.createElement("ol");
	ol.setAttribute("class", "carousel-indicators");
	var divo = document.createElement("div");
	divo.setAttribute("class", "carousel-inner");
	var count = 0;
	var center = document.createElement("center");
	var h3 = document.createElement("h3");
	var text = document.createTextNode(title);
	h3.appendChild(text);
	center.appendChild(h3);
	elements.forEach(function(element){
		var li = document.createElement("li");
		li.setAttribute("data-target", "#"+title);
		li.setAttribute("data-slide-to",""+count);
		if(count === 0)
		{
			li.setAttribute("class", "active");
		}
		
		ol.appendChild(li);
		var divi = document.createElement("div");
		if(count === 0)
		{
			divi.setAttribute("class", "item active");
		}
		else{
			divi.setAttribute("class", "item");
		}
		var img = document.createElement("img");
		img.src = ""+element.images.original.url;
		img.alt = "Gif not found";
		divi.appendChild(img);
		divo.appendChild(divi);
		count++;
	});
	var aLeft = document.createElement("a");
	aLeft.setAttribute("class", "carousel-control left");
	aLeft.href = "#"+title;
	aLeft.setAttribute("data-slide","prev");
	var spanLeft = document.createElement("span");
	spanLeft.setAttribute("class", "glyphicon glyphicon-chevron-left");
	aLeft.appendChild(spanLeft);
	var aRight = document.createElement("a");
	aRight.setAttribute("class", "carousel-control right");
	aRight.href = "#"+title;
	aRight.setAttribute("data-slide","next");
	var spanRight = document.createElement("span");
	spanRight.setAttribute("class", "glyphicon glyphicon-chevron-right");
	aRight.appendChild(spanRight);
	carous.appendChild(ol);
	carous.appendChild(divo);
	carous.appendChild(aLeft);
	carous.appendChild(aRight);
	outer.appendChild(carous);
	outer.appendChild(center);
	document.body.appendChild(outer);
}
function parseJson(srcKey)
{
	fetch(reqUrl+srcKey).then(res => res.json()).then(res => createCarousal(srcKey,res.data));
	
}
function getJson(){
	if(pageYOffset>scrollAmount){
		if(i<list.length){
			console.log(`current PageYoffest: ${pageYOffset}. Current scroll Target: ${scrollAmount}`);
			parseJson(list[i]);
			i++;
			scrollAmount += 200;
		}
	}
}
function init(){
	document.getElementById("button").disabled = true; 
	parseJson(list[0]);
	parseJson(list[1]);
	window.onscroll = getJson;
}
document.getElementById('button').onclick= init;