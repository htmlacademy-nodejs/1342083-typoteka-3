'use strict';

const dateSelect = document.getElementById('publication-date');

if (dateSelect && window.flatpickr) {
  dateSelect._flatpickr.setDate(dateSelect.dataset.value);
}
