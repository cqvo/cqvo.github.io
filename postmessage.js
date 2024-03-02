function logger(event, msg) {
    console.log('INNER FRAME - ' + event + (msg ? ': ' + msg : ''));
}

function sendDeviceId() {
    let classyDeviceId = window.mParticle.getDeviceId();
    if (!classyDeviceId) {
        return logger('Failed to define classyDeviceId');
    }
    try {
        window.parent.postMessage({
            classyDeviceId: classyDeviceId,
        }, 'https://github.io');
        logger('postMessage() sent, classyDeviceId', classyDeviceId);
    } catch (e) {
        logger('postMessage() failed', e);
    }
}

window.mParticle.ready(
    function () {
        logger('mParticle ready!');
        sendDeviceId();
    }
)
