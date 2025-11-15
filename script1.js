const schools = [
  {
    // New: Added unique schoolId
    schoolId: "NRB01", 
    name: "Langata West Primary",
    students: 1899,
    teacherDeficit: 60000,
    funds: "KSh 60,000,000"
  },
  {
    // New: Added unique schoolId
    schoolId: "NRB02",
    name: "Kibera Primary",
    students: 2450,
    teacherDeficit: 60000,
    funds: "KSh 42,000,000"
  },
  {
    // New: Added unique schoolId
    schoolId: "NRB03",
    name: "Kilimani Primary",
    students: 1320,
    teacherDeficit: 60000,
    funds: "KSh 30,000,000"
  },
   {
    // New: Added unique schoolId
    schoolId: "NRB04",
    name: "Kahawa Primary",
    students: 1110,
    teacherDeficit: 60000,
    funds: "KSh 30,000,000"
  },
   {
    // New: Added unique schoolId
    schoolId: "NRB05",
    name: "Muthaiga Primary",
    students: 1223,
    teacherDeficit: 60000,
    funds: "KSh 30,000,000"
  },
];

const container = document.getElementById("schoolContainer");
const searchBox = document.getElementById("searchBox");

// Function modified to handle showing/hiding the container
function displaySchools(list) {
  container.innerHTML = "";
  
  if (list.length === 0) {
    // Optionally display a message if the list is empty (e.g., at startup or no results)
    container.innerHTML = "<p>Please enter a School Name or ID to search.</p>";
    container.style.display = 'block'; // Ensure the container is visible for the message
  } else {
    list.forEach(school => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${school.name} <span class="school-id">(${school.schoolId})</span></h3>
        <p><strong>Students:</strong> ${school.students.toLocaleString()} pupils</p>
        <p><strong>Teacher Deficit:</strong> ${school.teacherDeficit.toLocaleString()} teachers (national)</p>
        <p><strong>Funds Allocated:</strong> ${school.funds}</p>
      `;
      container.appendChild(card);
    });
    container.style.display = 'grid'; // Or 'block', depending on your desired layout
  }
}

searchBox.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  
  // If the search box is empty, don't show any schools
  if (term.length === 0) {
    displaySchools([]); // Show the "Please search" message or just clear the cards
    return;
  }
  
  const filtered = schools.filter(s => 
    s.name.toLowerCase().includes(term) || s.schoolId.toLowerCase().includes(term)
  );
  
  displaySchools(filtered);
});

// ❌ REMOVE the original initial call: displaySchools(schools);

// New: Call once to display the initial empty message.
