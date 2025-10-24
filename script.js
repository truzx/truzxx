const form = document.getElementById("promptForm");
const textInput = document.getElementById("textInput");
const output = document.getElementById("output");
const generateBtn = document.getElementById("generateBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = textInput.value.trim();
  if (!text) return;

  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";

  output.textContent = "";

  try {
    const res = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    output.textContent = data.result || "Error: No response from AI.";
  } catch (err) {
    output.textContent = "Something went wrong. Try again.";
  }

  generateBtn.disabled = false;
  generateBtn.textContent = "Generate Prompt";
});
