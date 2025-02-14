<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import toastr from 'toastr';
	import 'toastr/build/toastr.min.css';

	let guess = ''; // Stores user input
	let magicNumber = 0; // The randomly generated number
	let attempts = 3; // Max attempts (if test mode is false)
	let isTestMode = false;

	const checkTestMode = () => {
		let param = page.url.searchParams.get('unlimitedAttempts') || 'false';
		param = param.toLowerCase();
		return param === 'true';
	};

	const random = (num) => {
		return Math.floor(Math.random() * num);
	};

	// Generate a random number on page load
	onMount(() => {
		magicNumber = random(100) + 1;
		console.log(`Magic Number: ${magicNumber}`); // Debugging: Log it in the console
		console.log(`Attempts remaining: ${attempts}`);
		isTestMode = checkTestMode();
		console.log(isTestMode);
	});

	const createBalloonContainer = () => {
		const container = document.createElement('div');
		container.id = 'balloon-container';
		container.className =
			'absolute top-0 left-0 p-1 w-full h-full flex flex-wrap overflow-hidden transition-opacity duration-500';
		document.body.append(container);
		return document.getElementById('balloon-container');
	};
	const createBalloons = (num) => {
		const balloonContainer = createBalloonContainer();
		for (let i = 0; i < num; i++) {
			const balloon = document.createElement('div');
			balloon.classList.add(
				'h-[125px]',
				'w-[105px]',
				'rounded-t-[75%]',
				'rounded-b-[70%]',
				'relative'
			);
			// Random color
			const r = random(255),
				g = random(255),
				b = random(255);
			balloon.style.backgroundColor = `rgba(${r},${g},${b},0.7)`;
			balloon.style.color = `rgba(${r},${g},${b},0.7)`;
			balloon.style.boxShadow = `inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7)`;

			// Random positioning and animation
			const mt = random(200),
				ml = random(50),
				dur = random(5) + 5;
			balloon.style.marginTop = `${mt}px`;
			balloon.style.marginLeft = `${ml}px`;
			balloon.style.animation = `float ${dur}s ease-in infinite`;

			// Create "string" (equivalent to :before)
			const string = document.createElement('div');
			string.style.height = '75px';
			string.style.width = '1px';
			string.style.backgroundColor = '#FDFD96';
			string.style.position = 'absolute';
			string.style.top = '125px';
			string.style.left = '0';
			string.style.right = '0';
			string.style.margin = 'auto';
			balloon.appendChild(string);

			// Create arrow (equivalent to :after)
			const arrow = document.createElement('div');
			arrow.innerText = '▲';
			arrow.style.textAlign = 'center';
			arrow.style.position = 'absolute';
			arrow.style.color = 'inherit';
			arrow.style.top = '120px';
			arrow.style.left = '0';
			arrow.style.right = '0';
			arrow.style.margin = 'auto';
			balloon.appendChild(arrow);
			balloonContainer.append(balloon);
		}
		balloonContainer.addEventListener('click', () => {
			balloonContainer.classList.add('opacity-0');
			setTimeout(() => {
				balloonContainer.remove();
			}, 500);
		});
	};

	// Function to check the guess
	const guessNumber = (number) => {
		if (number === magicNumber) {
			attempts = 0;
			console.log(`Attempts remaining: ${attempts}`);
			return createBalloons(30);
		}
		console.log(`Guess: ${number}`);
		// Reduce attempts if not in test mode
		if (!isTestMode) {
			attempts--;
			console.log(`Attempts remaining: ${attempts}`);
			if (attempts <= 0) {
				toastr.error(`Sorry. The generated number was ${magicNumber}.`, `Game Over`);
			}
		}
	};

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		if (attempts > 0 || isTestMode) {
			return guessNumber(Number(guess));
		}
		if (attempts === 0) {
			magicNumber = random(100) + 1;
			attempts = 3;
		}
	};
</script>

<form on:submit={handleSubmit} class="p-4 space-y-2">
	<h1 class="h1">Magic Number</h1>
	<h6 class="h6">Take a chance. 1 through 100.</h6>
	<p>What do you think the magic number is?</p>

	<label class="label">
		<span>Guess</span>
		<input
			class="input"
			title="Input (number)"
			type="number"
			bind:value={guess}
			min="1"
			max="100"
			required
		/>
	</label>

	<button type="submit" class="btn variant-filled">
		{#if attempts > 0}
			<span><Search /></span>
			<span>Try this one?</span>
		{:else}
			<span>Start Over</span>
		{/if}
	</button>
</form>
