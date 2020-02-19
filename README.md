# Haiku.js

Sometimes, coding in Javascript can be stressful, we get it. Promises, Prototypes, JSON, who knows what they mean (not us). We here at Haiku.js think we can make it better with some poetry.

Preferably in three lines of five, seven, and five.

## Set Up

Make sure that you have python3 and flask installed

```bash
sudo pip3 install flask
sudo pip3 install nltk
sudo pip3 install requests
sudo pip3 install bs4
```

You may need to do some additional work to get nltk working.

In a terminal window run:

```bash
python3

>>> 
import nltk
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('cmudict')
```

Then to run the flask services run

```bash
export FLASK_APP=main
flask run
```

Open up templates>index.html in your favorite browser to start writing some poetry!

<hr/>

Made for HackTX 2019
