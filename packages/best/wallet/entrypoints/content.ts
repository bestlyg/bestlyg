export default defineContentScript({
  matches: ["https://lkcoffee.com/*", "<all_urls>"],
  main() {
    console.log("Hello content.1");
    const div = document.createElement("div");
    div.id = "lyglyglyg3";
    document.body.appendChild(div);
  },
});
