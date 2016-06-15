"use strict";

var BestSongsFinder = require('./bestsongsfinder');
var expect = require('chai').expect;


var songs = [
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

describe("String BestSongsFinder", function(){
	
	it('it should return 1 if the first album is given', function(){
		var bestsongsfinder = new BestSongsFinder();
		var result = bestsongsfinder.addAlbum(songs);
		expect(result).to.equal(1);
	});
	
	it('it should return 2 if the first album is given', function(){
		var bestsongsfinder = new BestSongsFinder();
		var result = bestsongsfinder.addAlbum(songs);
		expect(result).to.equal(2);
	});
	
	it('it should return with the most popular song - 19_2000', function(){
		var bestsongsfinder = new BestSongsFinder();
		var result = bestsongsfinder.find(songs,1);
	//	expect(result).to.equal("title" + ': ' + "19_2000");
		console.log(result);
	});
	
	it('it should return with the 3 most popular songs', function(){
		var bestsongsfinder = new BestSongsFinder();
		var result = bestsongsfinder.find(songs,3);
		console.log(result);
	});


	
	
});