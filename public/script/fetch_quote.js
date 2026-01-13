document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

  const form = document.querySelector("#publish");

  const quoteError = document.querySelector(".quote.error")
  const originError = document.querySelector(".origin.error")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const quote = form.quote.value;
    const origin = form.origin.value;
    const user = form.createdBy.value;

    quoteError.textContent = ""
    originError.textContent = ""
    try {
      const res = await fetch(`/home/${user}`, {
        method: "POST",
        body: JSON.stringify({ quote, origin, user }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.success) {
        window.location.reload();
      }
      if (data.errors) {
        quoteError.textContent = data.errors.quote
        originError.textContent = data.errors.origin
      }
    } catch (err) {
      console.log(err);
    }
  });
});
