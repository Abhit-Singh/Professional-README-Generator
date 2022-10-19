// TODO: Include packages needed for this application

const inquirer = require ('inquirer');
const fs = require ('fs');
const generateMarkdown = require ('./utils/generateMarkdown.js');



// TODO: Create an array of questions for user input
const questions = [
    {
        name: 'title',
        type: 'input',
        message: "Please enter your project's title :",
        validate: userTitle =>{
            if (!userTitle){
                console.log('[ERROR] Title cannot be empty !!!');
                return false;
            }
            return true;
        }
    },
    {
        name: 'description',
        type: 'input',
        message: 'Please enter a description for your project :',
        validate: userDescription =>{
            if (!userDescription){
                console.log('[ERROR] Description cannot be empty !!!');
                return false;
            }
            return true;
        }
    },
    {
        name: 'install',
        type: 'input',
        message: 'Please list install directions :',
        validate: userInstall => {
            if (!userInstall){
                console.log('[ERROR] Install directions cannot be empty !!!');
                return false;
            }
            return true;
        }
    },
    {
        name: 'usage',
        type: 'input',
        message: 'Please enter usage information for your project :',
        validate: usageInput => {
            if (!usageInput){
                console.log('[ERROR] Usage details cannot be empty !!!');
                return false;
            }
            return true;
        }
    },
    {
        name: 'contribute',
        type: 'input',
        message: 'Please enter contribution guidelines for your project :',
        validate: userContribute => {
            if (!userContribute){
                console.log('[ERROR] Contribution cannot be empty !!!');
                return false;
            } 
            return true;
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please enter instructions for testing for your project:',
        validate: testInput => {
            if (!testInput){
                console.log('[ERROR] Contribution cannot be empty !!!');
                return false;
            }
            return true;
        }
    },
    {
        name: 'license',
        type: 'list',
        message: 'Please select a license option for your project:',
        choices: ['Apache 2.0 License', 'Boost Software License 1.0', 'BSD 3-Clause License', 'BSD 2-Clause License', 'GNU GPL v3', 'GNU GPL v2', 'GNU AGPL v3', 'GNU LGPL v3', 'The MIT License', 'The Unlicense'],
        validate: userLicense => {
            if (!userLicense) {
                console.log('[ERROR] License cannot be empty !!!');
                return false;
            }
            return true;
        }
    },
    {
        name: 'github',
        type: 'input',
        message: 'Please enter your github user :',
        validate: userGit => {
            if (!userGit) {
                console.log('[ERROR] Contribution cannot be empty !!!');
                return false;
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email address :',
        validate: userEmail => {
            if (!userEmail) {
                console.log('[ERROR] Contribution cannot be empty !!!');
                return false;
            }
            return true;
        }
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve,reject)=>{
        if (!fs.existsSync("./build")){
            fs.mkdirSync("./build");
        }
        fs.writeFileSync('./build/'+fileName,data,error => {
            if(error){
                reject(error);
                return;
            }
            else{
                console.log('File generated! Check the build folder for output!')
                resolve({
                    ok: true,
                    message: 'File created'
                })
            }
        })
    })
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then(answers =>{
        console.log("generating your files.")
        return generateMarkdown(answers);
    })
    .then(data =>{
        return writeToFile("README.md",data);
        
    })
    .catch((error) =>{
        if (error.isTtyError) {
            console.log("Invalid OS... !?")
            throw error;
        } else {
            throw error;
        }
    })
}

// Function call to initialize app
init();
