// Add all the required import modules
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson/v2');
const datetime = require('node-datetime');

// Create/Define the conversion function
const convertToJson = (csvFileName = 'customer-data.csv', jsonFileName = 'customer-data.json') => {
    let startTime = datetime.create();
    console.log(`Convertion from CSV file ${csvFileName} to JSON file ${jsonFileName} started at ${startTime.format('m/d/Y H:M:S')}`);

    const converter = csv().fromFile(path.join(__dirname, csvFileName));

    // Write the JSON file
    converter.then((jsonData) => {
        fs.writeFileSync(path.join(__dirname, jsonFileName), JSON.stringify(jsonData, null, 2));
    })

    // Display any errors
    converter.on('error', (error) => {
        console.log(`The conversion failed with the following error: ${error}`);
        process.exit(1);
    })

    // Diaplsy the success message with timestamp
    converter.on('done', () => {
        let endTime = datetime.create();
        console.log(`Conversion completed successfully at ${endTime.format('m/d/Y H:M:S')}`);
    })
}

const verifyJSONFileWasCreated = (jsonFileName = 'customer-data.json') => {
    fs.readFile(path.join(__dirname, jsonFileName), { encoding: 'utf-8' }, function (error, data) {
        if (error) {
            console.log(`The JSON file could not be read due to the following error: ${error}`);
        }
        else {
            console.log(`The JSON file was created and a portion of the content is listed below:`);
            if (data.length > 100)
                console.log(data.substr(1, 100));
            console.log(`...\n\nProcess Completed`);
        }
    })
}

// Call the conversion function
convertToJson(process.argv[2], process.argv[3]);
// Verify and read the JSOn result file
verifyJSONFileWasCreated(process.argv[2]);