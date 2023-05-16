const card = document.querySelector(".card") as HTMLDivElement;
card.addEventListener("mousedown", (e) => {
  const x = e.pageX - card.offsetLeft;
  const y = e.pageY - card.offsetTop;

  const handleMouseMove = (e: MouseEvent) => {
    const cx = e.pageX - x;
    const cy = e.pageY - y;
    card.style.left = `${cx}px`;
    card.style.top = `${cy}px`;
  };
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", handleMouseMove);
  });
});
