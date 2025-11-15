const schools = [
  {
    name: "Langata West Primary",
    students: 1899,
    teacherDeficit: 60000,
    funds: "KSh 60,000,000"
  },
  {
    name: "Kibera Primary",
    students: 2450,
    teacherDeficit: 60000,
    funds: "KSh 42,000,000"
  },
  {
    name: "Kilimani Primary",
    students: 1320,
    teacherDeficit: 60000,
    funds: "KSh 30,000,000"
  }
];

const container = document.getElementById("schoolContainer");
const searchBox = document.getElementById("searchBox");

function displaySchools(list) {
  container.innerHTML = "";
  list.forEach(school => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${school.name}</h3>
      <p><strong>Students:</strong> ${school.students.toLocaleString()} pupils</p>
      <p><strong>Teacher Deficit:</strong> ${school.teacherDeficit.toLocaleString()} teachers (national)</p>
      <p><strong>Funds Allocated:</strong> ${school.funds}</p>
    `;
    container.appendChild(card);
  });
}

searchBox.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = schools.filter(s => s.name.toLowerCase().includes(term));
  displaySchools(filtered);
});

displaySchools(schools);
