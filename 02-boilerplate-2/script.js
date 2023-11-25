const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'magenta');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;

//stop the animation with spacebar
let isAnimating = true;
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        isAnimating = !isAnimating;
    }
});

class Particles {
    constructor(effect) {
        this.effect = effect;
        this.radius = Math.random() * 10 + 5;
        this.x = this.radius + Math.random() * (effect.width - this.radius * 2);
        this.y =
            this.radius + Math.random() * (effect.height - this.radius * 2);
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
    }
    update() {
        this.x += this.vx;
        if (
            this.x + this.radius > this.effect.width ||
            this.x - this.radius < 0
        ) {
            this.vx = -this.vx;
        }

        this.y += this.vy;
        if (
            this.y + this.radius > this.effect.height ||
            this.y - this.radius < 0
        ) {
            this.vy = -this.vy;
        }
    }
}

class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.particles = [];
        this.numberOfParticles = 50;
        this.createParticles();
    }
    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particles(this));
        }
    }
    handleParticles(context) {
        this.particles.forEach((particle) => {
            particle.draw(context);
            particle.update();
        });
    }
}
const effect = new Effect(canvas);
effect.handleParticles(ctx);

function animate() {
    requestAnimationFrame(animate);
    if (!isAnimating) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
}
animate();
