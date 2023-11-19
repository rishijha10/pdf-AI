async function getMessage(body) {
  const response = await fetch(`http://localhost:8000/trial/${body}`);
  const data = await response.json();
  return data;
}
