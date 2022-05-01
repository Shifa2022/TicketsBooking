# TicketsBooking

CREATING VIRTUAL ENVIRONMENT:
-----------------------------
pip3 install virtualenv

python -m virtualenv "name"

activating virtualenv:
---------------------
source "name"/bin/activate ---- for mac 

deactivate virtualenv:
-----------------------
deactivate

TO THE RUN THE DB:
--------------------
in terminal type python3

python terminal opens

type the following commands

import db from index

db.create_all()

            or 

if mentioned in the code (created the db )

then just run the python file

TO CREATE THE REACT APP FOR THE FRONT END:
-------------------------------------------
in the folder type 

npx create-react app client

TO run the react app:
---------------------
cd client 

npm start

DATA IS SENT THROUGH POSTMAN:
-----------------------------
IT IS IN THE FORM :
    {
       
      "name": "1A", 
      "occupied": false, 
      "price": 100.0,
      "selected_users":0
    }

FILE STRUCTURE:
---------------
index.py--- has the API AND DB 

client--- has the frontend react app
