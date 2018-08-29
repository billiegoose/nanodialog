export function loginDialog(title, opts = {}) {
  return new Promise((resolve, reject) => {
    let _opts = Object.assign({
      formCSS: "display: flex; flex-direction: column;",
      inputCSS: "padding: 5px; margin-bottom: 1em;",
      buttonrowCSS:
        "display: flex; flex-direction: row-reverse; justify-content: flex-start"
    });
    let favDialog = document.createElement("dialog");
    favDialog.innerHTML = `
      <form method="dialog" style="${_opts.formCSS}">
        <p>${title}</p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          style="${_opts.inputCSS}"
          autofocus>
        <input
          type="password"
          name="password"
          placeholder="Password"
          style="${_opts.inputCSS}">
        <menu style="${_opts.buttonrowCSS}">
          <button
            type="submit"
            value="submit">
            Submit
          </button>
          <button
            type="submit"
            value="cancel">
            Cancel
          </button>
        </menu>
      </form>`;
    document.body.appendChild(favDialog);
    favDialog.showModal();
    favDialog.addEventListener("close", function(event) {
      console.log(this.returnValue);
      if (this.returnValue === "cancel" || this.returnValue === "") {
        reject("cancel");
      } else {
        let data = {};
        let form = new FormData(this.querySelector("form"));
        for (let [key, value] of form.entries()) {
          data[key] = value;
        }
        resolve(data);
      }
      this.remove();
    });
  });
}

export function confirmDialog(title, opts = {}) {
  return new Promise((resolve, reject) => {
    let _opts = Object.assign({
      formCSS: "display: flex; flex-direction: column;",
      inputCSS: "padding: 5px; margin-bottom: 1em;",
      buttonrowCSS:
        "display: flex; flex-direction: row-reverse; justify-content: flex-start"
    });
    let favDialog = document.createElement("dialog");
    favDialog.innerHTML = `
      <form method="dialog" style="${_opts.formCSS}">
        <p>${title}</p>
        <menu style="${_opts.buttonrowCSS}">
          <button
            type="submit"
            value="yes"
            autofocus>
            Yes
          </button>
          <button
            type="submit"
            value="no">
            No
          </button>
        </menu>
      </form>`;
    document.body.appendChild(favDialog);
    favDialog.showModal();
    favDialog.addEventListener("close", function(event) {
      console.log(this.returnValue);
      if (this.returnValue === "no") {
        resolve(false);
      } else if (this.returnValue === "yes") {
        resolve(true);
      }
      this.remove();
    });
  });
}
