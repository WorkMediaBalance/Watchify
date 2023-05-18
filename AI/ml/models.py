# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Calender(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateField(blank=True, null=True)
    is_deleted = models.TextField()  # This field type is a guess.
    is_view = models.TextField()  # This field type is a guess.
    view_date = models.DateField(blank=True, null=True)
    ott = models.ForeignKey('Ott', models.DO_NOTHING, blank=True, null=True)
    turn_content = models.ForeignKey('TurnContent', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calender'


class Content(models.Model):
    id = models.BigAutoField(primary_key=True)
    audience_age = models.IntegerField()
    backdrop_path = models.CharField(max_length=255, blank=True, null=True)
    final_episode = models.IntegerField(blank=True, null=True)
    img_path = models.CharField(max_length=255, blank=True, null=True)
    rate = models.FloatField()
    release_date = models.IntegerField(blank=True, null=True)
    runtime = models.IntegerField()
    season = models.IntegerField(blank=True, null=True)
    summarize = models.CharField(max_length=5000, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    popularity = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'content'


class ContentGenre(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.ForeignKey(Content, models.DO_NOTHING, blank=True, null=True)
    genre = models.ForeignKey('Genre', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'content_genre'


class Contentott(models.Model):
    id = models.BigAutoField(primary_key=True)
    ott_url = models.CharField(max_length=255, blank=True, null=True)
    content = models.ForeignKey(Content, models.DO_NOTHING, blank=True, null=True)
    ott = models.ForeignKey('Ott', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'contentott'


class Day(models.Model):
    id = models.BigAutoField(primary_key=True)
    day = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'day'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Genre(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genre'


class LikeContent(models.Model):
    id = models.BigAutoField(primary_key=True)
    is_deleted = models.TextField()  # This field type is a guess.
    like = models.FloatField(blank=True, null=True)
    content = models.ForeignKey(Content, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
    is_like = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'like_content'


class Ott(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ott'


class RankingContent(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.ForeignKey(Content, models.DO_NOTHING, blank=True, null=True)
    ott = models.ForeignKey(Ott, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ranking_content'


class ScheduleShare(models.Model):
    id = models.BigAutoField(primary_key=True)
    schedule = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'schedule_share'


class TurnContent(models.Model):
    id = models.BigAutoField(primary_key=True)
    episode = models.IntegerField()
    content = models.ForeignKey(Content, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'turn_content'


class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    age = models.IntegerField()
    email = models.CharField(max_length=255, blank=True, null=True)
    gender = models.TextField()  # This field type is a guess.
    img_name = models.CharField(max_length=255, blank=True, null=True)
    img_path = models.CharField(max_length=255, blank=True, null=True)
    is_content_alarm = models.TextField()  # This field type is a guess.
    is_deleted = models.TextField()  # This field type is a guess.
    is_ott_alarm = models.TextField()  # This field type is a guess.
    name = models.CharField(max_length=255, blank=True, null=True)
    nick_name = models.CharField(max_length=255, blank=True, null=True)
    provider = models.CharField(max_length=255, blank=True, null=True)
    fcm_token = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'


class UserDay(models.Model):
    id = models.BigAutoField(primary_key=True)
    time = models.IntegerField()
    day = models.ForeignKey(Day, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_day'


class UserViewingStatus(models.Model):
    id = models.BigAutoField(primary_key=True)
    is_deleted = models.TextField()  # This field type is a guess.
    turn_content = models.ForeignKey(TurnContent, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_viewing_status'


class Userott(models.Model):
    id = models.BigAutoField(primary_key=True)
    end = models.DateField(blank=True, null=True)
    is_deleted = models.TextField()  # This field type is a guess.
    is_overed = models.TextField()  # This field type is a guess.
    start = models.DateField(blank=True, null=True)
    ott = models.ForeignKey(Ott, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'userott'


class WishContent(models.Model):
    id = models.BigAutoField(primary_key=True)
    is_deleted = models.TextField()  # This field type is a guess.
    updated_at = models.DateTimeField(blank=True, null=True)
    content = models.ForeignKey(Content, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wish_content'
