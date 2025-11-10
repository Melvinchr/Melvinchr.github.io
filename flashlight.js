const btn = document.getElementById('flashBtn');

btn.addEventListener('click', async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter(device => device.kind === 'videoinput');
    if (!cameras.length) throw 'No camera found on this device.';

    // Use the environment (back) camera
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', deviceId: cameras[cameras.length - 1].deviceId }
    });

    const track = stream.getVideoTracks()[0];

    // Try to turn on the torch (flashlight)
    await track.applyConstraints({
      advanced: [{ torch: true }]
    });

    // Optionally, keep the stream alive until user turns it off
    btn.textContent = 'Flashlight ON (Press to turn OFF)';
    let torchOn = true;

    btn.onclick = async () => {
      if (torchOn) {
        await track.applyConstraints({ advanced: [{ torch: false }] });
        stream.getTracks().forEach(track => track.stop());
        btn.textContent = 'Turn On Flashlight';
        torchOn = false;
      }
    };
  } catch (e) {
    alert('Flashlight is not supported on this device or browser!');
    console.error(e);
  }
});
