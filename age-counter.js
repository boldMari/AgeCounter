function calculateAge() {
  var birthdate = new Date(document.getElementById("birthdate").value);
  var now = new Date();

  var years = now.getFullYear() - birthdate.getFullYear();
  var months = now.getMonth() - birthdate.getMonth();
  var days = now.getDate() - birthdate.getDate();

  // Check if the birth month and day have passed in the current year
  if (months < 0 || (months === 0 && now.getDate() < birthdate.getDate())) {
    years--;
    months = 12 - birthdate.getMonth() + now.getMonth();
  }

  // Adjust months and years if the current day is before the birth day
  if (now.getDate() < birthdate.getDate()) {
    months--;
    if (months < 0) {
      months = 11;
      years--;
    }
    var tempDate = new Date(now.getFullYear(), now.getMonth() - 1, birthdate.getDate());
    var diff = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
    days = diff >= 0 ? diff : 0;
  }

  // Calculate the age in days by considering varying month lengths
  var ageInDays = calculateDays(birthdate, now);

  // Display the age in the result div
  document.getElementById("result").innerHTML =
    "Your age is " +
    years +
    " years, " +
    months +
    " months, and " +
    days +
    " days. (Approximately " +
    ageInDays +
    " days).";
}

function calculateDays(start, end) {
  var count = 0;
  var current = new Date(start);

  while (current <= end) {
    count++;
    current.setDate(current.getDate() + 1);
  }

  return count - 1; // Subtracting 1 to exclude the end date
}



