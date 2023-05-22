function calculateAge() {
  var birthdate = new Date(document.getElementById("birthdate").value);
  var now = new Date();

  var years = now.getFullYear() - birthdate.getFullYear();
  var months = now.getMonth() - birthdate.getMonth();
  var days = now.getDate() - birthdate.getDate();
  var ageMessage = "";

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

var milestoneRanges = [
    { milestone: "Newborn", minAge: 0, maxAge: 1 },
    { milestone: "Infant", minAge: 1, maxAge: 2 },
    { milestone: "Toddler", minAge: 2, maxAge: 4 },
    { milestone: "Child", minAge: 4, maxAge: 13 },
    { milestone: "Teenager", minAge: 13, maxAge: 20 },
    { milestone: "Young Adult", minAge: 20, maxAge: 40 },
    { milestone: "Adult", minAge: 40, maxAge: 65 },
    { milestone: "Senior", minAge: 65, maxAge: Infinity },
  ];

  for (var i = 0; i < milestoneRanges.length; i++) {
    var milestoneRange = milestoneRanges[i];
    if (years >= milestoneRange.minAge && years < milestoneRange.maxAge) {
      ageMessage = milestoneRange.milestone;
      break;
    }
  }

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
    " days)." + "Your milestone is: " + ageMessage;

function calculateDays(start, end) {
  var count = 0;
  var current = new Date(start);

  while (current <= end) {
    count++;
    current.setDate(current.getDate() + 1);
  }

  return count - 1; // Subtracting 1 to exclude the end date
}
}

document.querySelector("form").addEventListener("submit", function(event) {
      event.preventDefault();
      //var birthdate = document.getElementById("birthdate").value;
      //var age = getAge(birthdate);
      //var ageResult = document.getElementById("ageResult");
      calculateAge();
      //ageResult.innerHTML = "You are " + age.years + " years old. Your milestone is: " + age.milestone;
    });

/*function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var years = today.getFullYear() - birthDate.getFullYear();
  var months = today.getMonth() - birthDate.getMonth();
  var days = today.getDate() - birthDate.getDate();
  var ageMessage = "";

  // Calculate milestone age ranges
  var milestoneRanges = [
    { milestone: "Newborn", minAge: 0, maxAge: 1 },
    { milestone: "Infant", minAge: 1, maxAge: 2 },
    { milestone: "Toddler", minAge: 2, maxAge: 4 },
    { milestone: "Child", minAge: 4, maxAge: 13 },
    { milestone: "Teenager", minAge: 13, maxAge: 20 },
    { milestone: "Young Adult", minAge: 20, maxAge: 40 },
    { milestone: "Adult", minAge: 40, maxAge: 65 },
    { milestone: "Senior", minAge: 65, maxAge: Infinity },
  ];

  // Find the corresponding milestone for the age range
  for (var i = 0; i < milestoneRanges.length; i++) {
    var milestoneRange = milestoneRanges[i];
    if (years >= milestoneRange.minAge && years < milestoneRange.maxAge) {
      ageMessage = milestoneRange.milestone;
      break;
    }
  }

  return {
    years: years,
    months: months,
    days: days,
    milestone: ageMessage,
  };
}

document.querySelector("form").addEventListener("submit", function(event) {
      event.preventDefault();
      var birthdate = document.getElementById("birthdate").value;
      var age = getAge(birthdate);
      var ageResult = document.getElementById("ageResult");
      calculateAge();
      //ageResult.innerHTML = "You are " + age.years + " years old. Your milestone is: " + age.milestone;
    });

*/
