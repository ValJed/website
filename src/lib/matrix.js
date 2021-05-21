export default (canvas, width, height) => {
  canvas.width = width
  canvas.height = height
  canvas.style.borderRadius = '50%'

  const ctx = canvas.getContext('2d')
  const matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}"
    .split("");
  const fontSize = 10;
  const columns = width / fontSize; // number of columns for the rain

  const drops = Array(Math.round(columns)).fill(1)

  // drawing the characters
  function draw() {
    // Black BG for the canvas
    // translucent BG to show trail
    ctx.fillStyle = "rgba(33, 33, 33, 0.1)";
    // ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'blue';// green text
    ctx.font = `${fontSize}px arial`;
    // looping over drops

    drops.forEach((drop, i) => {
      // a random chinese character to print
      const text = matrix[Math.floor(Math.random() * matrix.length)];
      // x = i*fontSize, y = value of drops[i]*fontSize
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // sending the drop back to the top randomly after it has crossed the screen
      // adding a randomness to the reset to make the drops scattered on the Y axis
      if (drops[i] * fontSize > height && Math.random() > 0.975)
        drops[i] = 0;

      // incrementing Y coordinate
      drops[i]++;
    })
    // for (let i = 0; i < drops.length; i++) {
    //   // a random chinese character to print
    //   const text = matrix[Math.floor(Math.random() * matrix.length)];
    //   // x = i*fontSize, y = value of drops[i]*fontSize
    //   ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    //   // sending the drop back to the top randomly after it has crossed the screen
    //   // adding a randomness to the reset to make the drops scattered on the Y axis
    //   if (drops[i] * fontSize > height && Math.random() > 0.975)
    //     drops[i] = 0;

    //   // incrementing Y coordinate
    //   drops[i]++;
    // }
  }

  setInterval(draw, 40);
}