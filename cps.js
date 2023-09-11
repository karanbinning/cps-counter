document.addEventListener('DOMContentLoaded', function() {
    let clickCount = 0;
    let startTime;
    let maxCPS = 10; // Adjust this value to set your desired maximum CPS
    let maxConsistentCPS = 12; // Adjust this value based on what you consider a suspiciously consistent CPS

    const clickButton = document.getElementById('clickButton');
    const cpsDisplay = document.getElementById('cpsDisplay');

    let lastCPS = 0;
    let consistentCounts = 0;

    function handleClick() {
        if (!startTime) {
            startTime = Date.now();
            enableButton(false);
            setTimeout(function() {
                enableButton(true);
            }, 1000);
        }

        clickCount++;

        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) / 1000;

        if (elapsedTime >= 1) {
            const cps = clickCount / elapsedTime;
            cpsDisplay.textContent = cps.toFixed(2);
            clickCount = 0;
            startTime = currentTime;

            if (cps >= maxConsistentCPS) {
                consistentCounts++;
                if (consistentCounts >= 3) {
                    handlePotentialAutoClicker();
                }
            } else {
                lastCPS = cps;
                consistentCounts = 0;
            }
        }

        if (clickCount >= maxCPS) {
            enableButton(false);
            setTimeout(function() {
                enableButton(true);
            }, 1000);
        }
    }

    function handlePotentialAutoClicker() {
        // Implement action for potential auto-clicker
        alert("Cheating detected. You are using an auto-clicker.");
    }

    function enableButton(enable) {
        clickButton.disabled = !enable;
        if (enable) {
            clickButton.style.backgroundColor = '#007bff';
        } else {
            clickButton.style.backgroundColor = '#ccc';
        }
    }

    clickButton.addEventListener('click', handleClick);
});
