window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.api-button');
    buttons.forEach(element => {
        element.addEventListener(
            'click', 
            function () {
                if (typeof window[element.id] === 'function') {
                    window[element.id]();
                } else {
                    console.error('No function found for: ' + element.id);
                }
            }
        );
    })
})

function track_api() {
    let eventName = getValues('event_name');
    analytics.track(eventName);
}

function getValues(element) {
    let elementData = document.getElementById(element).value;
}