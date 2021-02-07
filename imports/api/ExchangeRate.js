import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'getJPYrate'(){
    if (Meteor.isServer) {
      const uri = `https://rate.bot.com.tw/xrt/flcsv/0/day`;
      try {
        const res = HTTP.call("GET", uri, {timeout: 30000});
        const rows = res.content.split('\r\n');
        const title = rows[0].split(',');
        const data = rows[8].split(',');

        const formatData = new Array(4);
        for (let i=0; i<4; i++) {
          formatData[i] = `${title[i]} : ${data[i]}`;
        }
 
        return formatData.join('\r\n');
      } catch (err){
          throw new Meteor.Error(504, 'connection errors!');
      }
    }
  }
});