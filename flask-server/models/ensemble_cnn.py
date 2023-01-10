import keras
from keras.datasets import mnist
import tensorflow as tf

(x_train, y_train), (x_test, y_test) = mnist.load_data()

x_train = x_train.reshape(-1, 28, 28, 1) / 255.0
x_test = x_test.reshape(-1, 28, 28, 1) / 255.0

models = []
for i in range(3):
    inputs = tf.keras.Input(shape=(28, 28, 1))
    x = tf.keras.layers.Conv2D(32, 3, activation='relu')(inputs)
    x = tf.keras.layers.MaxPooling2D()(x)
    x = tf.keras.layers.Conv2D(64, 3, activation='relu')(x)
    x = tf.keras.layers.MaxPooling2D()(x)
    x = tf.keras.layers.Flatten()(x)
    x = tf.keras.layers.Dense(64, activation='relu')(x)
    outputs = tf.keras.layers.Dense(10, activation='softmax')(x)
    model = tf.keras.Model(inputs, outputs)
    models.append(model)

ensemble = tf.keras.Model(inputs, [model(inputs) for model in models])

ensemble.compile(optimizer='adam',
                 loss='sparse_categorical_crossentropy', metrics=['accuracy'])

ensemble.fit(x_train, y_train, epochs=5)

test_acc = ensemble.evaluate(x_test, y_test)
print('Test accuracy:', test_acc)

# ensemble.save('mnist_ensemble.h5')
