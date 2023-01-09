from flask import Flask, request, jsonify
import base64
import flask_cors as cors
from PIL import Image
import io
import numpy as np
from keras.models import load_model

cnnModel = load_model('./flask-server/models/mnist.h5')
ensModel = load_model('./flask-server/models/mnist_ensemble.h5')


app = Flask(__name__)
cors.CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/process-image', methods=['POST'])
def process_image():

    data = request.get_json()
    imageData = data["image"].split(",")[1]
    imageBytes = base64.b64decode(imageData)
    image = Image.open(io.BytesIO(imageBytes))

    image = image.resize((28, 28), resample=Image.LANCZOS)
    imageArray = np.asarray(image)/255.0
    imageArray = np.array([x[:, 3] for x in imageArray])
    imageArray = imageArray.reshape(1, 28, 28, 1)

    cnn = cnnModel.predict(imageArray)
    cnnDict = {str(i): float(cnn[0][i]) for i in range(10)}

    ensRes = ensModel.predict(imageArray)
    ensRes = np.mean(ensRes, axis=0)
    ensDict = {str(i): float(ensRes[0][i]) for i in range(10)}

    response = {"Simple CNN Model": cnnDict, "Ensemble CNN Model": ensDict}

    image.save("image.png")

    return jsonify(response)


if __name__ == '__main__':
    app.run(port=5555, debug=True, use_reloader=True)
