const card = document.querySelector(".card") as HTMLDivElement;
const TOOLBAR_HEIGHT = 50;

const channel = new BroadcastChannel("card");

function getScreenPoint(clientX: number, clientY: number): [number, number] {
  const screenX = clientX + window.screenLeft;
  const screenY = clientY + window.screenTop + TOOLBAR_HEIGHT;
  return [screenX, screenY];
}

function getClientPoint(screenX: number, screenY: number): [number, number] {
  const clientX = screenX - window.screenLeft;
  const clientY = screenY - window.screenTop - TOOLBAR_HEIGHT;
  return [clientX, clientY];
}

card.addEventListener("mousedown", (e) => {
  const x = e.pageX - card.offsetLeft;
  const y = e.pageY - card.offsetTop;

  const handleMouseMove = (e: MouseEvent) => {
    const cx = e.pageX - x;
    const cy = e.pageY - y;
    card.style.left = `${cx}px`;
    card.style.top = `${cy}px`;
    channel.postMessage(getScreenPoint(cx, cy));
  };
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", handleMouseMove);
  });
});

const [x, y] = getClientPoint(50, 150);
card.style.left = `${x}px`;
card.style.top = `${y}px`;

channel.onmessage = (e) => {
  const [x, y] = getClientPoint(e.data[0], e.data[1]);
  card.style.left = `${x}px`;
  card.style.top = `${y}px`;
};
