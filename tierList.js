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

function toggleVisibility(memberName) {
    const memberDetails = document.getElementById(`details-${memberName}`);
    const toggleButton = document.getElementById(`toggle-${memberName}`);

    if (memberDetails.style.display === 'none') {
        memberDetails.style.display = 'block';
        toggleButton.textContent = 'Hide Details'; // Change button text to 'Hide Details'
    } else {
        memberDetails.style.display = 'none';
        toggleButton.textContent = 'Show Details'; // Change button text to 'Show Details'
    }
}


function displayTierList() {
    const tierListContainer = document.getElementById('tier-list-container');
    tierListContainer.innerHTML = ''; // Clear the container before adding new elements

    // Create tier sections
    const tiers = { 'S': [], 'A': [], 'B': [], 'C': [], 'D': [], 'E': [] }; // Add 'E' tier if needed

    allMembers.forEach(member => {
        tiers[member.tier].push(member);
    });

    // Create HTML for each tier
    Object.keys(tiers).forEach(tier => {
        const tierDiv = document.createElement('div');
        tierDiv.className = `tier tier-${tier}`;
        tierDiv.innerHTML = `<div class="tier-header">Tier ${tier}</div>`;
        
        tiers[tier].forEach(member => {
            tierDiv.innerHTML += `
                <div class="tier-member" id="member-${member.name.replace(/\s+/g, '-')}" >
                    <span class="member-name">${member.name}</span>
                    <div id="details-${member.name.replace(/\s+/g, '-')}" class="member-details">
                        <span class="member-increase">Avg Increase: ${member.averageIncrease.toFixed(2)}%</span>
                        <span class="member-sales">Avg Sales: $${member.averageSales.toLocaleString()}</span>
                    </div>
                    <button id="toggle-${member.name.replace(/\s+/g, '-')}" onclick="toggleVisibility('${member.name.replace(/\s+/g, '-')}')"
                        class="hide-button">Hide Details</button>
                </div>
            `;
        });

        tierListContainer.appendChild(tierDiv);
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
