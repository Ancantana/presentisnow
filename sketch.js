document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const captureVideo = document.getElementById('captureVideo');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const textInput = document.getElementById('textInput');
    let isVideoReplaced = false; // To check if video has been replaced by canvas

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            captureVideo.srcObject = stream;
            captureVideo.addEventListener('loadedmetadata', () => {
                canvas.width = captureVideo.videoWidth;
                canvas.height = captureVideo.videoHeight;
            });
        })
        .catch(function(error) {
            console.error("Error accessing the webcam: ", error);
        });

    function captureFrame() {
        context.drawImage(captureVideo, 0, 0, canvas.width, canvas.height);
        if (!isVideoReplaced) {
            container.replaceChild(canvas, captureVideo);
            isVideoReplaced = true;
        }
    }

    textInput.addEventListener('input', function() {
        captureFrame();
    });
});
