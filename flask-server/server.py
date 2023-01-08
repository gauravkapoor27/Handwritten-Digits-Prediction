from flask import Flask, request, make_response, jsonify, Response
import base64
import flask_cors as cors
import json
from PIL import Image
import io
import numpy as np
import pickle

# load the model using pickle
# model = pickle.load(open('./flask-server/model.pkl', 'rb'))
with open('./flask-server/my_model.pkl', 'rb') as f:
    model = pickle.load(f)


# app = Flask(__name__)
# cors.CORS(app, resources={r"/*": {"origins": "*"}})


# @app.route('/process-image', methods=['POST'])
# def process_image():
#     data = request.get_json()
#     imageData = data["image"].split(",")[1]
#     imageBytes = base64.b64decode(imageData)
#     image = Image.open(io.BytesIO(imageBytes))

#     image = image.resize(
#         (8, 8), resample=Image.LANCZOS)

#     imageArray = np.asarray(image)

#     imageArray = np.array([x.T for x in imageArray])
#     imageArray = np.array([x[3] for x in imageArray])*(16/255)
#     imageArray = imageArray.reshape(1, 64)

#     # print(imageArray)

#     # print(imageVector)

#     # image.save("image.png")

#     res = model.predict(imageArray)
#     print(res)

#     return jsonify('success')


# if __name__ == '__main__':
#     app.run(port=5555, debug=True, use_reloader=True)
