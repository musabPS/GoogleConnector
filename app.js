const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const express =require("express")
const app = express()


app.get("/",function(req,res){
  res.send("iisjisj");
})

app.listen(process.env.PORT || 5000);
module.exports=app

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
// function listMajors(auth) {
//       // [START sheets_batch_get_values]
//       let ranges = ["Sheet1!A2:G5"];
//       spreadsheetId='1reF3_J-sRwmgZy8S_falrzDoY8RJRTW1W-9QwppgUIQ'

//   const sheets = google.sheets({version: 'v4', auth});
//   sheets.spreadsheets.values.batchGet({
//     spreadsheetId,
//     ranges,
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const rows = res.data.valueRanges;
//     console.log(' rows ' + res.data.valueRanges[0]);
//     if (rows.length) {
//       console.log('Name, Major:',);
//       // Print columns A and E, which correspond to indices 0 and 4.
//       rows.map((row) => {
//         console.log(`${row}`);
//       });
//     } else {
//       console.log('No data found.');
//     }
//   });
// }

function listMajors(auth) 
{
    // [START sheets_batch_get_values]
    let values = [["Tran Internalid7","Tran Number","Item","Item Name","Quantity","Vendor Accept Quantity","Expected Receipt Date"],["22162","PO140154CM","730","6 Drawer Desk","5","2","9/28/2021"],["22162","PO140154CM","731","Blackberry PlayBook","1","2","9/29/2021"],["22162","PO140154CM","816","BLACK SESAME OIL","5","2","9/30/2021"],["22162","PO140154CM","751","Calculators","20","2","10/1/2021"],["22162","PO140154CM","707","Designer Chair","1","2","10/2/2021"],["22162","PO140154CM","702","Custom Cushions","5","2","10/3/2021"],["22162","PO140154CM","726","Drawer Runners","1","2","10/4/2021"],["22162","PO140154CM","739","12 Pack Ball Point Pens","25","2","10/5/2021"],["22162","PO140154CM","654","Custom HP Media Home Server","9","2","10/6/2021"]];
    let range='Sheet1!A1:G100'
    valueInputOption= 'USER_ENTERED'
    const data = [{
      range,
      values,
    }];
    // Additional ranges to update ...
    const resource = {
      data,
      valueInputOption,
    };
    
    let ranges = ["Sheet1!A2:G7"];
    spreadsheetId='1reF3_J-sRwmgZy8S_falrzDoY8RJRTW1W-9QwppgUIQ'

  const sheets = google.sheets({version: 'v4', auth});
  

  sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    resource,
  }, (err, result) => {
  if (err) return console.log('The API returned an error: ' + err);
  const rows = result.data.valueRanges;
  console.log(' rows ' + result);
  if (rows.length) {
    console.log('Name, Major:',);
    // Print columns A and E, which correspond to indices 0 and 4.
    rows.map((row) => {
      console.log(`${row}`);
    });
  } else {
    console.log('No data found.');
  }
  });
}


//CONSUMER KEY / CLIENT ID
//a00aa59a331a17fb8e80b0c19f1fc670059d88b9515820f56cf075599363032c
//CONSUMER SECRET / CLIENT SECRET
//2b25e96ffe13ea48e93f2efb06b0e7d2eb7b417fd3a3a84c68fbd5a393b2f6c6
//TOKEN ID
//////6aa795846f7c09f0389b64ee9c09b7a094ec7122ba1f7dc84bbd6dbe3ab1cee3
//TOKEN SECRET
//2e4c10d0f4f04b4677dd622bbe30febd095445b4c3be6e76cae6674ca8491014