function axiosAuth() {

const token = localStorage.getItem('token');
if(token){
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  return header
}else{
  const header = {
    'Content-Type': 'application/json',
    'Authorization': null
  }
  return header
}
}

export default axiosAuth