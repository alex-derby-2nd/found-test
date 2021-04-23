### How to run: 
#### install
`npm install`
#### serve (local)
`npm run server`                   
`npm run start`
#### serve(electron)
`npm run server`                   
`npm run start:electron`
#### unit tests
`npm run test`


### Brief overview:
 * This is a very simple contact list
 * On load user will retrieve the list of contacts and they will be displayed as they come from the backend
 * Each contact will be listed with their name, phone number and category
 * The user can alter and search for users in a number of ways
    - They can search using the search bar in the top left, this will search both first and last name
    - They can sort by first name or last name by clicking either of the radio buttons
    - They can sort by category through the dropdown
    - These filters are INCLUSIVE, meaning that you can refine your search using all 3 forms

 * The user can add a new contact by clicking on the 'New' button
    - This will bring up an overlay for the user to enter the information
    - There is basic validations for specific fields. The phone number is UK specific
    - Cancel will not create the contact
 * The user can also edit any contact by clicking on edit
    - This also brings up the overlay but with all the data prepopulated
    - Cancel will not update the contact
 * The user can delete any contact they wish

 ### My feedback/analysis:
* I decided to use a simple json-server to hold the data of the customers
    - This works well for basic data but if I were introduce images like I had planned, I would have had to flesh it out quite a bit more to handle image uploads
    - Would like introduce a basic node service or investigate if its easier with local storage using electron
    - This allows for 4 basic CRUD operations for the contacts
* I would have liked to spent more time with my design/styling
    - I dont normally use angular material at all really, but introduced it just to get some basic designs
    - Ideally I'd gut a lot of the skeleton text and make it a bit more user friendly
* The screens I use are 1920*1080
    - I would have liked to have spent more time making the application a little more responsive in terms of appearence
* This is the first time I have used electron
    - I had never touched electron before this project and it was interesting to learn
    - Although I do feel like I've barely scratched the service of it and intend to do some more digging in my spare time
* More testing is required
    - Ideally I'd have gotten more tests done and set up a report for coverage, however I did not want to spend a lot of time on those
    - I try to work my best with TDD and did so for the most part. Particularily with the filter pipe.
* The filter pipe has got a bit messy, ideally I'd refactor some of it down to more readable code



    

