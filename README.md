# emailsys
# Open Frontend Folder
# type below Commands
npm install
####
npm start
# Open Backend Folder on Another Window/Tab
# in backend>settings.py file enter your mail-id  credentials in place of "EMAIL_HOST_USER" and "EMAIL_HOST_PASSWORD" (from this maild id only mail will be send and also you need to change privacy mailid settings to allow third parties  from browser)
# type below Commands
python -m pip install -r requirements.txt
cd backend
python manage.py makemigrations'
python manage.py migrate
# Now Create a Super User 
# Note : only super user will access the email sending functions
# type below Commands
python manage.py createsuper 
# then run
python manage.py runserver
# Project Will Start

