//This function was with help from ChatGPT. 
async function loadSections() {
  try {
    const sections = ['how-to', 'quiz', 'performance-review'];
    
    for (const section of sections) {
      const response = await fetch(`sections/${section}.html`);
      const html = await response.text();
      document.getElementById(section).innerHTML = html;
    }

    await import("./how-to.js");
    
  } catch (error) {
    console.error('Error loading sections:', error);
  }
}

loadSections();