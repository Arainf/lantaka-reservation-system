export const calculateShade = (baseColor, amount) => {
    let usePound = false;
    let color = baseColor;
  
    if (color[0] === "#") {
      color = color.slice(1);
      usePound = true;
    }
  
    let num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    r = r > 255 ? 255 : r < 0 ? 0 : r;
  
    let g = ((num >> 8) & 0x00FF) + amount;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
  
    let b = (num & 0x0000FF) + amount;
    b = b > 255 ? 255 : b < 0 ? 0 : b;
  
    return (usePound ? "#" : "") + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  };

  export function formatDateToYYYYMMDD(date) {
    if (!(date instanceof Date)) {
      console.error("Provided value is not a Date object.");
      return null; // or handle the error accordingly
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }