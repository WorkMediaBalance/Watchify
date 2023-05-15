# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


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
    final_episode = models.IntegerField(blank=True, null=True)
    horizontial_img_path = models.CharField(max_length=255, blank=True, null=True)
    img_path = models.CharField(max_length=255, blank=True, null=True)
    rate = models.FloatField()
    release_date = models.IntegerField(blank=True, null=True)
    runtime = models.IntegerField()
    season = models.IntegerField(blank=True, null=True)
    summarize = models.CharField(max_length=5000, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)

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


class Genre(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genre'


class LikeContent(models.Model):
    id = models.BigAutoField(primary_key=True)
    is_deleted = models.BooleanField()  # This field type is a guess.
    is_like = models.BooleanField()  # This field type is a guess.
    content = models.ForeignKey(Content, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'like_content'


class Ott(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ott'


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


class Userott(models.Model):
    id = models.BigAutoField(primary_key=True)
    is_deleted = models.TextField()  # This field type is a guess.
    ott = models.ForeignKey(Ott, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'userott'


class WishContent(models.Model):
    id = models.BigAutoField(primary_key=True)
    is_deleted = models.TextField()  # This field type is a guess.
    content = models.ForeignKey(Content, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wish_content'
