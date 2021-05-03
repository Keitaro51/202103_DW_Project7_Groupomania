export function formatDate(dateToFormat){ //FIXME class? convention de nomage et d'emplacement?
  return  (new Date(dateToFormat).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric' }))
}