function generateSlots(dateStr, startHour = 16, endHour = 23, durationMin = 30) {
  const slots = [];
  const [y, m, d] = dateStr.split("-").map(Number);
  const start = new Date(y, m - 1, d, startHour, 0, 0);
  const end = new Date(y, m - 1, d, endHour, 0, 0);

  let cur = new Date(start);
  while (cur < end) {
    const slotStart = new Date(cur);
    const slotEnd = new Date(cur.getTime() + durationMin * 60000);
    if (slotEnd <= end) {
      slots.push({ startTime: slotStart, endTime: slotEnd });
    }
    cur = slotEnd;
  }
  return slots;
}

module.exports.generateSlots = generateSlots;

// return array of slots with startTime and endTime as Date objects