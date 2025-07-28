const fs = require('fs');
const path = require('path');
const spainData = require("../data/spainCredentials.json")
const spainDataPath = path.join(__dirname, "../data/spainCredentials.json");

function generateRandomPassword(length) {
    if (length < 4) {
        throw new Error("Password length should be at least 4 characters.");
    }

    const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const numberCharacters = '0123456789';
    const symbolCharacters = '@#$%&*_?';

    const passwordArray = [
        upperCaseCharacters.charAt(Math.floor(Math.random() * upperCaseCharacters.length)),
        lowerCaseCharacters.charAt(Math.floor(Math.random() * lowerCaseCharacters.length)),
        numberCharacters.charAt(Math.floor(Math.random() * numberCharacters.length)),
        symbolCharacters.charAt(Math.floor(Math.random() * symbolCharacters.length))
    ];

    const allCharacters = upperCaseCharacters + lowerCaseCharacters + numberCharacters + symbolCharacters;

    for (let i = 4; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        passwordArray.push(allCharacters.charAt(randomIndex));
    }

    return passwordArray.sort(() => 0.5 - Math.random()).join('');
}

function updateCredentialsJSON(newpassword) {
    spainData.mainCredential.password = String(newpassword)

    fs.writeFile(spainDataPath, JSON.stringify(spainData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }
        console.log('Password updated successfully!');
    });
    
}

module.exports = {
    generateRandomPassword,
    updateCredentialsJSON,
};
