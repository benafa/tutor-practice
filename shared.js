/* Shared by the tutor and student pages */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ICON_SOUND = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 8.5a5 5 0 0 1 0 7"/></svg>`;
const RESULTS_KEY = "tp-results";

// The tutor's choices travel in the link itself, because there's no server yet
function encodePack(pack) {
  const bin = String.fromCharCode(...new TextEncoder().encode(JSON.stringify(pack)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decodePack(text) {
  try {
    const bin = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))));
  } catch (e) { return null; }
}

function readResults() {
  try { return JSON.parse(localStorage.getItem(RESULTS_KEY)) || {}; } catch (e) { return {}; }
}
function writeResults(r) {
  try { localStorage.setItem(RESULTS_KEY, JSON.stringify(r)); } catch (e) {}
}

const player = new Audio();
function speakDevice(zh, slow) {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(zh);
    u.lang = "zh-CN"; u.rate = slow ? 0.7 : 1;
    speechSynthesis.speak(u);
  } catch (e) {}
}
// Cards a tutor typed in have no recorded clip, so they use the device's voice
function playCard(id, zh, voice, slow, onend) {
  player.onended = onend || null;
  if (!id || id.startsWith("new")) { speakDevice(zh, slow); return; }
  player.onerror = () => speakDevice(zh, slow);
  player.src = `audio/${voice || "m"}/${id}.mp3`;
  player.preservesPitch = true;
  player.playbackRate = slow ? 0.7 : 1;
  const p = player.play();
  if (p && p.catch) p.catch(() => {});
}
