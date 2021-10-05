// From https://monkeyraptor.johanpaul.net/2015/09/javascript-how-to-extract-date-from-iso.html    
export default function extractDate(a) {
  "use strict";
  var input, monthNames, day, month, year;
  //we can chain the methods for "input" variable:
  input = a.split("T")[0].split("-");
  day = input[2];
  month = input[1];
  year = input[0];
  monthNames = "January,February,March,April,May,June,July,August,September,October,November,December";
  monthNames = monthNames.split(",");
  return monthNames[Number(month) - 1] + " " + day + ", " + year;
}
