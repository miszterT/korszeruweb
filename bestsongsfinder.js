"use strict";

var BestSongsFinder = function() {};

var id = 0;
var container =[];
/*
var album = [
{ "frequency": 197812, "title": "re_hash" },
{ "frequency": 78906, "title": "5_4" },
{ "frequency": 189518, "title": "tomorrow_comes_today" },
{ "frequency": 39453, "title": "new_genious" },
{ "frequency": 210492, "title": "clint_eastwood" },
{ "frequency": 26302, "title": "man_research" },
{ "frequency": 22544, "title": "punk" },
{ "frequency": 19727, "title": "sound_check" },
{ "frequency": 17535, "title": "double_bass" },
{ "frequency": 18782, "title": "rock_the_house" },
{ "frequency": 198189, "title": "19_2000" },
{ "frequency": 13151, "title": "latin_simone" },
{ "frequency": 12139, "title": "starshine" },
{ "frequency": 11272, "title": "slow_country" },
{ "frequency": 10521, "title": "m1_a1" }
];
*/
var ConvertToStringFromJson = function(element){
	return JSON.stringify(element);
}

var SplitUsingComa = function(element){
	return element.split(',');
}

var SplitFrequencyPart = function(element){
	return element[0].split(':');
}

var SplitUsingSpace = function(element){
	return element.split(' ');
}

var PrepareZipfValuesWithTitleArray = function(zipValue,title){
	return zipValue + " " + title[1];
}

var ZipfCalculator = function(frequency, sizeOfArray, actualElement){
	var result;
	result = frequency / (sizeOfArray - actualElement);
	return parseInt(result);
}

var SplitAlbumData = function(album){
var albumData = [];
	for ( var i=0; i<album.length;i++){
		var convertedString = ConvertToStringFromJson(album[i]);
		var comaSplit = SplitUsingComa(convertedString);
		var frequencySplit = SplitFrequencyPart(comaSplit);
		var zipValue = ZipfCalculator(frequencySplit[1], album.length, i);
		albumData.push(PrepareZipfValuesWithTitleArray(zipValue,comaSplit));
	}
	return albumData;
}

var GetSortedArray = function(temporaryArray){
var result = [];

while (temporaryArray.length > 0){
var ind = 0;
var max = temporaryArray[0][0];

	for (var i = 1; i<temporaryArray.length; i++){
		if (parseInt(temporaryArray[i][0]) > parseInt(max)){
			max = temporaryArray[i][0];
			ind = i;
		}
	}	

result.push(temporaryArray[ind]);
temporaryArray.splice(ind,1);
}
return result;
}

var SortSongList = function(array){
var result = []
var temporaryArray = []
for (var i = 0; i<array.length; i++){
temporaryArray[i] = SplitUsingSpace(array[i]);
}
return GetSortedArray(temporaryArray);
}

var PrepareJsonFormat = function(element){
	var stringFormatJson = JSON.parse(JSON.stringify('{' + element + '}'));
	var jsonFormat = stringFormatJson.split(' ');
	return JSON.parse(jsonFormat);
}

var ReplaceAllSymbols = function(elementFromArray){
var temporaryArray = []
var result = []
	for (var i=0; i<elementFromArray.length; i++){
		temporaryArray[i] = elementFromArray[i][1].replace('{','').replace('}','');
		result[i] = PrepareJsonFormat(temporaryArray[i]);
	}
	return result;
}

var ShowTopSongs = function(sortedTitleArray, numberOfSongs){
	var result = [];
		for (var i=0; i<numberOfSongs; i++){
			result.push(sortedTitleArray[i]);
		}
	return result;
}


BestSongsFinder.prototype.find = function(album,numberOfSongs){
	if (album == ''){
		
	return 0;
	}
	else
	{
	var splitData = SplitAlbumData(album);
	var sortedAlbumArray = SortSongList(splitData);
	var arrangedSongList = ReplaceAllSymbols(sortedAlbumArray);

		return ShowTopSongs(arrangedSongList,numberOfSongs);
	}
}

BestSongsFinder.prototype.addAlbum = function(album){
	id++;
	container.push(album);
//	console.log(container);
	return id;
}


module.exports = BestSongsFinder;