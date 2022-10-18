function axiosAuth() {

const token = localStorage.getItem('token');
if(token){
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  return headers
}else{
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': null
  }
  return headers
}
}

export default axiosAuth