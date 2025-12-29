from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def test_user_creation(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass')
        self.assertEqual(user.email, 'test@example.com')

    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(team.name, 'Test Team')

    def test_activity_creation(self):
        user = User.objects.create_user(username='activityuser', email='activity@example.com', password='testpass')
        activity = Activity.objects.create(user=user, type='run', duration=10)
        self.assertEqual(activity.type, 'run')

    def test_leaderboard_creation(self):
        user = User.objects.create_user(username='leaderuser', email='leader@example.com', password='testpass')
        leaderboard = Leaderboard.objects.create(user=user, score=50)
        self.assertEqual(leaderboard.score, 50)

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Test Workout', description='Test Desc')
        self.assertEqual(workout.name, 'Test Workout')
