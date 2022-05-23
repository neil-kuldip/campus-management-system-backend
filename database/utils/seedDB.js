const { Campus, Student } = require('../models');  // Import database models

// Seed database
const seedDB = async () => {
	// Create a new campus
	const dummy_campus = await Campus.create({
		name: "Hunter College",
		address: "695 Park Ave, New York, NY 10065",
		description: "This is a school in New York, New York.",
		imageUrl: "https://www.dropbox.com/s/xr3ou5tm20k3vsf/building_avatar.png?dl=0"
	});
	// Create a new campus
	const dummy_campus2 = await Campus.create({
		name: "Queens College",
		address: "65-30 Kissena Blvd, Queens, NY 11367",
		description: "This is a school in Queens, New York.",
		imageUrl: "https://www.dropbox.com/s/xr3ou5tm20k3vsf/building_avatar.png?dl=0"
	});
	// Create a new campus
	const dummy_campus3 = await Campus.create({
		name: "Brooklyn College",
		address: "2900 Bedford Ave, Brooklyn, NY 11210",
		description: "This is a school in Brooklyn, New York.",
		imageUrl: "https://www.dropbox.com/s/xr3ou5tm20k3vsf/building_avatar.png?dl=0"
	});
	
	// Create a new student for a campus
	const dummy_student = await Student.create({
	  	firstname: "Joe",
      	lastname: "Smith",
		email: "jsmith12@myhunter.cuny.edu",
		gpa: 3.87
	});
	// Create a new student for a campus
	const dummy_student2 = await Student.create({
		firstname: "Mary",
      	lastname: "Johnson",
		email: "mjohnson34@qc.cuny.edu",
		gpa: 2.54
	});

	const dummy_student3 = await Student.create({
		firstname: "Donald",
      	lastname: "Glover",
		email: "dglover76@bcmail.cuny.edu",
		gpa: 3.45
	});

	// Add students to campuses
	await dummy_student.setCampus(dummy_campus);
	await dummy_student2.setCampus(dummy_campus2);
	await dummy_student3.setCampus(dummy_campus3);
}

// Export the database seeding function
module.exports = seedDB;