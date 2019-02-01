Seperate repos for each part of site so expect some load time when accessing the backend in addition to the initial frontend wakeup on Heroku.

Backend URL: https://brian-lambda-notes.herokuapp.com/

Backend Github: https://github.com/BrianARuff/Lambda_Notes_Backend

FE URL: https://brian-lambda-notes-fe.herokuapp.com/

FE Github: https://github.com/BrianARuff/lambda-notes-frontend



Guide - Lambda Notes API - How to

--GET All Notes--
  - https://brian-lambda-notes.herokuapp.com/api/users/notes
  - Note, you must be authenticated with user account to view notes
  
 
--POST New Note--
  - https://brian-lambda-notes.herokuapp.com/api/users/notes
  - Note object must include title, textBody, and user_id for it to properly post
  
-- GET All Users --
  - http://localhost:3333/api/users/mailingList
  - only includes email and usernames...passwords are never sent or received outside of registration or logging in.
  
-- POST Registration
  - http://localhost:3333/api/users/register
  - email, password, and username is required
  - return a JWT and user object

-- POST Login
  - http://localhost:3333/api/users/login
  - email and password required
  - return a JWT and user object
