function calculateDays(start, end) {
	var count = 0;
	var current = new Date(start);

	while (current <= end) {
		count++;
		current.setDate(current.getDate() + 1);
	}

	return count - 1; // Subtracting 1 to exclude the end date
}

function getMilestone(age) {
	var milestoneRanges = {
		0: "Newborn",
		1: "Infant",
		2: "Toddler",
		4: "Child",
		13: "Teenager",
		20: "Young Adult",
		40: "Adult",
		65: "Senior",
	};

	var milestone = "Unknown";
	var keys = Object.keys(milestoneRanges);

	for (var i = 0; i < keys.length; i++) {
		if (age < keys[i]) {
			break;
		}
		milestone = milestoneRanges[keys[i]];
	}

	return milestone;
}

function showMilestones(years) {
	var milestoneClass = ".milestone-" + getMilestone(years);
	document.querySelector(milestoneClass).style.display = "block";
}


function animateNumber(targetNumber, duration) {
	const startingNumber = 0;
	const startTime = performance.now();
	const numberElement = document.getElementById(targetNumber);
	const numberElementValue = parseInt(numberElement.textContent, 10);

	function updateNumber(currentTime) {
		const elapsedTime = currentTime - startTime;
		if (elapsedTime >= duration) {
			// Animation finished
			numberElement.textContent = numberElementValue;
			return;
		}

		const progress = elapsedTime / duration;
		const logarithmicProgress = 1 - Math.pow(1 - progress, 4); // Adjust the power (4) for desired effect
		const currentNumber = Math.round(startingNumber + (numberElementValue - startingNumber) * logarithmicProgress);

		numberElement.textContent = currentNumber;

		// Request the next animation frame
		requestAnimationFrame(updateNumber);
	}

	// Start the animation
	requestAnimationFrame(updateNumber);
}

function printResults(years, months, days, ageInDays) {
	document.getElementById("result").innerHTML =
		"Your age is " +
		years +
		" years, " +
		months +
		" months, and " +
		days +
		" days.";
	document.getElementById("ageResultDays").innerHTML = ageInDays;
	showElement("ageResult");
	document.getElementById("milestones").innerHTML =
		"Your milestone is: " + getMilestone(years);

}

function showElement(elementId) {
	var element = document.getElementById(elementId);
	if (element) {
		element.style.display = "block";
	}
}

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


	printResults(years, months, days, ageInDays);
	animateNumber("ageResultDays", 3000);
	showMilestones(years);
}

document.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault();
	calculateAge();
});


