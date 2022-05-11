# TicketsBooking

CREATING VIRTUAL EENVIRONMENT:
-----------------------------
pip3 install virtualenv
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

movie-id, name
seat-id,name,movie_id

get seats based on theatre and timing 

movie-id
theatre-id,name

show_details- id,movie_id(FK),theatre_id(FK),show_timing
seat-  id,name,show_details_id(FK)

select * from show_details where movie_id=1 & theatre_id=3  (get available show timings)
select * from seat where show_details_id=1 (new one)
select * from seat where movie_id=1 (old one)


table 
<!-- theatre- id,name
show-id,time(string) -->
<!-- seats-theatre_id(FK),show_id(FK) -->
In seats API add condition in existing filter(seats.theatre_id==something && seats.show_id==something)----
add seats,theatre,show using create API
make ticket printable