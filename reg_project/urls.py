from backend import views
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

## note that all REACT paths point to the template_name="index.html"
## routing is handled by REACT from that point. When you add a new REACT rout
## it must be added here also for it to work in "production" mode.
## This is not needed when you are in "development" mode and serving the
## static content from the npm server on http://localhost:3000/
## Also, if you re running in "production" mode from http://127.0.0.1:8000/ or
## "http://dbhausen.pythonanywhere.com/" you will need to execute:
## "npm run build" and "py manage.py collectstatic" to see
## changes made to the REACT components

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/users/", include("backend.urls")),
    path("api/message/", views.MessageListView.as_view()),
    path("api/", views.JunkListView.as_view()),
    path("api/firstname/", views.FirstNameListView.as_view()),
    path("api/lastname/", views.LastNameListView.as_view()),
    path("api/update/<int:pk>", views.JunkUpdateView.as_view()),
    path("csrf/", views.csrf),
    path("ping/", views.ping),
    path("", TemplateView.as_view(template_name="index.html")),
    path("rest_form/", TemplateView.as_view(template_name="index.html")),
    path("rest_grid/", TemplateView.as_view(template_name="index.html")),
    path("read_file/", TemplateView.as_view(template_name="index.html")),
    path("random_names/", TemplateView.as_view(template_name="index.html")),
    path("a/", TemplateView.as_view(template_name="index.html")),
]
