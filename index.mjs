const defaultCSS = {
  formCSS: "display: flex; flex-direction: column;",
  inputCSS: "padding: 5px; margin-bottom: 1em;",
  buttonrowCSS: "display: flex; justify-content: flex-end",
  buttonCSS: "margin-left: 0.5em",
  pCSS: "",
}

function createDialog(innerHTML, onClose, onCancel) {
  let el = document.createElement("dialog");
  el.innerHTML = innerHTML
  document.body.appendChild(el);
  el.showModal();
  el.addEventListener("close", function() {
    let data = {};
    let form = new FormData(this.querySelector("form"));
    for (let [key, value] of form.entries()) {
      data[key] = value;
    }
    onClose.call(this, this.returnValue, data);
    this.remove();
  });
  el.addEventListener("cancel", function() {
    onCancel.apply(this);
    this.remove();
  });
  return el
}

const h = (type, title, style, attr) =>
  type === 'p' ? `<p style="${style||''}" ${attr||''}>${title}</p>`
    : `<input type="${type}" name="${title}" ${
        type==='submit' ? `value="${title}"` : `placeholder="${title}"`
      } style="${style||''}" ${attr||''}>`

export function loginDialog(title, opts = {}) {
  return new Promise((resolve, reject) => {
    let _opts = Object.assign({}, defaultCSS, opts);
    let favDialog = createDialog(`
      <form method="dialog" style="${_opts.formCSS}">
        ${h('p', title, _opts.pCSS)}
        ${h('text', 'Username', _opts.inputCSS, 'autofocus')}
        ${h('password', 'Password', _opts.inputCSS)}
        <menu style="${_opts.buttonrowCSS}">
          ${h('submit', 'Submit', _opts.buttonCSS)}
          ${h('submit', 'Cancel', _opts.buttonCSS)}
        </menu>
      </form>`,
      (r, data) => (r === "Cancel") ? resolve(null) : resolve(data),
      () => resolve(null)
    );
  });
}

export function confirmDialog(title, opts = {}) {
  return new Promise((resolve, reject) => {
    let _opts = Object.assign({}, defaultCSS, opts);
    let favDialog = createDialog(`
      <form method="dialog" style="${_opts.formCSS}">
        ${h('p', title, _opts.pCSS)}
        <menu style="${_opts.buttonrowCSS}">
          ${h('submit', 'Yes', _opts.buttonCSS, 'autofocus')}
          ${h('submit', 'No', _opts.buttonCSS)}
        </menu>
      </form>`,
      r => (r === "No") ? resolve(false) : resolve(true),
      () => resolve(null)
    );
  });
}
