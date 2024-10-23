"""Script to create a Flask API for the model."""
import sys
import joblib
from flask import Flask, request, jsonify
import keras
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from nltk import pos_tag, word_tokenize
import nltk


sys.stdout.reconfigure(encoding='utf-8')

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

app = Flask(__name__)


# function to add POS TAGS to text
def add_pos(text):
    """Adds POS tags to the text
    Args: 
        text: str
    Returns:
        str: text with POS tags
    """
    # tokenization
    tokens = word_tokenize(text)
    # obtain tags
    pos_tags = pos_tag(tokens)
    tags = [x[1] for x in pos_tags]
    
    # add tags
    pos_added_tokens = ['_'.join(item) for item in list(zip(tokens, tags))]
    
    # join to single string
    pos_text = ' '.join(pos_added_tokens)
    
    return pos_text


@app.route('/api/detect', methods=['POST'])
def detect():
    """Predicts if text is ai generated or not."""
    # load model
    model = tf.keras.models.load_model('api/model.h5')    
    
    # vectorizer
    with open('api/vectorizer.pkl', 'rb') as f:
        vectorizer = joblib.load(f)
        
    # get data
    data = request.get_json(force=True)
    text = data['text'].encode('utf-8').decode('utf-8')
    
    # add pos tags
    text = add_pos(text)
    
    # vectorize
    text_vectorized = vectorizer.transform([text])
    
    # predict
    prediction = model.predict(text_vectorized[0])[0]
    print(prediction)
    
    result = 0 if prediction < 0.5 else 1
    
    return jsonify({'prediction': int(result)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)