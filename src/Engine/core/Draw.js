export default class Draw {
  clearRect() {
    const { context, canvas } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawImage(node, offsetX, offsetY) {
    const { pixelRatio } = this.config;
    const { attrs } = node;
    const { sposition = {}, spixelRatio = {}, image } = attrs;
    const { width = 1, height = 1 } = attrs.size || {};
    const { context } = this;

    const { sx = 0, sy = 0 } = sposition;
    const { swidth = width, sheight = height } = spixelRatio;
    const img = this.getImage(image);
    if (img) {
      context.drawImage(
        img,
        sx * pixelRatio,
        sy * pixelRatio,
        swidth * pixelRatio,
        sheight * pixelRatio,
        offsetX * pixelRatio,
        offsetY * pixelRatio,
        width * pixelRatio,
        height * pixelRatio
      );
    } else {
      console.warn(attrs);
    }
  }

  drawBorder(node, offsetX, offsetY) {
    const { pixelRatio } = this.config;
    const { context } = this;
    const { width: borderWidth, color: borderColor } = node.attrs.border;
    const { width = 1, height = 1 } = node.attrs.size || {};
    if (borderWidth) {
      context.save();
      context.lineWidth = borderWidth;
      context.beginPath();
      context.rect(
        offsetX * pixelRatio + borderWidth / 2,
        offsetY * pixelRatio + borderWidth / 2,
        width * pixelRatio - borderWidth,
        height * pixelRatio - borderWidth
      );
      context.strokeStyle = borderColor;
      context.stroke();
      context.closePath();
      context.restore();
    }
  }

  drawBackgroundImage(node, offsetX, offsetY) {
    const { pixelRatio } = this.config;
    const { context } = this;
    const backgroundImage = node.attrs.backgroundImage;
    const { width = 1, height = 1 } = node.attrs.size || {};
    if (backgroundImage) {
      context.save();
      context.beginPath();
      context.rect(
        offsetX * pixelRatio,
        offsetY * pixelRatio,
        width * pixelRatio,
        height * pixelRatio
      );

      context.fillStyle = context.createPattern(
        this.getImage(backgroundImage),
        "repeat"
      );
      context.fill();
      context.closePath();
      context.restore();
    }
  }

  drawBackgroundColor(node, offsetX, offsetY) {
    const { pixelRatio } = this.config;
    const { context } = this;
    const backgroundColor = node.attrs.backgroundColor;
    const { width = 1, height = 1 } = node.attrs.size || {};
    if (backgroundColor) {
      if (typeof backgroundColor !== "string") {
        debugger;
      }
      context.save();
      context.beginPath();
      context.fillStyle = backgroundColor;
      context.rect(
        offsetX * pixelRatio,
        offsetY * pixelRatio,
        width * pixelRatio,
        height * pixelRatio
      );

      context.fill();
      context.restore();
      context.closePath();
    }
  }

  drawText(text, offsetX, offsetY) {
    const { context } = this;
    const { pixelRatio } = this.config;

    context.fillText(text, offsetX * pixelRatio, offsetY * pixelRatio);
  }

  drawLineGradient(node, offsetX, offsetY) {
    const { lineGradient } = node.attrs;
    const { pixelRatio } = this.config;

    if (lineGradient) {
      const { context } = this;
      context.fillStyle = lineGradient;
      context.fillRect(offsetX * pixelRatio, offsetY * pixelRatio, 2000, 32);
    }
  }
}
