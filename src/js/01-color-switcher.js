const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

btnStart.disabled = false;
btnStart.addEventListener('click', onClickStartBtn);

function onClickStartBtn() {
  btnStart.disabled = true;
  btnStop.addEventListener('click', onClickStopBtn);
  onSetAttribute();
  const colorChanger = setInterval(onSetAttribute, 1000);

  function onClickStopBtn() {
    clearInterval(colorChanger);
    btnStart.disabled = false;
  }
}

function onSetAttribute() {
  body.setAttribute('style', `background-color:${getRandomHexColor()}`);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
