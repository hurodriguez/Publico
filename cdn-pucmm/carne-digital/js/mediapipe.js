
		const canvasContainer = document.getElementsByClassName('canvas_container')[0];
		const canvasElement = document.getElementsByClassName('output_canvas')[0];
		const previewElement = document.getElementsByClassName('preview_image')[0];
		const startEl = document.getElementsByClassName('start')[0];
		const mirrorEl = document.getElementsByClassName('mirror')[0];
		const flipEl = document.getElementsByClassName('flip')[0];
		const captureEl = document.getElementsByClassName('capture')[0];
		const retakeEl = document.getElementsByClassName('retake')[0];
		const downloadEl = document.getElementsByClassName('download')[0];
		const meta_info = document.getElementsByClassName('meta_info')[0];
		const canvasCtx = canvasElement.getContext('2d');
//-------------------------Contro para detectar cara--------------------------------------------------
    const controls = window;
    const drawingUtils = window;
    const mpFaceDetection = window;
    const videoElement = document.getElementsByClassName('input_video')[0];
    const canvasElemento = document.getElementsByClassName('output_canvas2')[0];
    const controlsElement = document.getElementsByClassName('control-panel')[0];
    const canvasCtxo = canvasElemento.getContext('2d');
    const fpsControl = new controls.FPS();
//------------------------------------------------------------------------------------------------------  
		const facingMode = ['user', 'environment'];
		let camera, video, mirrored = false;
		let facingModeIndex = 0;
		let downloadFn;
		let videoWidth, videoHeight, videoRatio;
		let smallestWindowDimension = Math.min(window.innerWidth, window.innerHeight);

		function hide(el) { el.style.display = 'none'; }
		function show(el) { el.style.display = 'block'; }

		startEl.addEventListener('click', () => {
			start();
		});

		mirrorEl.addEventListener('click', () => {
			if (mirrored) {
				mirrored = false;
				canvasElement.style.transform = 'none';
			} else {
				mirrored = true;
				canvasElement.style.transform = 'scaleX(-1)';
			}
		});

		flipEl.addEventListener('click', () => {
			stopCamera();
			facingModeIndex = (facingModeIndex + 1) % facingMode.length;
			startCamera();
		});

		retakeEl.addEventListener('click', () => {
			startCamera();
			document.querySelectorAll('.step-download').forEach(hide);
			document.querySelectorAll('.step-capture').forEach(show);
			canvasContainer.style.backgroundImage = 'url(https://netcot-cdn.netlify.app/cdn-pucmm/carne-digital/img/carneMascara.png)';
			downloadEl.removeEventListener('click', downloadFn);
		});

		captureEl.addEventListener('click', function () {
			let seconds = 3;
			let interval = 0;

			captureEl.disabled = true;
			const timer = document.createElement('div');
			timer.style = `position:absolute;font-size:160px;color:white;top:${smallestWindowDimension / 2}px;margin-top:-80px;text-align:center;width:100%;`;
			timer.textContent = seconds;
			document.body.appendChild(timer);

			const countdown = function () {
				seconds -= 1;
				timer.textContent = seconds;
				if (seconds === 0) {
					takePhoto();
					window.clearInterval(interval);
					timer.remove();
					captureEl.disabled = false;
				}
			}
			interval = window.setInterval(countdown, 1000);
		});

		window.onresize = () => {
			smallestWindowDimension = Math.min(window.innerWidth, window.innerHeight);
			resizeOutput();
		}

		function takePhoto() {
			const outputSize = 600;
			const img = new Image();

			img.onload = function () {
				const imageHeight = img.height;
				const imageWidth = img.width;
				canvasElement.height = outputSize;
				canvasElement.width = outputSize;
				canvasCtx.save(); // save canvas transform state before doing horizontal flip
				canvasCtx.clearRect(0, 0, outputSize, outputSize); // reset canvas
				canvasCtx.rect(0, 0, outputSize, outputSize); // paint white background so it's not transparent
				canvasCtx.fillStyle = 'white';
				canvasCtx.fill();
				if (mirrored) {
					canvasCtx.translate(outputSize, 0);
					canvasCtx.scale(-1, 1);
				}
				canvasCtx.drawImage(img, (imageWidth - imageHeight) / 2, 0, imageHeight, imageHeight, 0, 0, outputSize, outputSize);
				canvasCtx.restore();
				const dataURL = canvasElement.toDataURL();
				previewElement.src = dataURL;
				resizeOutput();
				document.querySelectorAll('.step-download').forEach(show);
				document.querySelectorAll('.step-capture').forEach(hide);
				canvasContainer.style.backgroundImage = 'none';
				stopCamera();
				downloadFn = function () { download(dataURL) };
				downloadEl.addEventListener('click', downloadFn);
			}
			img.src = canvasElement.toDataURL();
		}

		function download(url) {
			const a = document.createElement('a')
			a.href = url;
			a.download = 'webcam-passport-photo';
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
		}

		function resizeOutput() {
			canvasElement.style.height = `${smallestWindowDimension}px`;
			canvasElement.style.width = `${smallestWindowDimension * videoRatio}px`;
			canvasContainer.style.width = `${smallestWindowDimension}px`;
			canvasContainer.style.height = `${smallestWindowDimension}px`;
			canvasElement.height = videoHeight;
			canvasElement.width = videoWidth;
		}

		function onResults(results) {
			canvasCtx.save();
			canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
			canvasCtx.drawImage(results.segmentationMask, 0, 0,
				videoWidth, videoHeight);

			// Only overwrite existing pixels.
			canvasCtx.globalCompositeOperation = 'source-in';
			canvasCtx.drawImage(
				results.image, 0, 0, videoWidth, videoHeight);
			canvasCtx.restore();
		}

		const selfieSegmentation = new SelfieSegmentation({
			locateFile: (file) => {
				return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
			}
		});
		selfieSegmentation.setOptions({
			selfieMode: true,
			modelSelection: 0,
		});
		selfieSegmentation.onResults(onResults);

		function startCamera() {
			const mode = facingMode[facingModeIndex];
			video = document.createElement('video');
			video.setAttribute('playsinline', 'true');
			let firstFrame = true;
			camera = new Camera(video, {
				onFrame: async () => {
					if (firstFrame) {
						firstFrame = false;
						videoWidth = video.videoWidth;
						videoHeight = video.videoHeight;
						videoRatio = videoWidth / videoHeight;
						canvasContainer.style.backgroundImage = 'url(https://netcot-cdn.netlify.app/cdn-pucmm/carne-digital/img/carneMascara.png)';
						resizeOutput();
						meta_info.textContent = `${mode}, ${video.videoWidth}, ${video.videoHeight}`;
					}
					await selfieSegmentation.send({ image: video });
				},
				facingMode: mode,
				width: 720,
				height: 720
			});
			camera.start();
		}

		function stopCamera() {
			camera && camera.stop();
			video && video.remove();
		}

		function start() {
			startCamera();
			document.querySelectorAll('.step-capture').forEach(show);
			document.querySelectorAll('.step-intro').forEach(hide);
			document.querySelectorAll('.class-cara').forEach(show);
			document.querySelectorAll('.enviar').forEach(show);      
      
		}

//---------------------- Detectar Cara --------------------------------//
 function cara(results) {
    const box = document.getElementById('cara');
    const Capturebox = document.getElementById('Capture');
   
    fpsControl.tick();
    canvasCtxo.save();
    canvasCtxo.clearRect(0, 0, canvasElemento.width, canvasElemento.height);
    canvasCtxo.drawImage(
        results.image, 0, 0, canvasElemento.width, canvasElemento.height);
    if (results.detections.length > 0) {
        drawingUtils.drawRectangle(canvasCtxo, results.detections[0].boundingBox, { color: 'blue', lineWidth: 4, fillColor: '#00000000' });
        drawingUtils.drawLandmarks(canvasCtxo, results.detections[0].landmarks, {
            color: 'red',
            radius: 5,
        });
      box.style.display = 'none';
    } else{

   box.style.display = 'block';
    }

    canvasCtxo.restore();
}
const faceDetection = new mpFaceDetection.FaceDetection({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`;
    }
});
faceDetection.onResults(cara);
new controls
    .ControlPanel(controlsElement, {
        selfieMode: true,
        model: 'short',
        minDetectionConfidence: 0.8,//Este es el porcentaje para detectar el rostro
    })
    .add([
        new controls.StaticText({ title: 'MediaPipe Face Detection' }),
        fpsControl,
        new controls.Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
        new controls.SourcePicker({
            onSourceChanged: () => {
                faceDetection.reset();
            },
            onFrame: async (input, size) => {
                const aspect = size.height / size.width;
                let width, height;
                if (window.innerWidth > window.innerHeight) {
                    height = window.innerHeight;
                    width = height / aspect;
                }
                else {
                    width = window.innerWidth;
                    height = width * aspect;
                }
                canvasElemento.width = width;
                canvasElemento.height = height;
                await faceDetection.send({ image: input });
            },
            examples: {
                images: [],
                videos: [],
            },
        }),
        new controls.Slider({
            title: 'Model Selection',
            field: 'model',
            discrete: { 'short': 'Short-Range', 'full': 'Full-Range' },
        }),
        new controls.Slider({
            title: 'Min Detection Confidence',
            field: 'minDetectionConfidence',
            range: [0, 1],
            step: 0.01
        }),
    ])
    .on(x => {
        const options = x;
        videoElement.classList.toggle('selfie', options.selfieMode);
        faceDetection.setOptions(options);
    });