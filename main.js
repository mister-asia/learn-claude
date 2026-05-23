import { updateClock } from './utils/updateClock.js';

function main() {
    updateClock();
    setInterval(updateClock, 1000);
}

document.addEventListener('DOMContentLoaded', main);
