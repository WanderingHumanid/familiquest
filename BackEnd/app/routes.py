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
    return jsonify({'message': 'User registered successfully!', 'user_id': user.id})

@main.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username'], role=data['role']).first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({
            'message': 'Login successful', 
            'user_id': user.id,
            'username': user.username,
            'role': user.role
        })
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@main.route('/api/quest', methods=['POST'])
def create_quest():
    data = request.get_json()
    difficulty_xp = {'Easy': 15, 'Medium': 30, 'Hard': 50}
    xp = difficulty_xp.get(data.get('difficulty', 'Easy'), 15)
    
    quest = Quest(
        title=data['title'], 
        description=data['description'], 
        xp=xp,
        difficulty=data.get('difficulty', 'Easy'),
        assigned_to=data['assigned_to']
    )
    db.session.add(quest)
    db.session.commit()
    return jsonify({'message': 'Quest created successfully!', 'quest_id': quest.id})

@main.route('/api/quests/<int:user_id>', methods=['GET'])
def get_quests(user_id):
    quests = Quest.query.filter_by(assigned_to=user_id).all()
    return jsonify([{
        'id': q.id,
        'title': q.title,
        'description': q.description,
        'xp': q.xp,
        'difficulty': q.difficulty,
        'completed': q.completed,
        'verified': q.verified
    } for q in quests])

@main.route('/api/quests', methods=['GET'])
def get_all_quests():
    quests = Quest.query.all()
    return jsonify([{
        'id': q.id,
        'title': q.title,
        'description': q.description,
        'xp': q.xp,
        'difficulty': q.difficulty,
        'completed': q.completed,
        'verified': q.verified,
        'assigned_to': q.assigned_to
    } for q in quests])

@main.route('/api/quests/<int:quest_id>/complete', methods=['PUT'])
def complete_quest(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    quest.completed = True
    # Don't award points yet - wait for parent verification
    
    db.session.commit()
    return jsonify({'message': 'Quest completed! Waiting for parent verification.'})

@main.route('/api/quests/<int:quest_id>/verify', methods=['PUT'])
def verify_quest(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    quest.verified = True
    
    # Award points only after verification
    user = User.query.get(quest.assigned_to)
    if user:
        user.xp += quest.xp
        user.points += quest.xp * 10
        user.streak += 1
        
        if user.xp >= 500:
            user.level = 4
        elif user.xp >= 250:
            user.level = 3
        elif user.xp >= 100:
            user.level = 2
        else:
            user.level = 1
    
    db.session.commit()
    return jsonify({'message': 'Quest verified! Points awarded.', 'xp_gained': quest.xp})

@main.route('/api/quests/<int:quest_id>/reject', methods=['PUT'])
def reject_quest(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    quest.completed = False  # Reset completion status
    quest.verified = False
    
    db.session.commit()
    return jsonify({'message': 'Quest rejected. Child needs to complete it again.'})

@main.route('/api/user/<int:user_id>/progress', methods=['GET'])
def get_user_progress(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'level': user.level,
        'xp': user.xp,
        'points': user.points,
        'streak': user.streak,
        'username': user.username,
        'role': user.role
    })

@main.route('/api/user/<int:user_id>/avatar', methods=['GET'])
def get_user_avatar(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'skin': user.avatar_skin,
        'hair': user.avatar_hair,
        'shirt': user.avatar_shirt,
        'accessory': user.avatar_accessory
    })

@main.route('/api/user/<int:user_id>/avatar', methods=['PUT'])
def update_user_avatar(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    user.avatar_skin = data.get('skin', user.avatar_skin)
    user.avatar_hair = data.get('hair', user.avatar_hair)
    user.avatar_shirt = data.get('shirt', user.avatar_shirt)
    user.avatar_accessory = data.get('accessory', user.avatar_accessory)
    
    db.session.commit()
    return jsonify({'message': 'Avatar updated successfully!'})

@main.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'role': user.role,
        'level': user.level,
        'xp': user.xp
    } for user in users])

@main.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    children = User.query.filter_by(role='child').order_by(User.xp.desc()).all()
    return jsonify([
        {
            'username': child.username,
            'xp': child.xp,
            'points': child.points,
            'level': child.level
        } for child in children
    ])