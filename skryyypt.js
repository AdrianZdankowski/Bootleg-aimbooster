const game = document.getElementById("gaming");
const button = document.getElementById("start");
const sizeList = document.getElementById("dotSize");
const spawnList = document.getElementById("dotSpawn");
const despawnList = document.getElementById("dotDespawn");
const scoreBar = document.getElementById("score");
const timeCounter = document.getElementById("timeDiv");
const cssVariables = document.documentElement;

const hit = new Audio("Hitsound_COD.wav");
hit.volume = 0.2;

button.addEventListener("click", () => {
	let score = 0;
	let time = 0;
	setInterval(() => {
		time++;
		timeCounter.innerHTML = time == 69 ? "Hehe 69" : "Time: " + time + "s";
	}, 1000);
	const size = parseInt(sizeList.value);
	const spawnTime = parseInt(spawnList.value);
	const despawnTime = parseInt(despawnList.value);
	const maxWidth = game.offsetWidth - size;
	const maxHeight = game.offsetHeight - size;
	const points = size == 6 ? 5 : size == 12 ? 4 : size == 24 ? 2 : size == 48 ? 1 : 0;

	cssVariables.style.setProperty("--size", size + "px");
	button.disabled = true;
	setInterval(() => {
		const newTarget = document.createElement("div");
		const x = Math.floor(Math.random() * maxWidth);
		const y = Math.floor(Math.random() * maxHeight);
		newTarget.classList.add("target");
		newTarget.style.left = x + "px";
		newTarget.style.top = y + "px";
		game.append(newTarget);
		setTimeout(() => {
			newTarget.remove();
		}, despawnTime);
		newTarget.addEventListener("click", e => {
			hit.play();
			e.target.remove();
			score += points;
			scoreBar.innerHTML = "Score: " + score;
		});
	}, spawnTime);
});
