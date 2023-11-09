let teamMembers = [];

window.onload = function() {
  populateMemberSelect();
  loadTeamMembersFromLocalStorage();
};

function populateMemberSelect() {
  const select = document.getElementById('member-select');
  allMembers.forEach(member => {
    let option = new Option(member.name, member.name);
    select.add(option);
  });
}

function addSelectedMember() {
  const select = document.getElementById('member-select');
  const selectedMemberName = select.value;
  const selectedMember = allMembers.find(member => member.name === selectedMemberName);
  teamMembers.push(selectedMember);
  updateTeamList();
  updateTeamAverageDisplay();
  saveTeamMembersToLocalStorage();
}

function updateTeamList() {
  const teamListTable = document.getElementById('team-list');
  teamListTable.innerHTML = ''; // Clear the table before adding rows
  teamMembers.forEach((member, index) => {
    teamListTable.innerHTML += `<tr>
      <td class="vertical-text">${index + 1}. ${member.name}</td>
      <td>${member.averageIncrease}%</td>
      <td>$${member.averageSales.toLocaleString()}</td>
      <td><button onclick="removeMember(${index})">Remove</button></td>
    </tr>`;
  });
  updateTeamAverageDisplay(); // Update averages display
}

function removeMember(memberIndex) {
  teamMembers.splice(memberIndex, 1); // Remove the member from the array
  updateTeamList(); // Re-render the list display
  saveTeamMembersToLocalStorage(); // Save the updated team members list
}

function calculateTeamTotals() {
  let totalIncrease = teamMembers.reduce((acc, member) => acc + member.averageIncrease, 0);
  let totalSales = teamMembers.reduce((acc, member) => acc + member.averageSales, 0);
  return {
    averageIncrease: (totalIncrease / teamMembers.length) || 0,
    totalSales: totalSales || 0 // Calculate the total combined sales
  };
}

function updateTeamAverageDisplay() {
  let teamTotals = calculateTeamTotals();
  document.getElementById('member-count-display').textContent = teamMembers.length; // Display the member count
  document.getElementById('average-increase-display').textContent = teamTotals.averageIncrease.toFixed(2) + '%';
  document.getElementById('total-sales-display').textContent = '$' + teamTotals.totalSales.toFixed(0).toLocaleString();
}

function saveTeamMembersToLocalStorage() {
  localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
}

function loadTeamMembersFromLocalStorage() {
  const savedMembers = JSON.parse(localStorage.getItem('teamMembers'));
  if (savedMembers) {
    teamMembers = savedMembers;
    updateTeamList(); // Re-render the list with saved members
  }
}

function exportTeamMembers() {
  const teamMembersStr = teamMembers.map(member => `${member.name}, ${member.averageIncrease}%, $${member.averageSales}`).join('\n');
  const blob = new Blob([teamMembersStr], { type: 'text/plain' });
  const a = document.createElement('a');
  a.download = 'team-members.txt';
  a.href = URL.createObjectURL(blob);
  a.addEventListener('click', (e) => {
    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
  });
  a.click();
}


