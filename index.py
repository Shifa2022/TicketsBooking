
from flask import Flask, request, jsonify,session
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS,cross_origin
from sqlalchemy import true
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
cors = CORS(app)
app.config['SECRET_KEY'] = '!9m@S-dThyIlW[pHQbN^'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db = SQLAlchemy(app)

class Seats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    price=db.Column(db.Float)
    occupied=db.Column(db.Boolean,default=False,nullable=False)
    selected_users=db.Column(db.Integer)

    def __init__(self, name,price,occupied,selected_users):
        self.name = name
        self.price=price
        self.occupied=occupied
        self.selected_users=selected_users

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price":self.price,
            "occupied":self.occupied,
            "selected_users":self.selected_users
            }

class User(db.Model):

    _tablename_ = 'usertable'
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

@app.route('/seats', methods=['POST'])
@cross_origin()
def create_seats():
    if not request.json or not 'name' in request.json:
        return jsonify({"status": 400, "message": "Bad Request"})
    name = request.json['name']
    price=request.json['price']
    occupied=request.json['occupied']
    selected_users=request.json['selected_users']
    seats=Seats(name,price,occupied,selected_users)
    db.session.add(seats)
    db.session.commit()
    return jsonify({'seats': seats.serialize()}), 201


@app.route('/update/<int:id>', methods=['POST'])
@cross_origin()
def update_seats(id):
            seat = Seats.query.get(id)
            seat.occupied=request.json.get('occupied',seat.occupied)
            seat.selected_users=request.json.get('user',seat.selected_users)
            db.session.commit()
            db.session.query(Slot).delete()
            db.session.commit()
            return jsonify({'seat': seat.serialize()})
       


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


if __name__=="__main__":
    db.create_all()
    app.run(debug=True)

