
from datetime import datetime
from flask import Flask, request, jsonify,session
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS,cross_origin
from sqlalchemy import ForeignKey, ForeignKeyConstraint, PrimaryKeyConstraint, true
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
cors = CORS(app)
app.config['SECRET_KEY'] = '!9m@S-dThyIlW[pHQbN^'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db = SQLAlchemy(app)

class Seats(db.Model):

    _tablename_ = 'seats'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    price=db.Column(db.Float)
    occupied=db.Column(db.Boolean,default=False,nullable=False)
    selected_users=db.Column(db.Integer)
    movie_id=db.Column(db.Integer,ForeignKey('movie.id'))
    theatre_id=db.Column(db.Integer,ForeignKey('theatre.id'))
    show_id=db.Column(db.Integer,ForeignKey('show.id'))

    def __init__(self, name,price,occupied,selected_users,movie_id,theatre_id, show_id):
        self.name = name
        self.price=price
        self.occupied=occupied
        self.selected_users=selected_users
        self.movie_id=movie_id
        self.theatre_id=theatre_id
        self.show_id=show_id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price":self.price,
            "occupied":self.occupied,
            "selected_users":self.selected_users,
            "movie_id":self.movie_id,
            "theatre_id":self.theatre_id,
            "show_id":self.show_id

            }


class User(db.Model):

    _tablename_ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(15))
    username = db.Column(db.String(15))
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(256), unique=True)
    

    def __init__(self,name,username,email,password):
        self.name = name
        self.username=username
        self.email=email
        self.password=password


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "username":self.username,
            "email":self.email
            }

class Slot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    available = db.Column(db.Integer,unique=True)
    user=db.Column(db.Integer)

    def __init__(self,available,user):
        self.available= available
        self.user=user

    def serialize(self):
        return {
            "id": self.id,
            "available": self.available,
            "user":self.user,
            }   


class Movie(db.Model):
    _tablename_ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
   

    def __init__(self,name):
        self.name=name
       

    def serialize(self):
        return {
            "id":self.id,
            "name":self.name,
           
            }  

class Ticket(db.Model):
    _tablename_ = 'ticket'
    id = db.Column(db.Integer, primary_key=True)
    seat_id = db.Column(db.Integer,ForeignKey('seats.id'))
    user_id = db.Column(db.Integer,ForeignKey('seats.selected_users'))
    movie_id = db.Column(db.Integer,ForeignKey('seats.movie_id'))
    # movie_name=db.Column(db.String(50),ForeignKey('movies.name'), nullable=False)

    def __init__(self,id,seat_id,user_id,movie_id):
        self.id=id,
        self.seat_id=seat_id,
        self.user_id=user_id,
        self.movie_id=movie_id,
        # self.movie_name=movie_name

    def serialize(self):
        return {
            "id":self.id,
            "seat_id":self.seat_id,
            "user_id":self.user_id,
            "movie_id":self.movie_id,
            # "movie_name":self.movie_name
            }  

class History(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(80))
    email=db.Column(db.String(80))
    seats=db.Column(db.String(80))
    price=db.Column(db.Integer)
    date=db.Column(db.String(80))

    def __init__(self,name,email,seats,price,date):
        self.name=name
        self.email=email
        self.seats=seats
        self.price=price
        self.date=date
       

    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "email":self.email,
            "seats":self.seats,
            "price":self.price,
            "date":self.date

            }  

class Theatre(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    tname=db.Column(db.String(80))

    def __init__(self,tname):
        self.tname=tname
    
    def serialize(self):
        return{
            "id":self.id,
            "tname":self.tname
        }



class Show(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    time=db.Column(db.String(80))

    def __init__(self,time):
        self.time=time
    
    def serialize(self):
        return{
            "id":self.id,
            "time":self.time
        }

        
        



@app.route('/block', methods=['GET'])
@cross_origin()
def islot():
    return jsonify({'slots': list(map(lambda slot: slot.serialize(), Slot.query.all()))})

@app.route('/block',methods=["POST"])
@cross_origin()
def block_seats():
    if not request.json:
        return jsonify({"status": 400, "message": "Bad Request"})
    available = request.json['available']
    user=request.json['user']
    seat = Seats.query.get(available)
    seat.occupied=request.json['occupied']
    db.session.commit()
    seats=Slot(available,user)
    db.session.add(seats)
    db.session.commit()
    return jsonify({'slots': list(map(lambda slot: slot.serialize(), Slot.query.all()))})

@app.route('/delete',methods=["POST"])
@cross_origin()
def delete():
     available = request.json['available']
     seat = Seats.query.get(available)
     seat.occupied=request.json['occupied']
     db.session.commit()
     db.session.query(Slot).filter(Slot.available==available).delete()   
     db.session.commit()
     return jsonify({"status": 200, "message": "updated"})

# Seats Routes
@app.route('/seats', methods=['GET'])
@cross_origin()
def index():
    return jsonify({'seats': list(map(lambda seat: seat.serialize(), Seats.query.all()))})

# Seats Routes
@app.route('/seats/movieId/<int:movieId>', methods=['GET'])
@cross_origin()
def getSeatsByMovieId(movieId):
    
    return jsonify({'seats': list(map(lambda seat: seat.serialize(), Seats.query.filter(Seats.movie_id==movieId )))})
   
def getSeatsListOfDict(listOfseats):
    seatsListOfdict = []
    for seat in listOfseats:
        seatsListOfdict.append(seat.serialize())

@app.route('/seats/movieId/<int:movieId>/theatreid/<int:theatreId>/showid/<int:showid>', methods=['GET'])
@cross_origin()
# def getSeatsByMovieId(movieId,theatreid,showid):
def getSeats(movieId,theatreId,showid):
    return jsonify({'seats': list(map(lambda seat: seat.serialize(), Seats.query.filter(Seats.movie_id==movieId , Seats.theatre_id==theatreId , Seats.show_id==showid )))})
        # In seats API add condition in existing filter(seats.theatre_id==something && seats.show_id==something)
    # /seats/movieId/<int:movieId>/theatreid/<int:movieId>/showid/<int:movieId>
    # path variable
    # return jsonify({'seats': list(map(lambda seat: seat.serialize(), Seats.query.filter(Seats.movie_id==movieId)))})

# @app.route('/seats', methods=['POST'])
# @cross_origin()
# def create_seats():
#     if not request.json or not 'name' in request.json:
#         return jsonify({"status": 400, "message": "Bad Request"})
#     name = request.json['name']
#     price=request.json['price']
#     occupied=request.json['occupied']
#     selected_users=request.json['selected_users']
#     movie_id=request.json['movie_selected']
#     seats=Seats(name,price,occupied,selected_users,movie_id)
#     db.session.add(seats)
#     db.session.commit()
#     return jsonify({'seats': seats.serialize()}), 201

@app.route('/seats', methods=['POST'])
@cross_origin()
def create_seats():
    if not request.json or not 'name' in request.json:
        return jsonify({"status": 400, "message": "Bad Request"})
    name = request.json['name']
    price=request.json['price']
    occupied=request.json['occupied']
    selected_users=request.json['selected_users']
    movie_id=request.json['movie_selected']
    theatre_id=request.json['theatre_id']
    show_id=request.json['show_id']
    seats=Seats(name,price,occupied,selected_users,movie_id,theatre_id,show_id)
    db.session.add(seats)
    db.session.commit()
    return jsonify({'seats': seats.serialize()}), 201




# @app.route('/update/<int:id>', methods=['POST'])
# @cross_origin()
# def update_seats(id):
#             seat = Seats.query.get(id)
#             seat.occupied=request.json.get('occupied',seat.occupied)
#             seat.selected_users=request.json.get('user',seat.selected_users)
#             db.session.commit()
#             db.session.query(Slot).delete()
#             db.session.commit()
#             return jsonify({'seat': seat.serialize()})

#update route 
@app.route('/update/<int:id>', methods=['POST'])
@cross_origin()
def update_seats(id):
            seat = Seats.query.get(id)
            if seat.selected_users==0:
                seat.occupied=request.json.get('occupied',seat.occupied)
                seat.selected_users=request.json.get('user',seat.selected_users)
                db.session.commit()
                db.session.query(Slot).filter(Slot.user==seat.selected_users).delete() 
                db.session.commit()
                # name=request.json['name']
                # email=request.json['email']
                # seats=request.json['seat']
                # price=request.json['price1']
                # date=datetime.today()
                # order=History(name,email,seats,price,date)
                # db.session.add(order)
                # db.session.commit()
                return jsonify({"status":200,"message":"reserved successfully"})
            else:
                return jsonify({"status": 400, "message": "seats already booked"})


@app.route('/order',methods=['POST'])
@cross_origin()
def push():
    name=request.json['name']
    email=request.json['email']
    seats=request.json['seat']
    price=request.json['price1']
    date=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    order=History(name,email,seats,price,date)
    db.session.add(order)
    db.session.commit()
    return jsonify({"status":200,"message":"reserved successfully"})


 #User routes
@app.route('/register/', methods = ['POST'])
@cross_origin()
def register():

    if request.method == 'POST' :
        hashed_password = generate_password_hash(request.json['password'], method='sha256')
        new_user = User(
            name = request.json['name'], 
            username = request.json['username'] ,
            email = request.json['email'] ,
            password = hashed_password )
        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'user': new_user.serialize()}), 201
        except:
             return jsonify({"status": 400,
                        "message": "Failure to add user details.This may occur due to duplicate entry of userdetails"})


@app.route('/login/', methods = ['POST'])
@cross_origin()
def login():
    if request.method == 'POST' :
        # checking that user is exist or not by email
        user = User.query.filter_by(email = request.json['email']).first()
        if user:
            # if user exist in database than we will compare our database hased password and password come from login form 
            if check_password_hash(user.password, request.json['password']):
                # if password is matched, allow user to access and save email and username inside the session
                session['logged_in'] = True
                session['email'] = user.email 
                session['username'] = user.username
                return jsonify({'user': user.serialize(),'message':"login Successful","flag2":"true"}), 201
            else:
                # if password is in correct , redirect to login page
                return jsonify({"message": "user password wrong", "status": 400})
        else:
            return jsonify({"message": "user details doesnt exist", "status": 400,"flag2":"false"})

# movie routes
@app.route('/movies', methods=['GET'])
@cross_origin()
def movie():
    return jsonify({'movies': list(map(lambda movies: movies.serialize(), Movie.query.all()))})

# @app.route('/movies/<string:time>', methods=['GET'])
# @cross_origin()
# def moviebyTime(time):
#      return jsonify({'movies': list(map(lambda movies: movies.serialize(), Movie.query.filter(Movie.time==time)))})

# def getmoviebyTime(movieTime):
#     ListOfmovie = []
#     for movie in movieTime:
#         ListOfmovie.append(movie.serialize())


@app.route('/movies', methods=['POST'])
@cross_origin()
def create_movie():
    name = request.json['movie_name']
    movies=Movie(name)

    db.session.add(movies)
    db.session.commit()
    return jsonify({'movies': movies.serialize()}), 201

@app.route('/theatre', methods=['GET'])
@cross_origin()
def theatre():
    return jsonify({'theatre': list(map(lambda theatre: theatre.serialize(), Theatre.query.all()))})


@app.route('/theatre', methods=['POST'])
@cross_origin()
def create_theatre():
    name = request.json['theatre_name']
    theatre=Theatre(name)

    db.session.add(theatre)
    db.session.commit()
    return jsonify({'movies': theatre.serialize()}), 201

@app.route('/show', methods=['GET'])
@cross_origin()
def show():
    return jsonify({'show': list(map(lambda show: show.serialize(), Show.query.all()))})


@app.route('/show', methods=['POST'])
@cross_origin()
def create_show():
    time = request.json['time']
    show=Show(time)

    db.session.add(show)
    db.session.commit()
    return jsonify({'show': show.serialize()}), 201

@app.route('/history',methods=['POST'])
@cross_origin()
def history():
    # name=request.json['name']
    # email=request.json['email']
    # seats=request.json['seats']
    # price=request.json['price']
    # date=datetime.today()
    # order=History(name,email,seats,price,date)
    # db.session.add(order)
    # db.session.commit()
    # return jsonify({'history': order.serialize()}), 201
     user = User.query.filter_by(email = request.json['email'])
     if user:
         return jsonify({'user': user.serialize()})
     else:
         return jsonify({"message":"You Don't seem to have any recent bookings", "status": 400}) 


@app.route('/history', methods=['GET'])
@cross_origin()
def order():
    return jsonify({'history': list(map(lambda seat: seat.serialize(), History.query.all()))}),200


if __name__=="__main__":
    db.create_all()
    app.run(debug=True)

