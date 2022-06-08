const directions = [{
  code: 'ArrowRight',
  x: 1.5,
  y: 0,
  title: '右'
}, {
  code: 'ArrowUp',
  x: 0.75,
  y: -0.75,
  title: '上'
}, {
  code: 'ArrowLeft',
  x: 0,
  y: 0,
  title: '左'
}, {
  code: 'ArrowDown',
  x: 0.75,
  y: 0.75,
  title: '下'
}];

const controls = [{
  code: 'KeyS',
  x: -1,
  y: -0.75,
}, {
  code: 'KeyL',
  x: -2.5,
  y: -0.75,
}, {
  code: 'Escape',
  x: -2.5,
  y: 0.5,
}, {
  code: 'Space',
  x: -1,
  y: 0.5,
}, {
  code: 'KeyB',
  x: -1,
  y: 1.75,
}, {
  code: 'KeyX',
  x: -2.5,
  y: 1.75,
}];

function createElement(array, root) {
  root = document.querySelector(root)
  array.forEach((item, index) => {
    const { x, y, code, title } = item
    const el = document.createElement('div')
    el.classList.add('btn')
    el.textContent = title || code
    el.style.transform = `translate(${x * 100}%, ${y * 100}%)`
    el.onmousedown = function (e) {
      var event = document.createEvent('Event');
      // var event = new Event('keydown');
      event.code = code
      // Define that the event name is 'build'.
      event.initEvent('keydown', true, true);
      // The form element listens for the custom "awesome" event and then consoles the output of the passed text() method
      document.dispatchEvent(event);
      e.preventDefault()
      e.stopPropagation()
    }
    root.appendChild(el)
  });
}
// createElement(directions, '.direction')
// createElement(controls, '.control')