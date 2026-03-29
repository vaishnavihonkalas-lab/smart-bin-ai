// const URL = "PASTE_YOUR_MODEL_LINK_HERE/";

// let model, webcam;
// let score = 0;
// let lastSpoken = "";

// async function init() {
//     const modelURL = URL + "model.json";
//     const metadataURL = URL + "metadata.json";

//     model = await tmImage.load(modelURL, metadataURL);

//     webcam = new tmImage.Webcam(320, 320, true);
//     await webcam.setup();
//     await webcam.play();

//     window.requestAnimationFrame(loop);

//     document.getElementById("webcam-container").innerHTML = "";
//     document.getElementById("webcam-container").appendChild(webcam.canvas);
// }

// async function loop() {
//     webcam.update();
//     await predict();
//     window.requestAnimationFrame(loop);
// }

// async function predict() {
//     const prediction = await model.predict(webcam.canvas);

//     let highestProb = 0;
//     let detectedClass = "";

//     prediction.forEach(p => {
//         if (p.probability > highestProb) {
//             highestProb = p.probability;
//             detectedClass = p.className;
//         }
//     });

//     let confidence = (highestProb * 100).toFixed(1);

//     document.getElementById("result").innerHTML =
//         `Detected: ${detectedClass} (${confidence}%)`;

//     let instruction = "";

//     if (detectedClass === "Plastic") {
//         instruction = "♻ Wash before recycling";
//     } else if (detectedClass === "Paper") {
//         instruction = "📄 Keep dry and recycle";
//     } else if (detectedClass === "Metal") {
//         instruction = "🥫 Clean before recycling";
//     } else if (detectedClass === "Glass") {
//         instruction = "🍾 Handle carefully";
//     }

//     document.getElementById("instruction").innerHTML = instruction;

//     score += 5;
//     document.getElementById("score").innerText = score;

//     if (instruction !== lastSpoken) {
//         speechSynthesis.speak(new SpeechSynthesisUtterance(instruction));
//         lastSpoken = instruction;
//     }
// }












let model;
let webcam;
let score = 0;
let lastDetected = "";

async function init() {
    try {
        model = await cocoSsd.load();

        webcam = document.createElement("video");
        webcam.width = 320;
        webcam.height = 320;
        webcam.autoplay = true;

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcam.srcObject = stream;

        const container = document.getElementById("webcam-container");
        container.innerHTML = "";
        container.appendChild(webcam);

        detect();

    } catch (error) {
        alert("Camera error: " + error);
        console.error(error);
    }
}

async function detect() {
    const predictions = await model.detect(webcam);

    if (predictions.length > 0) {
        let obj = predictions[0].class;
        let confidence = (predictions[0].score * 100).toFixed(1);

        let type = "Other";
        let instruction = "";

        // 🧠 Mapping logic
        if (obj.includes("bottle") || obj.includes("cup")) {
            type = "Plastic";
            instruction = "♻ Wash before recycling";
        }
        else if (obj.includes("book") || obj.includes("paper")) {
            type = "Paper";
            instruction = "📄 Keep dry and recycle";
        }
        else if (obj.includes("can")) {
            type = "Metal";
            instruction = "🥫 Clean before recycling";
        }
        else if (obj.includes("glass")) {
            type = "Glass";
            instruction = "🍾 Handle carefully";
        }
        else {
            type = "Other";
            instruction = "❌ Not recyclable";
        }

        document.getElementById("result").innerHTML =
            `Detected: ${type} (${confidence}%)`;

        document.getElementById("instruction").innerHTML = instruction;

        // 🌱 Eco Points
        score += 5;
        document.getElementById("score").innerText = score;

        // 🔊 Voice (only on change)
        if (type !== lastDetected) {
            speechSynthesis.cancel();
            speechSynthesis.speak(new SpeechSynthesisUtterance(instruction));
            lastDetected = type;
        }
    }

    requestAnimationFrame(detect);
}