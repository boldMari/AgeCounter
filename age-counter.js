function calculateAge() {
  var birthdate = new Date(document.getElementById("birthdate").value);
  var now = new Date();

  var ageYears = now.getFullYear() - birthdate.getFullYear();
  var ageMonths = now.getMonth() - birthdate.getMonth();
  var ageDays = now.getDate() - birthdate.getDate();

  // Check if the birth month and day have passed in the current year
  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths += 12;
  }
  
  if (days < 0 || (days === 0 && today.getHours() < birthDate.getHours())) {
        months--;
        days = days + daysInMonth(today.getMonth(),today.getFullYear()); 
    }


  // Adjust the number of days for varying month lengths
  var birthdateThisYear = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate());
  var daysDifference = Math.floor((now - birthdateThisYear) / (1000 * 60 * 60 * 24));
  var totalDays = daysDifference - (ageMonths * 30) - (ageYears * 365);

  // Display the age in the result div
  document.getElementById("result").innerHTML =
    "Your age is " +
    ageYears +
    " years, " +
    ageMonths +
    " months, and " +
    totalDays +
    " days.";
}

