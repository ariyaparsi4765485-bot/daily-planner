export const CLUB_DAYS = [
  6, // شنبه
  0, // یکشنبه
  1, // دوشنبه
  3, // چهارشنبه
  4, // پنجشنبه
];

export const WEEK_DAYS = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

export const BASE_SCHEDULE = [
  { id: "wake", start: "06:30", end: "07:00", title: "بیدار شدن", category: "morning", clubOnly: false, noClub: false },
  { id: "breakfast", start: "07:00", end: "07:30", title: "صبحانه", category: "morning", clubOnly: false, noClub: false },
  { id: "youtube", start: "07:30", end: "07:45", title: "چک یوتیوب", category: "media", timer: true, duration: 15, clubOnly: false, noClub: false },
  { id: "deep-work-1", start: "07:45", end: "09:45", title: "کار عمیق ۱", description: "سناریونویسی / طراحی", category: "work", clubOnly: false, noClub: false },
  { id: "break", start: "09:45", end: "10:00", title: "استراحت", category: "break", clubOnly: false, noClub: false },
  { id: "deep-work-2-a", start: "10:00", end: "11:00", title: "کار عمیق ۲ — بخش اول", category: "work", clubOnly: false, noClub: false },
  { id: "dog-morning", start: "11:00", end: "11:30", title: "بیرون بردن سگ", description: "نوبت اول — صبح", category: "dog", clubOnly: false, noClub: false },
  { id: "deep-work-2-b", start: "11:30", end: "12:30", title: "کار عمیق ۲ — بخش دوم", category: "work", clubOnly: false, noClub: false },
  { id: "lunch", start: "12:30", end: "13:30", title: "ناهار + مطالعه", description: "بافر قطعی برق", category: "personal", clubOnly: false, noClub: false },
  { id: "classes-1", start: "13:30", end: "15:30", title: "کلاس‌ها", description: "بخش ۱", category: "study", clubOnly: false, noClub: false },
  { id: "dog-afternoon", start: "15:30", end: "16:00", title: "بیرون بردن سگ", description: "نوبت دوم — عصر", category: "dog", clubOnly: false, noClub: false },
  { id: "classes-2", start: "16:00", end: "17:15", title: "کلاس‌ها و تمرین", description: "بخش ۲", category: "study", clubOnly: false, noClub: false },
  { id: "video", start: "17:15", end: "17:45", title: "تکمیل ویدیو", description: "آپلود + تامبنیل", category: "work", clubOnly: false, noClub: false },
  { id: "club-prep", start: "17:45", end: "18:00", title: "آماده شدن برای باشگاه", category: "fitness", clubOnly: true, noClub: false },
  { id: "club", start: "18:00", end: "20:00", title: "باشگاه", description: "تمرین ورزشی", category: "fitness", clubOnly: true, noClub: false },
  { id: "free-time", start: "18:00", end: "20:00", title: "پیاده‌روی / وقت آزاد", category: "personal", clubOnly: false, noClub: true },
  { id: "shower", start: "20:00", end: "20:30", title: "دوش", category: "personal", clubOnly: false, noClub: false },
  { id: "dinner", start: "20:30", end: "21:00", title: "شام", category: "personal", clubOnly: false, noClub: false },
  { id: "dog-night", start: "21:00", end: "21:30", title: "بیرون بردن سگ", description: "نوبت سوم — شب", category: "dog", clubOnly: false, noClub: false },
  { id: "summary", start: "21:30", end: "22:00", title: "جمع‌بندی روز", description: "دوری از صفحه نمایش", category: "personal", clubOnly: false, noClub: false },
  { id: "sleep", start: "22:00", end: "22:15", title: "خواب", category: "sleep", clubOnly: false, noClub: false },
];

export function isClubDay(date = new Date()) {
  return CLUB_DAYS.includes(date.getDay());
}

export function getScheduleForDate(date = new Date()) {
  const isTodayClubDay = isClubDay(date);

  return BASE_SCHEDULE.filter((item) => {
    if (item.clubOnly) return isTodayClubDay;
    if (item.noClub) return !isTodayClubDay;
    return true;
  });
}