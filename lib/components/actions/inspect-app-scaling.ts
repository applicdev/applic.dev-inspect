export function requestMove(eve) {
  eve.preventDefault();

  // ?
  if (globalThis.performance.now() - this.frame.ratLas <= 250) {
    this.frame.rat = 1 / 2.5;
    this.whenTranslate();

    return;
  }

  this.frame.ratLas = globalThis.performance.now();

  // ?
  let close;
  const wid = this.parentNode.offsetWidth;

  const start = { x: eve.pageX };
  const delta = wid * this.frame.rat - start.x;

  this.whenTranslate();

  const onMove = (eve) => {
    if (close) return;

    eve.preventDefault();

    const wid = this.parentNode.offsetWidth;

    if (!start) start = { x: eve.pageX };

    const pos = { x: eve.pageX - start.x };
    const ros = start.x + pos.x;

    if (!delta) delta = wid * this.frame.rat - start.x;

    const rat = Math.max(0.1, Math.min(0.9, (ros + delta) / wid));

    // ? hast to move by more than one pixel;
    if (!this.tra && Math.abs(wid * rat - wid * this.frame.rat) <= 1) return;

    this.tra = true;
    this.frame.rat = rat;
    this.whenTranslate();
  };

  const onExit = async (eve) => {
    if (close) return;

    eve.preventDefault();

    close = true;
    this.tra = false;

    this.removeEventListener('pointerup', onExit);
    this.removeEventListener('pointermove', onMove);

    requestAnimationFrame(() => {
      this.whenTranslate();
    });
  };

  onMove(eve);

  globalThis.addEventListener('lostpointercapture', onExit);
  globalThis.addEventListener('pointerup', onExit);
  globalThis.addEventListener('pointermove', onMove);
}
