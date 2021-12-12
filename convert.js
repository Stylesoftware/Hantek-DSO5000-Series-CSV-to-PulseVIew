/**************** OPTIONS *******************/

const FILE_IN			= "WaveData50.csv";
const FILE_OUT			= "value-change-dump-data.vcd";
const VOLTAGE			= 2.5;
const TIME_MULTIPLIER 	        = 10000000;
const TIME_SCALE 		= "100 ns";

/**************** CONVERT *******************/

const fs = require('fs')

const header = 
`$date Sat Dec 11 13:35:00 2021 $end
$version libsigrok 0.6.0-git-e972674 $end
$comment 1 digital channel $end
$timescale ${TIME_SCALE} $end
$scope module libsigrok $end
$var wire 1 ! D0 $end
$upscope $end
$enddefinitions $end

`;

let fout = header;
let state = -1;
let last_state = -1;
let time = -1
try {
	var fin = fs.readFileSync(FILE_IN, {encoding:'utf8'});
} catch (e) {
	console.log(FILE_IN, 'File read error', e);
	return;
}
fin = fin.split('\n');

for(var a=0;a<fin.length;a++) {
	if(!fin[a].length || fin[a].startsWith('#')) 
		continue;

	let line = fin[a].split(',');

	if(line[1] >= VOLTAGE) {
		state = 1;
	} else {
		state = 0;
	}
	
	if(state !== last_state) {
		last_state = state;
		time = line[0];
		fout += `#${parseInt(time*TIME_MULTIPLIER)}  ${state}!\n`;
	}
}

try {
	fs.writeFileSync(FILE_OUT, fout);
} catch (e) {
	console.log(FILE_OUT, 'File write error', e);
}

