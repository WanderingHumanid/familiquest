from werkzeug.security import generate_password_hash, check_password_hash
from flask import Blueprint, request, jsonify
from .models import User, Quest
from . import db

main = Blueprint('main', __name__)
@main.route('/')
def home():
    return jsonify({'message': 'FamiliQuest Backend is running'})
@main.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'])
    user = User(username=data['username'], password=hashed_password, role=data['role'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'})

@main.route('/api/quest', methods=['POST'])
def create_quest():
    data = request.get_json()
    quest = Quest(title=data['title'], description=data['description'], xp=data['xp'], assigned_to=data['assigned_to'])
    db.session.add(quest)
    db.session.commit()
    return jsonify({'message': 'Quest created successfully!'})

@main.route('/api/quests/<int:user_id>', methods=['GET'])
def get_quests(user_id):
    quests = Quest.query.filter_by(assigned_to=user_id).all()
    return jsonify([{
        'id': q.id,
        'title': q.title,
        'description': q.description,
        'xp': q.xp,
        'completed': q.completed
    } for q in quests])
@main.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username'], role=data['role']).first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login successful', 'user_id': user.id})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
