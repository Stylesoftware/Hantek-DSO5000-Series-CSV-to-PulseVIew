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
1. Copy this GIT in to a folder.
2. Copy the Hantek CSV file in to the same folder.
3. Rename the Hantek CSV file to hantek.csv, or change the source code to your desired file name (convert.js first line)

### Command line
nodejs convert.js

### Options
Options are hard coded, editable top of the file convert.js
1. FILENAME: The source CSV file name.
2. VOLTAGE: The mid point between high and low signal. This determins when a binary 0 or 1 occurs. Example: 5v logic will be 2.5. This can be tweeked for example if you want a lower trigger point 0.5 might be what your after.
