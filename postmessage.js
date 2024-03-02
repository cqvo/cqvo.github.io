function logger(event, msg) {
    console.log('INNER FRAME - ' + event + (msg ? ': ' + msg : ''));
}

function sendDeviceId() {
    let classyDeviceId = window.mParticle.getDeviceId();
    logger('Defining classyDeviceId' + classyDeviceId);
    try {
        window.parent.postMessage({
            classyDeviceId: classyDeviceId,
        }, 'https://github.io');
        logger('postMessage() sent');
    } catch (e) {
        logger(e);
    }
}

window.mParticle.ready(
    function () {
        logger('mParticle ready!');
        sendDeviceId();
    }
)
