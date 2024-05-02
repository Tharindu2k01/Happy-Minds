# flask-api
* **Emotion Detection Flask API**
    * Open the project emotion-recognition (Code -> flask-api -> emotion-recognition)
    * Install the required libraries using `pip`.
        * Flask - `pip install -U Flask`
        * numpy - `pip install numpy`
        * tenserflow - `pip install --user --upgrade tensorflow`
        * Pillow - `pip install Pillow==2.2.1`
        * Flask Cors - `pip install Flask-Cors`
        * gunicorn - `pip install gunicorn`
    * Download the pretrained model from : https://drive.google.com/file/d/1trPbUpfoVFMxssZxMPorqMbIekbnxhI4/view?usp=sharing
    * Place the model inside the app folder. (Code -> flask-api -> emotion-recognition -> app)
    * After successfully installing the dependencies run the API with `python wsgi.py`
