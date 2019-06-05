
function retrieveStats() {
  postMessage(1);
  setTimeout("retrieveStats()",.5 * 1000);
}

retrieveStats();