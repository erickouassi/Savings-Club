closeSidebar();
function openSidebar() {
  document.getElementById("mySidebar").style.display = "block";
}

function closeSidebar() {
  document.getElementById("mySidebar").style.display = "none";
}

var day;
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case  6:
    day = "Saturday";
}
document.getElementById("date").innerHTML = "Happy  " + day;
var d = new Date(); // Full current date and time
// var n = d.getFullYear() // Just the year (2021)
document.getElementById("update").innerHTML = d;
//document.getElementsByClassName("year").innerHTML = n;

function update_table(data,columns) // Create table
{
  var table = d3.select('#app').append('table')
  var thead = table.append('thead')
  var tbody = table.append('tbody')
  thead.append('tr').selectAll('th').data(columns).enter().append('th').text(function (d) { return d })
  var rows = tbody.selectAll('tr').data(data).enter().append('tr')
  var cells = rows.selectAll('td').data(function(row) {
    return columns.map(function (column) {
      return { column: column, value: row[column] } })
  }).enter().append('td').text(function (d) { return d.value })
  return table;
}

function clear_table() // Clear table
{
  var table = d3.select('#app').selectAll("table").remove();
}

function callback_data() // Get data from spreadsheet
{
  var pres = document.getElementById('user_id').value
  var dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTZfViWVWVrv9-KdYkUSTyN1Zy1a937zu-FMHO9Yu8ccFXj10HY74w8PYCJ2ddV-1gmeIKo88mh3IWW/pub?gid=1170609517&single=true&output=csv'
  var t = d3.csv(dataUrl,function (data) {
  var columns = ['Name','id', 'Balance', 'Pourcentage'];
  var subset = data.filter( function(d) { return d.id.toString() === document.getElementById('user_id').value });
    update_table(subset,columns) }); 
}

function resetForm(form) // Reset button clicked
  {
    form.myButton.disabled = false;
    form.myButton.value = "Submit";
  }

