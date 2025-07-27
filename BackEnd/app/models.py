from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), default='child')  # or 'parent'
    # Avatar customization
    avatar_skin = db.Column(db.String(20), default='#F9D3B4')
    avatar_hair = db.Column(db.String(20), default='#000')
    avatar_shirt = db.Column(db.String(20), default='#6C63FF')
    avatar_accessory = db.Column(db.String(50), default=None)
    # User progress
    level = db.Column(db.Integer, default=1)
    xp = db.Column(db.Integer, default=0)
    points = db.Column(db.Integer, default=0)
    streak = db.Column(db.Integer, default=0)

class Quest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.Text)
    xp = db.Column(db.Integer)
    difficulty = db.Column(db.String(20), default='Easy')  # Easy, Medium, Hard
    assigned_to = db.Column(db.Integer, db.ForeignKey('user.id'))
    completed = db.Column(db.Boolean, default=False)
    verified = db.Column(db.Boolean, default=False)  # Parent verification status