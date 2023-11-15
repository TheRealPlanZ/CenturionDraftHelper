// tierList.js

// Assume that allMembers is populated by membersArray.js
// and membersArray.js is included before tierList.js in your tier-list.html

function assignTiersToMembers() {
    // Sort allMembers by averageIncrease for tier assignment
    allMembers.sort((a, b) => b.averageIncrease - a.averageIncrease);
  
    // Assign tiers based on the sorted members
    const totalMembers = allMembers.length;
    allMembers.forEach((member, index) => {
        if (index < totalMembers * 0.2) {
            member.tier = 'S'; // Top 20% are 'God Tier'
        } else if (index < totalMembers * 0.4) {
            member.tier = 'A'; // Next 20% are 'G.O.A.T'
        } else if (index < totalMembers * 0.6) {
            member.tier = 'B'; // Middle 20% are 'Average Joe's Dodgeball Team'
        } else if (index < totalMembers * 0.8) {
            member.tier = 'C'; // Next 20% are 'Hides during event'
        } else {
            member.tier = 'D'; // Bottom 20% are 'Dog Water'
        }
    });
}

function displayTierList() {
    const tierListContainer = document.getElementById('tier-list-container');
    tierListContainer.innerHTML = ''; // Clear the container before adding new elements

    allMembers.forEach((member, index) => {
        const memberElement = document.createElement('div');
        memberElement.className = 'tier-list-member';
        memberElement.innerHTML = `
            <span class="member-name">${member.name}</span>
            <span class="member-tier">Tier: ${member.tier}</span>
            <span class="member-increase">Avg Increase: ${member.averageIncrease.toFixed(2)}%</span>
            <span class="member-sales">Avg Sales: $${member.averageSales.toLocaleString()}</span>
            <button onclick="addMemberToTeam('${member.name}')">Add to Team</button>
        `;
        tierListContainer.appendChild(memberElement);
    });
}


// Add member to team function (you might need to modify this for your needs)
function addMemberToTeam(memberName) {
    // This function would need to communicate with the main page or store the data in localStorage
    console.log(memberName + ' added to the team'); // Placeholder action
}

window.onload = function() {
    assignTiersToMembers();
    displayTierList();
};
