
function retrieveStats() {
  postMessage(1);
  setTimeout("retrieveStats()",500);
}

retrieveStats();