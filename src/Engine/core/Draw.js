import { defaultHeight, defaultWidth } from "../const/box";

export default class Draw {
  clearRect() {
    const { context } = this;
    const { canvas } = context;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawImage(node, offsetX, offsetY) {
    const { pixelRatio } = this.config;
    const { props } = node;
    const { sposition = {}, spixelRatio = {}, image } = props;
    const { width = defaultWidth, height = defaultHeight } = props.size || {};
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
      this.$loader.loadImage(image)
    }
  }

  drawBorder(node, offsetX, offsetY) {
    const { pixelRatio } = this.config;
    const { context } = this;
    const { width: borderWidth, color: borderColor } = node.props.border;
    const { width = defaultWidth, height = defaultHeight } =
      node.props.size || {};
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
    const backgroundImage = node.props.backgroundImage;
    const { width = defaultWidth, height = defaultHeight } =
      node.props.size || {};

    if (backgroundImage) {
      context.save();
      context.beginPath();
      context.rect(
        offsetX * pixelRatio,
        offsetY * pixelRatio,
        width * pixelRatio,
        height * pixelRatio
      );

      const image = this.getImage(backgroundImage);
      
      if (image) {
        context.fillStyle = context.createPattern(
          image,
          "repeat"
        );
        context.fill();
        context.closePath();
        context.restore();
      } else {
        this.$loader.loadImage(backgroundImage)
      }
    }
  }

  drawBackgroundColor(node, offsetX, offsetY) {
    const { pixelRatio } = this.config;
    const { context } = this;
    const backgroundColor = node.props.backgroundColor;
    const { width = defaultWidth, height = defaultHeight } =
      node.props.size || {};
    if (backgroundColor) {
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
    const { lineGradient } = node.props;
    const { pixelRatio } = this.config;

    if (lineGradient) {
      const { context } = this;
      context.fillStyle = lineGradient;
      context.fillRect(offsetX * pixelRatio, offsetY * pixelRatio, 2000, 32);
    }
  }
}
