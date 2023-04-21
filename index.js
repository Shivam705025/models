 let model;

// Load the model
async function loadModel() {
  model = await tf.loadGraphModel('model/model.json');
  console.log('Model loaded');
}

// Load an input image
function loadImage(event) {
  const image = document.getElementById('image');
  image.src = URL.createObjectURL(event.target.files[0]);
  image.onload = () => {
    console.log('Image loaded');
  }
}

// Preprocess the input image
function preprocessImage(image) {
  const tensor = tf.browser.fromPixels(image)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .sub(127.5)
    .div(127.5)
    .expandDims();
  return tensor;
}

// Classify the input image
async function classify() {
  const image = document.getElementById('image');
  const tensor = preprocessImage(image);
  const predictions = await model.predict(tensor).data();
  const healthyProbability = predictions[0];
  const unhealthyProbability = predictions[1];
  const predictionText = `Healthy: ${Math.round(healthyProbability * 100)}%, Unhealthy: ${Math.round(unhealthyProbability * 100)}%`;
  document.getElementById('prediction').textContent = predictionText;
}

// Load the model when the page is loaded
