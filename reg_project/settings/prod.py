# pylint: disable=import-error
from reg_project.settings.common import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "%#-#7v826()-(rd1=dia!*j+$%r-f5@$-%t$d%*rn1gtrgxutl"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

CORS_ALLOW_CREDENTIALS = True

# change to app.example.com in production settings
CORS_ALLOWED_ORIGINS = [
    "http://dbhausen.pythonanywhere.com",
    "https://www.restreact.com",
]

CSRF_TRUSTED_ORIGINS = [
    "http://dbhausen.pythonanywhere.com",
    "https://www.restreact.com",
]

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "dbhausen$reg_db",
        "USER": "dbhausen",
        "PASSWORD": "fhKBdLR@u79Gdme",
        "HOST": "dbhausen.mysql.pythonanywhere-services.com",
    }
}
