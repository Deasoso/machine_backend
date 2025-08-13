const schedule = require('node-schedule');

exports.initTimeoutJobs = async function initTimeoutJobs() {
  // schedule.scheduleJob('* * * * * *', () => { // this guy calls cron
  //   searchVoice()
  //     .then()
  //     .catch(error => {
  //       console.log('error in searchvoice'); // eslint-disable-line no-console
  //       console.error(error); // eslint-disable-line no-console
  //     });
  // });
  return true;
};