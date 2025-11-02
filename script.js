let voices = [];
let filteredVoices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  filterVoices();
}

function filterVoices() {
  const langSelect = document.getElementById("languageSelect").value;
  const voiceSelect = document.getElementById("voiceSelect");
  voiceSelect.innerHTML = "";

  filteredVoices = voices.filter(v => {
    return langSelect === "all" || v.lang.toLowerCase().includes(langSelect);
  }).slice(0, 5); // limit to 5 voices

  filteredVoices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

function speak() {
  const text = document.getElementById("textInput").value;
  const voiceSelect = document.getElementById("voiceSelect");
  if (!filteredVoices.length) return alert("No voices available for this language!");
  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = filteredVoices[voiceSelect.value];
  utterance.voice = selectedVoice;
  utterance.pitch = 1;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

// Ensure voices load properly
window.speechSynthesis.onvoiceschanged = loadVoices;
