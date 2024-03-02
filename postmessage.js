function sendDeviceId() {
    window.mParticle.ready(
        function () {
            console.log('INNER FRAME - mParticle ready!');
            let classyDeviceId = window.mParticle.getDeviceId();
            console.log('INNER FRAME - classyDeviceId: ' + classyDeviceId);
            try {
                window.parent.postMessage({
                    classyDeviceId: classyDeviceId,
                }, 'https://github.io');
                console.log('INNER FRAME - postMessage() sent');
            } catch (e) {
                console.log(error);
            }
        }
    );
}
