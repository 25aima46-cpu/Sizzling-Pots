document.getElementById("orderForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const className = document.getElementById("className").value;
  const item = document.getElementById("item").value;

  const res = await fetch("/add-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, className, item })
  });

  const data = await res.text();
  alert(data);
});
async function placeOrder() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const item = document.getElementById("item").value;
  const quantity = document.getElementById("quantity").value;

  const res = await fetch("/add-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, item, quantity })
  });

  const text = await res.text();
  document.getElementById("msg").innerText = text;
}