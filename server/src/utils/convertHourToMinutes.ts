export default function convertHourToMinutes(time: string) {
  // split hour through : and tranforme to number
  // In the zero [0] position of array it has the time and one [1] position it has the minutes
  const [hour, minutes] = time.split(':').map(Number); 

  // transform hours in minutes
  const timeInMinutes = (hour * 60) + minutes;

  return timeInMinutes;
}