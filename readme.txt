This is not a typical readme file. This contains explanations and reasoning of my choices rather than a typical readme file.
Test Cases Chosen to Automate: 

1.	A User is able to login
2.	Add & search for New User
3.	Add and search for new employee
4.	Create new employee/user and login with that user
5.	navigate to pages

My reason: I felt these are among the critical paths of the application
    What I dont like is that some of these tests cover more than one actualy testcase in one test case.
    Example: the Add New User + Search for New User. If I am able to add user through the API I would have structured these into two TCs:
        - Add New User through the UI    - Add New User through the API > Use User info to test the search for user

How did I structure the project:
Since this is only a demo project and the ask is to automate 5 TCs, I structured the project in the following way:
    - The test cases are all under one file which is the tests/smoke-tests
    - for each module that I needed from the app, I created a POM file to store the page objects as well as some methods that we will need in the test cases.
    - configuration are under .env file and playwright.config.ts file.

 My locator strategy was to identify each object as uniquely as possible in a way that those values dont change and break the tests.
 But I did face some difficulties as most of elements didnt have unique identifiers, hence in multiple places, I am idenfiying them using the .nth(countonpage). 
 I usually dont like that, as this is not very stable way, and would have prefered if unique ids are generated for the project's elements while in development, but when its not feasible, we have to do workarounds.

 Authentication was handled through the username/password stored in the .env file.
 Typically, I would add the .env file to the .gitignore file so that we dont share sensitive info, but since this is a demo project, I left the file in the repo, so that whoever try to execute the tests from my repo, they can do so with ease.

What would you do with another three hours? 
     I probably would ask for the API documentation to separate the test cases as I mentioned above.
n What did you find that was not in this brief?
     Clear expectations of how deep are we testing the app? So I did automate the top 5 cases I found to be business critical, but those were definitly not 4 hours worth of work 




Setup steps:
1. Clone the repo locally
2. install node.js
3. install playwright (with typescript): 
        npm init playwright@latest 
        follow on screen instructions
4. Run the tests: npx playwright test
5. View the results on the screen in the runner, or in the test-results folder
