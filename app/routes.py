from flask import Blueprint, request, jsonify
from .models import User, Quest
from . import db

main = Blueprint('main', __name__)

@main.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    user = User(username=data['username'], password=data['password'], role=data['role'])
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