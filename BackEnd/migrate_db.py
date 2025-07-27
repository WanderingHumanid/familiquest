from app import create_app, db
from app.models import Quest

def migrate_database():
    app = create_app()
    with app.app_context():
        # Add assigned_by column if it doesn't exist
        try:
            # For existing quests, we'll set assigned_by to the first parent user found
            # In a real production environment, you'd want to handle this more carefully
            from app.models import User
            parent_user = User.query.filter_by(role='parent').first()
            
            if parent_user:
                # Update existing quests to have assigned_by set to the first parent
                Quest.query.update({Quest.assigned_by: parent_user.id})
                db.session.commit()
                print(f"Updated existing quests to be assigned by parent ID: {parent_user.id}")
            else:
                print("No parent users found. Please create a parent user first.")
                
        except Exception as e:
            print(f"Migration error: {e}")
            db.session.rollback()

if __name__ == '__main__':
    migrate_database() 