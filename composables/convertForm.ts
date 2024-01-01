export function convertForm(req, type = 0, sense) {
  const formData: FormData = new FormData();

  switch (type) {

  case 0:

    for (const [key, value] of Object.entries(req)) {
      if (Object.prototype.toString.call(value) === '[object Object]') {
          formData.append(key, JSON.stringify(value))
      } else {
          formData.append(key, value)
      }
    }

    break;

  case 1:
    
    req.forEach((item, index) => {
      for (const [key, value] of Object.entries(item)) {
        if (key === sense && typeof value === 'object' && value !== null && !(value instanceof File)) {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            formData.append(`${index}.${sense}[${nestedKey}]`, 
              Object.prototype.toString.call(nestedValue) === '[object Object]' ? 
              JSON.stringify(nestedValue) : nestedValue
            );
          }
        } else if (value instanceof File) {
          formData.append(`${index}.${sense}[image]`, value, value.name);
        } else {
          formData.append(`${index}.${key}`, value);
        }
      }
    });

    break;

  }
  return formData
}