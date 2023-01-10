# Handwritten-Digits-Prediction

This project is a web application built using the React JavaScript framework for the frontend and the Python Flask framework for the backend. The application features a canvas on the web page where users can draw digits, which are then passed to the backend via a JavaScript post request. The backend uses the information from the canvas to predict the drawn digits using two machine learning models that have been trained on the MNIST dataset. The goal of the project is to allow users to draw digits on the canvas and have the models accurately predict which digit was drawn.

## Simple CNN model

The first model for training the MNIST data is a simple convolutional nerual network model, built using the Keras library in Python. The inputs are passed into a convolutional layer that applies 32 filters of size (3,3) using a ReLU activation function. Next is a max pooling operation to reduce the dimensionality of the data and also to help reduce overfitting. The output of this layer flattened and then passed to a fully-connected layer with 128 units and a ReLU activation function. After this is another full-connected layer with 10 units and a softmax activation function.

## Ensemble CNN model

This model is similar to the [heterogenous ensemble with simple CNN model](https://arxiv.org/abs/2008.10400v2), which has a test accuracy of up to 0.9991 on the MNIST training data. My model and tuning parameters are slightly different to the ones presented in the paper above. I trained this model using the tensorflow library in Python. The ensemble consists of three CNN models with the same architecture. The first layer is a sequence of two convolutional layers, where the first layer applies 32 filters of size (3,3) with relu activation and the second one applies 64 filters of size (3,3) with relu activation. After each convolutional layer is a max pooling layer. The output if this is flattened and passed through two fully-connected layers with 64 units and 10 units, respectively. Predictions using this model are made as an average of the predicted class probabilities for each model within the ensemble.

## Testing Set Results

Both models are trained for 5 epochs, using the Adam optimizer, the sparse categorical cross-entropy as the loss function, and accuracy as the evaluation metric. The simple CNN model has a test accuracy of 0.9866. The ensemble CNN model has a test accuracy of 0.9885.

## Demo

![demo](https://user-images.githubusercontent.com/96806035/211511206-d1c25565-b45a-44d6-bb1b-c56615767087.gif)

## Remarks

From testing, it has been clear to me that the ensemble model far outperforms the simple CNN. The latter has some consistent misclassifications. A clear example is with the digit `6`.




