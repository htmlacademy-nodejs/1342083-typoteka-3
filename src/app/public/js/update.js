'use strict';

const dateSelect = document.getElementById('publication-date');

if (dateSelect && window.flatpickr) {
  window.flatpickr(dateSelect, {
    defaultDate: dateSelect.dataset.value,
  });
}
