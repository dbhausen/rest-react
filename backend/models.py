from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator
from django.db import models


class Message(models.Model):
    date = models.DateTimeField(null=False, auto_now_add=True)
    text = models.TextField(null=False, default="left blank")
    approved = models.BooleanField(null=False, default=False)
    category = models.CharField(null=False, max_length=30, default="unassigned")


class Junk(models.Model):
    my_char = models.CharField(null=True, max_length=30)
    mydate = models.DateField(null=True)
    mydatetime = models.DateTimeField(null=True)
    myint = models.IntegerField(null=True)
    mydecimal = models.DecimalField(null=True, decimal_places=3, max_digits=10)
    myboolean = models.BooleanField(null=True)
    myemail = models.EmailField(null=True)
    myfloat = models.FloatField(null=True)


class FirstNameLook(models.Model):
    givenName = models.CharField(null=False, unique=True, max_length=30)
    gender = models.CharField(null=False, max_length=30)
    recentCount = models.IntegerField(null=False)
    rank = models.IntegerField(null=False)
    minRange = models.IntegerField(null=False)
    maxRange = models.IntegerField(null=False)


class LastNameLook(models.Model):
    surName = models.CharField(null=False, unique=True, max_length=30)
    recentCount = models.IntegerField(null=False)
    rank = models.IntegerField(null=False)
    minRange = models.IntegerField(null=False)
    maxRange = models.IntegerField(null=False)


class CustomUser(AbstractUser):
    # Any extra fields would go here
    def __str__(self):
        return self.email


class Department(models.Model):
    name = models.CharField(max_length=30, unique=True)


class Major(models.Model):
    department = models.ForeignKey(to=Department, on_delete=models.PROTECT)
    name = models.CharField(max_length=30)


class Student(models.Model):
    FRESHMAN = "FR"
    SOPHOMORE = "SO"
    JUNIOR = "JR"
    SENIOR = "SR"
    GRADUATE = "GR"
    YEAR_IN_SCHOOL_CHOICES = [
        (FRESHMAN, "Freshman"),
        (SOPHOMORE, "Sophomore"),
        (JUNIOR, "Junior"),
        (SENIOR, "Senior"),
        (GRADUATE, "Graduate"),
    ]
    user = models.ForeignKey(to=CustomUser, on_delete=models.PROTECT)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    major = models.ForeignKey(
        to=Major,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    year_in_school = models.CharField(
        max_length=2,
        choices=YEAR_IN_SCHOOL_CHOICES,
        default=FRESHMAN,
    )

    def is_upperclass(self):
        return self.year_in_school in {self.JUNIOR, self.SENIOR}


class Teacher(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    department = models.CharField(max_length=30)


class Room(models.Model):
    location = models.CharField(max_length=10)
    capacity = models.PositiveIntegerField()


def validate_start(self):
    pass


class ClassSession(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.PROTECT)
    room = models.ForeignKey(Room, on_delete=models.PROTECT)
    start_time = models.TimeField(null=True, validators=[validate_start])
    duration = models.PositiveIntegerField(
        default=1, validators=[MaxValueValidator(3, "Limit three hours")]
    )
    upper_class_only = models.BooleanField(default=False)
    majors_only = models.BooleanField(default=False)
    students = models.ManyToManyField(to=Student)

    # check if class has reached capacity

    def is_full(self):
        pass

    # check of student is already in a class for this time

    def is_time_conflict(self, candidate):
        pass

    # check of student meets year_in_school limit

    def is_student_upper_conflict(self, candidate):
        pass

    # check of student meets major limit

    def is_student_major_conflict(self, candidate):
        pass

    # do all checks to see if student can be added to class session

    def is_student_ok_to_join(self, canditate):
        pass


class ClassSessionDays(models.Model):
    class Days(models.IntegerChoices):
        MONDAY = 1
        TUESDAY = 2
        WEDNESDAY = 3
        THURSDAY = 4
        FRIDAY = 5
        SATURDAY = 6

    class_session = models.ForeignKey(to=ClassSession, on_delete=models.PROTECT)
    day = models.IntegerField(choices=Days.choices, unique=True)
