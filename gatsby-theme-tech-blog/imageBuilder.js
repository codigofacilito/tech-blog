const { createCanvas, loadImage } = require('canvas');
const fs = require(`fs`);

const padding = 30;
const lineWidth = 15;

function printAtWordWrap(context, text, x, y, lineHeight, fitWidth) {
  fitWidth = fitWidth || 0;

  if (fitWidth <= 0) {
    context.fillText(text, x, y);
    return;
  }
  var words = text.split(' ');
  var currentLine = 0;
  var idx = 1;
  while (words.length > 0 && idx <= words.length) {
    var str = words.slice(0, idx).join(' ');
    var w = context.measureText(str).width;
    if (w > fitWidth) {
      if (idx == 1) {
        idx = 2;
      }
      context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
      currentLine++;
      words = words.splice(idx - 1);
      idx = 1;
    }
    else { idx++; }
  }
  if (idx > 0)
    context.fillText(words.join(' '), x, y + (lineHeight * currentLine));
}

module.exports = async ({text, fileName, path})=>{
  const canvas = createCanvas(1200, 630);

  const ctx = canvas.getContext('2d');

  const textDims = ctx.measureText(text);
  const desiredWidth = (canvas.width - padding * 2) * 0.9;
  const lineHeight = 100;
  const factor = text.length > 22 ? 2.1 : 1.1;

  ctx.font = 'normal bold 90px Impact';
  // ctx.textAlign = 'center';
  ctx.fillStyle = '#2D2A55';
  ctx.strokeStyle = '#9EFEFF';
  ctx.lineWidth = lineWidth;
  
  
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeRect(padding, padding, canvas.width - (padding * 2), canvas.height - (padding * 2));

  ctx.fillStyle = 'white';

  
  printAtWordWrap(ctx, text, padding * 2.5, canvas.height - padding - (lineHeight * factor), lineHeight , desiredWidth);
  const image = await loadImage(`${__dirname}/thumb-logo.png`);

  ctx.drawImage(image, padding * 2.5, canvas.height - padding - (lineHeight * (factor + 2)))
  const buf = canvas.toBuffer();
  fs.writeFileSync(`${path}${fileName}`, buf);
}

