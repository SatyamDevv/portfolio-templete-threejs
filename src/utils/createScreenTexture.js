import * as THREE from 'three';

/**
 * Creates a texture for screen elements with text content
 * @param {string} name - The name to display
 * @param {string} title - The title/subtitle to display
 * @returns {THREE.CanvasTexture} The generated texture
 */
export default function createScreenTexture(name, title) {
  try {
    // Create canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      console.error('Could not get 2D context for screen texture');
      return null;
    }
    
    // Set canvas dimensions (power of 2 for better performance)
    canvas.width = 1024;
    canvas.height = 512;
    
    // Fill background
    context.fillStyle = '#0a101f';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add subtle gradient
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.2)');  // Indigo
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)'); // Purple
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add grid pattern for techie look
    context.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    context.lineWidth = 1;
    
    // Horizontal lines
    for (let y = 0; y < canvas.height; y += 20) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += 20) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }
    
    // Add decorative elements
    // Circles
    context.fillStyle = 'rgba(255, 255, 255, 0.1)';
    context.beginPath();
    context.arc(canvas.width * 0.2, canvas.height * 0.3, 40, 0, Math.PI * 2);
    context.fill();
    
    context.beginPath();
    context.arc(canvas.width * 0.8, canvas.height * 0.7, 60, 0, Math.PI * 2);
    context.fill();
    
    // Text settings
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Primary heading
    context.font = 'bold 48px sans-serif';
    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.fillText(name, canvas.width / 2, canvas.height / 2 - 40);
    
    // Subtitle
    context.font = '24px sans-serif';
    context.fillStyle = 'rgba(96, 165, 250, 0.9)'; // Blue
    context.fillText(title, canvas.width / 2, canvas.height / 2 + 20);
    
    // Status text
    context.font = '16px monospace';
    context.fillStyle = 'rgba(74, 222, 128, 0.8)'; // Green
    context.fillText('> System online', canvas.width / 2, canvas.height * 0.8);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  } catch (error) {
    console.error('Error creating screen texture:', error);
    return null;
  }
}
