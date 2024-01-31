document.addEventListener("DOMContentLoaded", function () {

  setTimeout(function () {
      document.getElementById("welcome-image").style.display = "none";
      document.getElementById("cpu-simulation-page").style.display = "block";
  }, 500);

  document.getElementById("simulateButton").addEventListener("click", function () {
      const algorithm = document.getElementById("algorithm").value;
      const burstTimes = generateBurstTimes();
      const averageWaitTime = simulateAlgorithm(algorithm, burstTimes);
      document.getElementById("algorithmHeading").textContent = `${algorithm.toUpperCase()} Algorithm`;
      document.getElementById("averageWaitTime").textContent = `Average Wait Time: ${averageWaitTime.toFixed(2)}`;

      
      // Display simulation table
      const tableBody = document.querySelector("#simulationTable tbody");
      tableBody.innerHTML = ""; // Clear previous data

      burstTimes.forEach((burstTime, index) => {
          const row = document.createElement("tr");
          const processIdCell = document.createElement("td");
          const burstTimeCell = document.createElement("td");
          const waitingTimeCell = document.createElement("td");

          processIdCell.textContent = `P${index + 1}`;
          burstTimeCell.textContent = burstTime;
          const waitingTime = calculateWaitingTime(index, burstTimes, algorithm);
          waitingTimeCell.textContent = waitingTime;

          row.appendChild(processIdCell);
          row.appendChild(burstTimeCell);
          row.appendChild(waitingTimeCell);
          tableBody.appendChild(row);
      });

      // Show the results block
      document.getElementById("results").style.display = "block";
  });
});

function generateBurstTimes() {
  // Define the burst times based on 221027 + 3 for each digit
  const studentNumber = "221027";
  const offset = 3;
  const burstTimes = studentNumber.split("").map(Number).map(digit => digit + offset);
  return burstTimes;
}

function simulateAlgorithm(algorithm, burstTimes) {
  // Implement the selected algorithm simulation logic here
  // Return the average wait time
  if (algorithm === "fcfs") {
      return fcfs(burstTimes);
  } else if (algorithm === "sjf") {
      return sjf(burstTimes);
  } else if (algorithm === "ljf") {
      return ljf(burstTimes);
  }
}

// First Come First Served (FCFS) algorithm
function fcfs(burstTimes) {
  const n = burstTimes.length;
  let waitTime = 0;
  let totalWaitTime = 0;

  for (let i = 0; i < n; i++) {
      totalWaitTime += waitTime;
      waitTime += burstTimes[i];
  }

  // Calculate and return the average wait time
  return totalWaitTime / n;
}

// Shortest Job First (SJF) algorithm
function sjf(burstTimes) {
  const n = burstTimes.length;
  let waitTime = 0;
  let totalWaitTime = 0;
  const sortedBurstTimes = [...burstTimes].sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
      totalWaitTime += waitTime;
      waitTime += sortedBurstTimes[i];
  }

  // Calculate and return the average wait time
  return totalWaitTime / n;
}

// Longest Job First (LJF) algorithm
function ljf(burstTimes) {
  const n = burstTimes.length;
  let waitTime = 0;
  let totalWaitTime = 0;
  const sortedBurstTimes = [...burstTimes].sort((a, b) => b - a);

  for (let i = 0; i < n; i++) {
      totalWaitTime += waitTime;
      waitTime += sortedBurstTimes[i];
  }

  // Calculate and return the average wait time
  return totalWaitTime / n;
}

function generateProcesses() {
// Generate processes with arrival times and burst times based on student number 221027 + 3 for each digit
const studentNumber = "221027";
const offset = 3;
const processes = studentNumber.split("").map(Number).map((digit, index) => ({
arrivalTime: index * 2,
burstTime: digit + offset,
}));

// Add an additional process for the last digit
processes.push({
arrivalTime: (studentNumber.length - 1) * 2,
burstTime: parseInt(studentNumber.charAt(studentNumber.length - 1)) + offset,
});

return processes; // Return the generated processes
}
// Calculate the waiting time for a process based on the selected algorithm
function calculateWaitingTime(processIndex, burstTimes, algorithm) {
  if (algorithm === "fcfs") {
      return calculateFCFSWaitingTime(processIndex, burstTimes);
  } else if (algorithm === "sjf") {
      return calculateSJFWaitingTime(processIndex, burstTimes);
  } else if (algorithm === "ljf") {
      return calculateLJFWaitingTime(processIndex, burstTimes);
  }
}

// Helper function to calculate waiting time for FCFS algorithm
function calculateFCFSWaitingTime(processIndex, burstTimes) {
  let waitTime = 0;
  for (let i = 0; i < processIndex; i++) {
      waitTime += burstTimes[i];
  }
  return waitTime;
}

// Helper function to calculate waiting time for SJF algorithm
function calculateSJFWaitingTime(processIndex, burstTimes) {
  const sortedBurstTimes = [...burstTimes].sort((a, b) => a - b);
  let waitTime = 0;
  for (let i = 0; i < processIndex; i++) {
      waitTime += sortedBurstTimes[i];
  }
  return waitTime;
}

// Helper function to calculate waiting time for LJF algorithm
function calculateLJFWaitingTime(processIndex, burstTimes) {
  const sortedBurstTimes = [...burstTimes].sort((a, b) => b - a);
  let waitTime = 0;
  for (let i = 0; i < processIndex; i++) {
      waitTime += sortedBurstTimes[i];
  }
  return waitTime;
}