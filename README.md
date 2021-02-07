# getJPY

Demo Link: https://lily-getjpy.au.meteorapp.com/  
(it may take a while to load since it's a free service for test purpose)  
  
  
This project has only one function:  
Click "Get JPY" button and it will download the latest Japanese exchange rate as .txt from the Bank of Taiwan.  

* [Client Side](https://github.com/LilyChan/getJPY/blob/master/imports/ui/pages/Landing.jsx):  
  button onclick triggers the method call, will wait till the data is returned.  
  use filesaver to download the generated blob text file.
  ```javascript
  download(){
    Meteor.call('getJPYrate', function(err, res) {
      if (err) {
        swal( 'Oops...', '取得資料失敗，請稍後再試！', 'error' );
      }
      if (res) {
          const data = new Blob([res], {type: "text/plain;charset=utf-8"});
          saveAs(data, moment().format('YYYYMMDD_日幣匯率')+'.txt');
      }
    });
  }
  ```

* [Server Side](https://github.com/LilyChan/getJPY/blob/master/imports/api/ExchangeRate.js):  
  use http call to get the csv file from the bank as a string, parse the string and return the formatted string to the client
  ```javascript
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
  ```
  
> This project use the template from [meteor-application-template-react](https://ics-software-engineering.github.io/meteor-application-template-react/) for quick set up
