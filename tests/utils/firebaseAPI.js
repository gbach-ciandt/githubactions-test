require('dotenv').config();

const admin = require('firebase-admin')
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sleep = require('./sleep')

if (!process.env.APP_ID || !process.env.PROJECT_ID || !process.env.FIREBASE_SERVICE_JSON) {
    throw new Error("Missing required environment variables");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_JSON)
const appID = process.env.APP_ID
const projectID = process.env.PROJECT_ID

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

async function setDirectory(directory, outputDirectory) {
    if (fs.existsSync(directory)) {
        fs.rmSync(directory, { recursive: true, force: true }); 
        console.log(`Cleaned up directory: ${directory}`);
    }  
    await sleep(500)
    fs.mkdirSync(outputDirectory, { recursive: true });
    console.log(`Created directory: ${outputDirectory}`);
}

async function getAccessToken() {
    const clientEmail = serviceAccount.client_email;
    const privateKey = serviceAccount.private_key
        .replace(/\\n/g, '\n');
    const jwt = require('jsonwebtoken');

    const token = jwt.sign(
        {
            iss: clientEmail,
            scope: 'https://www.googleapis.com/auth/cloud-platform',
            aud: 'https://oauth2.googleapis.com/token',
            exp: Math.floor(Date.now() / 1000) + 3600, 
        },
        privateKey,
        { algorithm: 'RS256' }
    );
    //
    const response = await axios.post('https://oauth2.googleapis.com/token', {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
    });
    return response.data.access_token;
}

async function downloadAPK(country) {
    const accessToken = await getAccessToken();
    const outputMainDir = './app';
    const outputDirectory = `./app/${country}`; 
    const apkFileName = 'dominos-android.apk';

    await setDirectory(outputMainDir, outputDirectory)

    const response = await axios.get(`https://firebaseappdistribution.googleapis.com/v1/projects/${projectID}/apps/${appID}/releases?orderBy=createTime desc&pageSize=1`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    console.log("apk: ", response.data)

    let release = "";
    if (response.data.releases.length === 0) {
        console.log('No releases found.');
        return;
    }
   
    release = response.data.releases[0].binaryDownloadUri;
    
    console.log('downloading binary file....')
    let apkResponse;
    try {
        apkResponse = await axios.get(release, {
            responseType: 'stream',
        });
    }catch(err){
        throw new Error("download apk failed!");
    }
    console.log('teste: ', apkResponse)

    const outputPath = path.join(outputDirectory, apkFileName);
    const writer = fs.createWriteStream(outputPath);
    
    apkResponse.data.pipe(writer);
    console.log('apkResponse.data.pipe(writer);')
    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            console.log(`APK downloaded successfully at: ${outputPath}`);
            resolve();
        });
        writer.on('error', (err) => {
            console.error('Error downloading APK:', err);
            reject(err);
        });
    });
}

module.exports = {
    downloadAPK,
};