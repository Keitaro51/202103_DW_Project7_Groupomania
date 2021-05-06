export function formatDate(dateToFormat){ 
  return  (new Date(dateToFormat).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric' }))
}