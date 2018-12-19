/*
//	Made with <3 by Marcus Bizal
//	github.com/marcbizal
//	linkedin.com/in/marcbizal
*/

var audio = new Audio('https://s10.youtubemp3api.com/@download/251-5c1a68eef00db-7160000-179-320-webm-2617598/mp3/8iDFTEFkUEY/Meek%2BMill%2B-%2BGoing%2BBad%2B%255BClean%255D%2BFeat%2B-%2BDrake.mp3');
var played = "false"

$(document).ready(function() {
		"use strict";

		// UTILITY
		function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
		}
		// END UTILITY

		// COMMANDS
		function cls() {
				terminal.text("");
		}

		function help() {
				terminal.append("commands. cls | dir | dns |\n");
		}
	
	function play() {
		audio.play();
		played = "true"
		}
	
	function stop() {
		if (played == "true") {
			audio.pause();
		}else{ 	terminal.append("Audio not played\n");
		}
		
		played = "false"
	}
	
	function dir() {			window.open('https://github.com/gnet27?tab=repositories');
		}
	
	function dns() {
				terminal.append("Please specify. Type dns_help for more info.\n");
	}
	
	function kill() {
				window.close()
		}
	
	function dns_help() {
				terminal.append("git/frm | cname\n");
		}
	
		function echo(args) {
				var str = args.join(" ");
				terminal.append(str + "\n");
		}

		function fortune() {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'https://raw.githubusercontent.com/bmc/fortunes/master/fortunes', false);
				xhr.send(null);

				if (xhr.status === 200) {
						var fortunes = xhr.responseText.split("%");
						var fortune = fortunes[getRandomInt(0, fortunes.length)].trim();
						terminal.append(fortune + "\n");
				}
		}
		// END COMMANDS

		var title = $(".title");
		var terminal = $(".terminal");
		var prompt = "➜";
		var path = "~";

		var commandHistory = [];
		var historyIndex = 0;

		var command = "";
		var commands = [{
						"name": "cls",
						"function": cls
				}, {
					"name": "kill",
						"function": kill
				}, {
					"name": "dir",
						"function": dir
					}, {
					"name": "stop",
						"function": stop
				}, {
					"name": "play",
						"function": play
				}, {
					"name": "help",
						"function": help
					}, {	
					"name": "dns_help",
						"function": dns_help
					}, {	
					"name": "dns",
						"function": dns
				}, {
						"name": "fortune",
						"function": fortune
				}, {
						"name": "echo",
						"function": echo
				}];

function processCommand() {
		var isValid = false;

		// Create args list by splitting the command
		// by space characters and then shift off the
		// actual command.

		var args = command.split(" ");
		var cmd = args[0];
		args.shift();

		// Iterate through the available commands to find a match.
		// Then call that command and pass in any arguments.
		for (var i = 0; i < commands.length; i++) {
				if (cmd === commands[i].name) {
						commands[i].function(args);
						isValid = true;
						break;
				}
		}

		// No match was found...
		if (!isValid) {
				terminal.append("zsh: command not found: " + command + "\n");
		}

		// Add to command history and clean up.
		commandHistory.push(command);
		historyIndex = commandHistory.length;
		command = "";
}

function displayPrompt() {
		terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
		terminal.append("<span class=\"path\">" + path + "</span> ");
}

// Delete n number of characters from the end of our output
function erase(n) {
		command = command.slice(0, -n);
		terminal.html(terminal.html().slice(0, -n));
}

function clearCommand() {
		if (command.length > 0) {
				erase(command.length);
		}
}

function appendCommand(str) {
		terminal.append(str);
		command += str;
}

/*
	//	Keypress doesn't catch special keys,
	//	so we catch the backspace here and
	//	prevent it from navigating to the previous
	//	page. We also handle arrow keys for command history.
	*/

$(document).keydown(function(e) {
		e = e || window.event;
		var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

		// BACKSPACE
		if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
				e.preventDefault();
				if (command !== "") {
						erase(1);
				}
		}

		// UP or DOWN
		if (keyCode === 38 || keyCode === 40) {
				// Move up or down the history
				if (keyCode === 38) {
						// UP
						historyIndex--;
						if (historyIndex < 0) {
								historyIndex++;
						}
				} else if (keyCode === 40) {
						// DOWN
						historyIndex++;
						if (historyIndex > commandHistory.length - 1) {
								historyIndex--;
						}
				}

				// Get command
				var cmd = commandHistory[historyIndex];
				if (cmd !== undefined) {
						clearCommand();
						appendCommand(cmd);
				}
		}
});

$(document).keypress(function(e) {
		// Make sure we get the right event
		e = e || window.event;
		var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

		// Which key was pressed?
		switch (keyCode) {
				// ENTER
				case 13:
						{
								terminal.append("\n");

								processCommand();
								displayPrompt();
								break;
						}
				default:
						{
								appendCommand(String.fromCharCode(keyCode));
						}
		}
});

// Set the window title
title.text("1. admin@gnet27: ~ (zsh)");

// Get the date for our fake last-login
var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);

// Display last-login and promt
terminal.append("Last login: " + date + " on host001\n"); displayPrompt();
});
