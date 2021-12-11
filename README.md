# Hantek-DSO5000-Series-CSV-to-PulseVIew
Convert Hantek DS0 CSV file to PulseView Value Change Dump data file for protocol analysis.

### The problem
The Hantek DSO 5000 Series has no protocol analysis, but can save to a time based CSV file.
Nothing I've found can load said file, so a conversion is nessesary.

### The Solution
Write a small nodejs conversion script to convert DSO 5000 Series CSV files to something PulseView can understand.
PulseView CSV import is as of this time buggy in that it forgets the time-base, making protocol analysis bug out.
PulseView import Value Change Dump data apears to work fine, so I'll use that format.

### How to use
1. Copy convert.js in to a folder.
2. Copy the Hantek CSV file in to the same folder.
3. Edit convert.js and set your desired input and output file names.
4. run the command `nodejs convert.js`
5. Launch PulseView
6. Click Create new session
7. Click Import Value Change Dump data
8. Select the output file (value-change-dump-data.vcd)
9. Select a decoder, attach to the D0 line
10. UART for example, to guess the baud rate, match the yellow bit width's to the average smaller pulse width's.

### Default options
Options are hard coded, editable top of the file convert.js
1. const FILE_IN			    = "WaveData50.csv"
2. const FILE_OUT			    = "value-change-dump-data.vcd"
3. const VOLTAGE			    = 2.5
4. const TIME_MULTIPLIER 	= 10000000
5. const TIME_SCALE 		  = "100 ns"

### VOLTAGE setting
Somewhere near the mid range of the voltage logic. If 5 volts, above or below 2.5 will determine a 1 or 0.

### TIME_MULTIPLIER
Whatever number is required to match the TIME_SCALE. eg In the input file a time of 2.00000E-07 = 0.0000002s = 200ns = 2 at 100ns(TIME_SCALE) intervals.
So 0.0000002 * 10000000(TIME_MULTIPLIER) = 2

### TIME_SCALE
TIME_SCALE for one probe on a DSO5205P is 100 ns.
The input file (WaveData50.csv) shows timebase=40000000(ps), this doesn't make sense to me.

