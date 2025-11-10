// Select all offer buttons
const offerButtons = document.querySelectorAll('.offer');

offerButtons.forEach(button => {
  button.addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent link navigation

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      if (!cameras.length) throw 'No camera found on this device.';

      // Use the environment (back) camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', deviceId: cameras[cameras.length - 1].deviceId }
      });

      const track = stream.getVideoTracks()[0];

      // Turn on the torch (flashlight)
      await track.applyConstraints({ advanced: [{ torch: true }] });

      // Alert (or visually notify) user and allow turning off on a second click
      button.textContent = 'Flashlight ON (Click again to turn OFF)';
      let torchOn = true;

      button.onclick = async () => {
        if (torchOn) {
          await track.applyConstraints({ advanced: [{ torch: false }] });
          stream.getTracks().forEach(track => track.stop());
          button.textContent = button.dataset.originalText || 'Offer';
          torchOn = false;
        }
      };
    } catch (e) {
      alert('Flashlight is not supported on this device or browser!');
      console.error(e);
    }
  });
  // Save the original text for restoral
  button.dataset.originalText = button.textContent;
});

