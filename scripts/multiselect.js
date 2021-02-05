const updateContainer = (container, inner, selected, opt) => {
  if (selected.length > 0) {
    container.value = selected.join(',');
    inner.innerText = selected.join(', ');
  } else {
    container.value = '';
    inner.innerText = opt[0].innerText;
  }
  container.dispatchEvent(new window.Event('change', { bubbles: true }));
};
const buttonToggle = (display, dropdown) => {
  display.classList.toggle('multi__dropdown_toggle');
  dropdown.classList.toggle('multi_hidden');
};
const map = {};
let multi_idx = 0;
const multiSelect = () => {
  Array.from(document.querySelectorAll('.multi'))
    .filter((multi) => {
      return multi.getAttribute('data-multiselect-initialized') === null;
    })
    .forEach((el) => {
      map[multi_idx] = [];
      const { options: opt } = el;
      const container = document.createElement('div');
      el.classList.forEach((className) => {
        container.classList.add(className);
      });
      container.setAttribute('data-multiselect-initialized', true);
      container.setAttribute('key', multi_idx);
      const key = multi_idx;
      el.id ? (container.id = el.id) : '';
      el.getAttribute('name')
        ? container.setAttribute('name', el.getAttribute('name'))
        : '';
      el.getAttribute('onchange')
        ? container.setAttribute('onchange', el.getAttribute('onchange'))
        : '';
      const display = document.createElement('button');
      display.classList.add('multi__display');
      const inner = document.createElement('div');
      inner.classList.add('multi__inner');
      inner.innerText = opt[0].innerText;
      display.value = '';
      container.appendChild(display);
      display.appendChild(inner);
      el.parentNode.replaceChild(container, el);
      const dropdown = document.createElement('div');
      dropdown.classList.add('multi__dropdown');
      const list = document.createElement('ul');
      dropdown.classList.add('multi_hidden');
      for (let i = 1; i < opt.length; i++) {
        const li = document.createElement('li');
        li.classList.add('multi__li-item');
        li.innerText = opt[i].innerText;
        li.addEventListener('click', (e) => {
          e.stopPropagation();
          if (map[key].includes(e.target.innerText)) {
            map[key].splice(map[key].indexOf(e.target.innerText), 1);
            e.target.classList.remove('multi__li-item_selected');
          } else {
            map[key].push(e.target.innerText);
            e.target.classList.add('multi__li-item_selected');
          }
          updateContainer(container, inner, map[key], opt);
        });
        list.appendChild(li);
      }
      container.addEventListener('click', (e) => {
        e.stopPropagation();
        buttonToggle(display, dropdown);
      });
      container.appendChild(dropdown);
      dropdown.appendChild(list);
    });

  multi_idx++;
};
document.addEventListener('click', (e) => {
  document.querySelectorAll('.multi__display').forEach((display) => {
    display.classList.remove('multi__dropdown_toggle');
  });
  document.querySelectorAll('.multi__dropdown').forEach((dropdown) => {
    dropdown.classList.add('multi_hidden');
  });
});

document.addEventListener('DOMContentLoaded', function (event) {

  multiSelect();
});

window.multiSelect = {
  refresh() {
    multiSelect();
  },

};
