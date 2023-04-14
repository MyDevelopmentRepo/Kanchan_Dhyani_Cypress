# Kanchan_Dhyani_playwright

Instructions on how to run the tests:

Prerequisites:

1. Node.js should be installed
2. Visual Studio code should be installed
3. Chrome browser should be installed

Steps:

1. Clone the repo in your local machine

2. Open the cloned project in VS code.(File-> Add Folder to workspace)

3. Open command line terminal in VS code (Right Click on the project folder -> Open in integrated terminal)

4. Run the command : npm install
   This would install all the dependencies specified in package.json file

5. To install cypres, run command : npm install cypress --save-dev

6. To install mailosaur, run command : npm install cypress-mailosaur --save-dev

   Mailosaur is used for E2E testing for email verification.
   Please refer to this link for more details : https://mailosaur.com/docs/frameworks-and-tools/cypress/

7. Ensure that the project/Task/copySettingFromUser used in fixtures/testData.json, exist in the system else put
   the values which does exist in the system.(This part could be automated however as its test data, it is assumed that
   it will be present already.)

To run the project:

npx cypress run --headed --browser chrome
OR
Another way to run the tests is to open cypress runner and run the test through GUI.
The command for that is :
npx cypress open
