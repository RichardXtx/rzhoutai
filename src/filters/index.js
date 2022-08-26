import dayjs from 'dayjs'
export function strainer(val) {
//   console.log(val)
  return dayjs(val).format('YYYY-MM-DD')
}
