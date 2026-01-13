document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

  const form = document.querySelector("#publish");
  form.addEventListener("submit", async (e) => {
    const quote = form.quote.value;
    const origin = form.origin.value;
    const user = form.createdBy.value;
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
      if (data.error) {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  });
});
