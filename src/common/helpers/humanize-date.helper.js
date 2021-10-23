'use strict';

const dayjs = require(`dayjs`);
const {DateFormatPattern} = require(`../enums`);

const humanizeDate = (dateStr, hasHours) => {
  if (hasHours) {
    return dayjs(dateStr).format(DateFormatPattern.HUMAN_WITH_TIME);
  }

  return dayjs(dateStr).format(DateFormatPattern.HUMAN);
};

module.exports = {
  humanizeDate,
};
