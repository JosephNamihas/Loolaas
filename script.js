document.addEventListener('DOMContentLoaded', loadLogs);

        function addLog() {
            const logTime = document.getElementById('logTime').value; // Creates a variable called logtime, which is assigned to the logTime element in the HTML - <input type="datetime-local" id="logTime" required>
            const logStatus = document.getElementById('logStatus').value; // 

            if (logTime && logStatus) { // If logTime & logStatus has been filled in / selected.
                const logList = document.getElementById('logList'); 
                const logItem = document.createElement('li');
                logItem.className = `log-item ${logStatus}`;
                logItem.innerHTML = ` 
                    <span>${new Date(logTime).toLocaleString()}</span>
                    <span>${logStatus.charAt(0).toUpperCase() + logStatus.slice(1)}</span>
                `;
                // logItem (li) inner HTML includes the content of the list element
                logList.appendChild(logItem); // Places the logItem data into the logList - <ul class="logs" id="logList"></ul>

                saveLog(logTime, logStatus); // Runs the function to save to local storage
                document.getElementById('logForm').reset();
            }
        }

        function saveLog(time, status) {
            const logs = JSON.parse(localStorage.getItem('logs')) || [];
            logs.push({ time, status });
            localStorage.setItem('logs', JSON.stringify(logs));
        }

        function loadLogs() {
            const logs = JSON.parse(localStorage.getItem('logs')) || [];
            const logList = document.getElementById('logList');
            logs.forEach(log => {
                const logItem = document.createElement('li');
                logItem.className = `log-item ${log.status}`;
                logItem.innerHTML = `
                    <span>${new Date(log.time).toLocaleString()}</span>
                    <span>${log.status.charAt(0).toUpperCase() + log.status.slice(1)}</span>
                `;
                logList.appendChild(logItem);
            });
        }
