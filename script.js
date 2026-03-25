async function loadOrders() {
  const res = await fetch("/orders");
  const data = await res.json();

  const container = document.getElementById("orders");
  container.innerHTML = "";

  data.forEach(order => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <p>ID: ${order.id}</p>
    `;
    container.appendChild(div);
  });
}