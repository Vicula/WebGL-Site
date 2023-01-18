var animating = true;
function toggleAnimation(elm) {
    animating ^= true;
    if (animating) animate();
    if (elm) {
        elm.innerHTML = animating ? "Stop" : "Start";
    }
}

function stepAnimation() {
    if (!animating) animate();
}

function animate() {
    var curdate = new Date();
    timeInfo.elapsed = (curdate - timeInfo.start) / 1000.0;
    timeInfo.delta = (curdate - timeInfo.prev) / 1000.0;
    timeInfo.prev = curdate;

    if (animating) requestAnimationFrame(animate);
    render();
}